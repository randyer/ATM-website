window.onload=function(){

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');

openModal.addEventListener('click', function() {
  modal.showModal();
})

closeModal.addEventListener('click', function() {
  modal.close();
})


const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');

    if(visibility === "false"){
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded',true);
    }
    else if(visibility === "true"){
        primaryNav.setAttribute('data-visible',false);
        navToggle.setAttribute('aria-expanded',false);
    }
})


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}; 
  
}
