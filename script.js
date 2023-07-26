const menuToggle = document.querySelector('.menu-toggle');
const menuNav = document.querySelector('nav ul');
const menuMobile = document.createElement('ul');

menuToggle.addEventListener('click', () => {
  menuNav.classList.toggle('menu-mobile');
  menuToggle.classList.toggle('open');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menuNav.classList.remove('menu-mobile');
  }
});

window.addEventListener('load', () => {
  const menuItems = Array.from(menuNav.children);
  menuItems.forEach(item => {
    const menuItem = document.createElement('li');
    menuItem.innerHTML = item.innerHTML;
    menuMobile.appendChild(menuItem);
  });
});

menuToggle.parentNode.insertBefore(menuMobile, menuNav.nextSibling);

