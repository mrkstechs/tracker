const scrollContainer = document.querySelector(".cards");

scrollContainer.addEventListener("wheel", (event) => {
    event.preventDefault();

    scrollContainer.scrollBy({
        left: event.deltaY < 0 ? -50 : 50,
    });
    

});