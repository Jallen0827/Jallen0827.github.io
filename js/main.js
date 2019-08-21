const menuIcon = document.querySelector('.hamburgerMenu');
const navItems = document.querySelector('.navItems');
const navBar = document.querySelector('.navBar');


menuIcon.addEventListener('click', ()=>{
    navItems.classList.toggle('change');
    navBar.classList.toggle('change');
})