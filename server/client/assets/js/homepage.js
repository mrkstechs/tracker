const sleepButton = document.querySelector('#sleepButton');
const exericseButton = document.querySelector('#sleepButton');
const waterButton = document.querySelector('#sleepButton');
const body = document.querySelector('body');

sleepButton.addEventListener('click', showSleep);

function showSleep (){
    body.style.backgroundColor = '#083AA9'
    body.innerHTML = '';
    markup = `
    <div class="sleepSection">
        <div id="sleepInput">
        <h2> Track your sleep here </h2>
        <input type="text" name="Sleep" id="sleep" required>
        <span></span>
        <label>Hours of Sleep</label>
        </div>
    </div>`
    body.insertAdjacentHTML('beforeend', markup); 
}
