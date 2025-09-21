const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

if (menuButton && sidebar) {
  const setSidebarState = (isOpen) => {
    sidebar.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('sidebar-open', isOpen);
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('is-open');
    setSidebarState(!isOpen);
  });

  sidebar.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      setSidebarState(false);
    }
  });

  const desktopQuery = window.matchMedia('(min-width: 1080px)');
  const handleDesktopChange = (event) => {
    if (event.matches) {
      setSidebarState(false);
    }
  };

  handleDesktopChange(desktopQuery);
  desktopQuery.addEventListener('change', handleDesktopChange);
}

const initialiseTabs = () => {
  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach((group) => {
    const tabList = group.querySelector('.tab-list');
    const tabButtons = tabList ? Array.from(tabList.querySelectorAll('[role="tab"]')) : [];
    const panels = Array.from(group.querySelectorAll('[data-tab-panel]'));

    const activateTab = (target) => {
      const tabId = target.getAttribute('data-tab');
      tabButtons.forEach((button) => {
        const isActive = button === target;
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        button.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach((panel) => {
        const matches = panel.getAttribute('data-tab-panel') === tabId;
        panel.toggleAttribute('hidden', !matches);
      });
    };

    tabButtons.forEach((button, index) => {
      if (!button.hasAttribute('data-tab')) {
        return;
      }

      if (!button.hasAttribute('tabindex')) {
        button.setAttribute('tabindex', button.getAttribute('aria-selected') === 'true' ? '0' : '-1');
      }

      button.addEventListener('click', () => activateTab(button));

      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
          return;
        }

        event.preventDefault();
        let newIndex = index;
        if (event.key === 'ArrowRight') {
          newIndex = (index + 1) % tabButtons.length;
        } else if (event.key === 'ArrowLeft') {
          newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else if (event.key === 'Home') {
          newIndex = 0;
        } else if (event.key === 'End') {
          newIndex = tabButtons.length - 1;
        }

        const nextTab = tabButtons[newIndex];
        nextTab.focus();
        activateTab(nextTab);
      });
    });
  });
};

const initialiseConditionalBlocks = () => {
  const conditionalBlocks = document.querySelectorAll('[data-conditional]');
  conditionalBlocks.forEach((block) => {
    const buttons = Array.from(block.querySelectorAll('[data-condition]'));
    const panels = Array.from(block.querySelectorAll('[data-condition-panel]'));

    const activateCondition = (value) => {
      buttons.forEach((button) => {
        const isActive = button.getAttribute('data-condition') === value;
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        button.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach((panel) => {
        const matches = panel.getAttribute('data-condition-panel') === value;
        panel.toggleAttribute('hidden', !matches);
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        activateCondition(button.getAttribute('data-condition'));
      });

      if (!button.hasAttribute('tabindex')) {
        button.setAttribute('tabindex', button.getAttribute('aria-selected') === 'true' ? '0' : '-1');
      }

      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) {
          return;
        }

        event.preventDefault();
        const currentIndex = buttons.indexOf(button);
        if (currentIndex === -1) {
          return;
        }

        const increment = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + increment + buttons.length) % buttons.length;
        const nextButton = buttons[nextIndex];
        nextButton.focus();
        activateCondition(nextButton.getAttribute('data-condition'));
      });
    });
  });
};

initialiseTabs();
initialiseConditionalBlocks();
