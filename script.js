const menuToggle = document.querySelector('.menu-toggle');
const menuNav = document.querySelector('nav ul');
const menuMobile = document.createElement('ul');
const shoppingCart = document.querySelector('.shopping-cart');

menuToggle.addEventListener('click', () => {
  menuNav.classList.toggle('menu-mobile');
  shoppingCart.classList.toggle('hide-on-click');
  menuToggle.classList.toggle('open');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menuNav.classList.remove('menu-mobile');
    shoppingCart.classList.remove('hide-on-click');
    menuToggle.classList.remove('open');
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
