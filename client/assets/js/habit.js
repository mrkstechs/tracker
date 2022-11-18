window.addEventListener('load', displayHabits)

const habitSection = document.querySelector('#habits')
const logOutBtn = document.querySelector('.logout')

logOutBtn.addEventListener('click', logOut);

async function exPreview (user) {
    try {
        const response = await fetch(`https://habithelper.herokuapp.com/goals/${user}`)
    } catch {

    }
}

// function slePreview () {

// }

// function watPreview () {

// }

async function getUser() {
    try {
    user = await JSON.parse(localStorage.getItem("user"));
    return user
    } catch (err){
        console.log(err)
    }
}

async function changeTitle(){
    try{
    const user = await getUser();
    const title = document.querySelector('h1');
    title.textContent = `Hello ${user.firstName}, welcome to your account.`
    title.style.color = '#CFF5E7'
    } catch (err){
        console.log(err)
    }
}

async function displayHabits () {
    try {
    const user = await getUser();
    console.log(user)
    userTrackedGoals = await (await fetch(`https://habithelper.herokuapp.com/goals/${user.id}`)).json()
    sleepGoal = userTrackedGoals.find(goal => goal.habitId == 1)
    exerciseGoal = userTrackedGoals.find(goal => goal.habitId == 2)
    waterGoal = userTrackedGoals.find(goal => goal.habitId == 3)
    console.log(waterGoal)
    if (sleepGoal) {
        console.log("User is tracking sleep")
        displaySleep(user, sleepGoal)
    } else {
        displayNewSleepGoal(user)
    }
    if (exerciseGoal) {
        console.log("User is tracking exercise")
        displayExercise(user, exerciseGoal)
    } else {
        displayNewExerciseGoal(user)
    }
    if (waterGoal) {
        console.log("User is tracking water")
        displayWater(user, waterGoal)
    } else {
        displayNewWaterGoal(user)
    }
    return userTrackedGoals    
    } catch (err){
        console.log(err)
    }
}

function displayNewSleepGoal(user) {
    markup = `<div class="habit" id="sleepHabit">
                
                <h2>Sleep</h2>
                <div class="newGoal">
                    <h1>+</h1>
                    <h4>Start tracking your sleep!</h4>
                </div>
            </div>`;
    habitSection.insertAdjacentHTML('afterbegin', markup)
    
    const sleepCard = document.querySelector('#sleepHabit')
    sleepCard.addEventListener('click', sendToSleep)
}


function displayNewExerciseGoal(user) {
    markup = `<div class="habit" id="exerciseHabit">
                
                <h2>Exercise</h2>
                <div class="newGoal">
                    <h1>+</h1>
                    <h4>Start tracking your exercise!</h4>
                </div>
            </div>`;
    habitSection.insertAdjacentHTML('afterbegin', markup)
    
    const exerciseCard = document.querySelector('#exerciseHabit')
    exerciseCard.addEventListener('click', sendToExercise)
}


function displayNewWaterGoal(user) {
    markup = `<div class="habit" id="waterHabit">
                
                <h2>Water</h2>
                <div class="newGoal">
                    <h1>+</h1>
                    <h4>Start tracking your water consumption!</h4>
                </div>
            </div>`;
    habitSection.insertAdjacentHTML('afterbegin', markup)
    
    const waterCard = document.querySelector('#waterHabit')
    waterCard.addEventListener('click', sendToWater)
}



async function displaySleep(user, sleepGoal) {
    try{
    const sleepData = await (await fetch(`https://habithelper.herokuapp.com/trackers/${user.id}/1`)).json()
    console.log(sleepData)
    const lastSleep = sleepData[(sleepData.length-1)]
    console.log(lastSleep)
                
    const markup = `<div class="habit" id="sleepHabit">
    <div class="icon" id="three">
            <i class="bi bi-alarm"></i>
        </div>
                        <h2>Sleep</h2>
                        <div class="progress" id="sleep">
                        <h3>Last logged sleep:</h3>
                        <h4>${(lastSleep.date).split('T')[0]}</h4>
                        </div>
                    </div>`
    habitSection.insertAdjacentHTML('afterbegin', markup)

    const progressSection = document.querySelector('#sleep')
    displaySleepProgress(sleepGoal, lastSleep, progressSection)
    
    const sleepCard = document.querySelector('#sleepHabit')
    sleepCard.addEventListener('click', sendToSleep)
    
    
    return sleepData
    } catch (err) {
        console.log(err)
    }
    
} 

async function displaySleepProgress(sleepGoal, lastSleep, postSection) {
    try {
    const goalProgressDisplay = `<div id="sleepProgress">
                                    <div class="circular-progress">
                                        <span class="progress-value">7/8 hours</span>
                                    </div>
                                </div>`
    
    postSection.insertAdjacentHTML('beforeend',goalProgressDisplay)

    const circularProgress = document.querySelector(".circular-progress")
    const progressValue = document.querySelector(".progress-value")
    
    progressValue.textContent = `${lastSleep.dailyValue} / ${sleepGoal.dailyGoal} hours`

    circularProgress.style.background = `conic-gradient(#f0ff ${(lastSleep.dailyValue)/(sleepGoal.dailyGoal)*360}deg, lightgrey 0deg)`    
    } catch (err) {
        console.log(err)
    }
}

function sendToSleep() {
   window.location.assign('/sleep.html')
}

async function displayExercise() {
    try {
    const exeData = (await (await fetch(`https://habithelper.herokuapp.com/goals/${user.id}/2`)).json())[0]
    console.log(exeData)
    const totalHours = exeData.dailyGoal
    console.log(totalHours) 

    const markup = `<div class="habit" id="exerciseHabit">
    <div class="icon" id="two">
    <i class="bi bi-heart-pulse"></i>
</div>
                        <h2>Exercise</h2>
                        <div class="progress" id="exercise">
                            <h3>Your goal today is to exercise</h3>
                            <div id="numbercircle">
                                <h4 class="exercisegoal">${totalHours}</h4>
                            </div>
                            <h3 class="exercisehour">hour(s)</h3>
                        </div>
                    </div>`
    habitSection.insertAdjacentHTML('afterbegin', markup)

    const exerciseCard = document.querySelector('#exerciseHabit')
    exerciseCard.addEventListener('click', sendToExercise)
    return exeData
    } catch (err) {
        console.log(err)
    }
}

function sendToExercise() {
    window.location.assign('/exercise.html')
}




async function displayWater() {
    try {
    const waterData = await (await fetch(`https://habithelper.herokuapp.com/trackers/${user.id}/3`)).json()

    console.log(waterData);
    const lastDrink = waterData[(waterData.length-1)]
    console.log(lastDrink)

    const markup = `<div class="habit" id="waterHabit">
    <div class="icon" id="one">
            <i class="bi bi-droplet"></i>
        </div>
                        <h2>Water</h2>
                        <div class="progress" id="water">
                        <h3>On ${(lastDrink.date).split('T')[0]} you drank:</h3>
                        <div class='showDrink'>
                        
                        <h3 id='waterDrank'>${lastDrink.dailyValue}</h3>
                        </div>
                        <h3 id='waterText'>litre(s) of water</h3>
                        </div>
                    </div>`
    habitSection.insertAdjacentHTML('afterbegin', markup)

    const waterCard = document.querySelector('#waterHabit')
    waterCard.addEventListener('click', sendToWater)
    } catch (err) {
        console.log(err)
    }
}

function sendToWater() {
    window.location.assign('/water.html')
}

async function logOut(){
    window.location.assign('/index.html')
}

exPreview(1)
changeTitle()

module.exports = {getUser, changeTitle, displayHabits, displayNewSleepGoal, displayNewExerciseGoal, displayNewWaterGoal, displaySleep, displaySleepProgress, sendToSleep, displayExercise, sendToExercise, displayWater, sendToWater}
