let waterPop = document.querySelector('waterpop');
waterPop.addEventListener('click', showWater)


function openWater() {
    waterPop.classList.add('open-water')
}

function closeWater() {
    waterPop.classList.remove('open-water')
}




function showWadter(book) {
    modalHeader.textContent = `${book.title} - ${book.yearOfPublication}`;
    const authorLink = createItemLink(book.author);
    const abstract = document.createElement('p');
    abstract.textContent = book.abstract;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Book';
    deleteBtn.onclick = () => deleteBook(book.id);
    modalContent.appendChild(authorLink);
    modalContent.appendChild(abstract);
    modalContent.appendChild(deleteBtn);
    modalExit.href = `#books`;
}

function showWater() {
    const waterDiv = document.createElement('div')
    waterDiv.className = 'waterdiv'
    



}