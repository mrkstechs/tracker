const sleepButton = document.querySelector('#sleepButton');
const exericseButton = document.querySelector('#exerciseButton');
const waterButton = document.querySelector('#waterButton');
const body = document.querySelector('body');

sleepButton.addEventListener('click', showSleep);
waterButton.addEventListener('click', showWater);
exerciseButton.addEventListener('click', showExercise);

function showSleep(){
    window.location.assign("/client/sleep.html")
}

function showWater(){
    window.location.assign("/client/water.html")
}

function showExercise(){
    window.location.assign("/client/exercise.html")
}

module.exports = { showExercise, showSleep, showWater}
