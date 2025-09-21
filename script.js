const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

if (menuButton && sidebar) {
  menuButton.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  sidebar.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      sidebar.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}
