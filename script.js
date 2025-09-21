const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

if (menuButton && sidebar) {
  const setSidebarState = (isOpen) => {
    sidebar.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('sidebar-open', isOpen);
  };

  menuButton.addEventListener('click', () => {
    const willOpen = !sidebar.classList.contains('is-open');
    setSidebarState(willOpen);
  });

  sidebar.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      setSidebarState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setSidebarState(false);
    }
  });

  document.addEventListener('click', (event) => {
    const clickedOutsideSidebar = !sidebar.contains(event.target) && !menuButton.contains(event.target);

    if (sidebar.classList.contains('is-open') && clickedOutsideSidebar) {
      setSidebarState(false);
    }
  }, { capture: true });
}
