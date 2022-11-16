const title = document.querySelector('#profileheader');
const home = document.querySelector('#home')
firstName = localStorage.getItem('firstName');
title.textContent = `Hello ${firstName} welcome to your profile`;




function showHome(){
    window.location.assign('/client/homepage.html')
}
