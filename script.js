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
