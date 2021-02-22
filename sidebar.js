const button = document.querySelector('.js-toggle-sidebar');
const closeButton = document.querySelector('.js-close-sidebar');
const sidebarElem = document.querySelector('.js-sidebar');

const toggleSidebar = () => {
    sidebarElem.classList.toggle('sidebar_opened');
    button.classList.toggle('hide');
};

button.addEventListener('click', toggleSidebar)
closeButton.addEventListener('click', toggleSidebar)
