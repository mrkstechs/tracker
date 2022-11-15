const scrollContainer = document.querySelector(".cards");
const title = document.querySelector('#profileheader');
const home = document.querySelector('#home')
firstName = localStorage.getItem('firstName');
title.textContent = `Hello ${firstName} welcome to your profile`;


home.addEventListener('click', showHome);

scrollContainer.addEventListener("wheel", (event) => {
    event.preventDefault();

    scrollContainer.scrollBy({
        left: event.deltaY < 0 ? -50 : 50,
    });
    

});

function showHome(){
    window.location.assign('/client/homepage.html')
}
