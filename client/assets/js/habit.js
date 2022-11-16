window.addEventListener('load', displayHabits)

const habitSection = document.querySelector('#habits')


async function exPreview (user) {
    try {
        const response = await fetch(`http://localhost:3000/goals/${user}`)
    } catch {

    }
}

// function slePreview () {

// }

// function watPreview () {

// }

async function getUser() {
    user = await JSON.parse(localStorage.getItem("user"));
    return user
}

async function changeTitle(){
    const user = await getUser();
    const title = document.querySelector('h1');
    title.textContent = `Hello ${user.firstName}, welcome to your account.`
    title.style.color = '#CFF5E7'
}

async function displayHabits () {
    const user = await getUser();
    console.log(user)
    userTrackedGoals = await (await fetch(`http://localhost:3000/goals/${user.id}`)).json()
    sleepGoal = userTrackedGoals.find(habit => habit.id == 1)
    exerciseGoal = userTrackedGoals.find(habit => habit.id == 2)
    waterGoal = userTrackedGoals.find(habit => habit.id == 3)
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
    // Needs add goal button if user has no goals
}

function displayNewSleepGoal(user) {
    markup = `<div class="habit" id="sleepHabit">
                <i class="bi bi-alarm"></i>
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
                <i class="bi bi-heart-pulse"></i>
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
                <i class="bi bi-droplet"></i>
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
    const sleepData = await (await fetch(`http://localhost:3000/trackers/${user.id}/1`)).json()
    console.log(sleepData)
    const lastSleep = sleepData[(sleepData.length-1)]
    console.log(lastSleep)
                
    const markup = `<div class="habit" id="sleepHabit">
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

    

    
} 

async function displaySleepProgress(sleepGoal, lastSleep, postSection) {
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
}

async function sendToSleep() {
    window.location.assign('/client/sleep.html')
}

async function sendToWater() {
    window.location.assign('/client/water.html')
}

async function sendToExercise() {
    window.location.assign('/client/exercise.html')
}

async function displayExercise() {
    const exeData = (await (await fetch(`http://localhost:3000/goals/${user.id}/2`)).json())[0]
    console.log(exeData)
    const totalHours = exeData.dailyGoal
    console.log(totalHours) 

    const markup = `<div class="habit" id="exerciseHabit">
                        
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

}

async function sendToExercise() {
    window.location.assign('/client/exercise.html')
}




async function displayWater() {
    const waterData = await (await fetch(`http://localhost:3000/trackers/${user.id}/3`)).json()

    console.log(waterData);
    const lastDrink = waterData[(waterData.length-1)]
    console.log(lastDrink)

    const markup = `<div class="habit" id="waterHabit">
                        <h2>Water</h2>
                        <div class="progress" id="water">
                        <h3>On ${(lastDrink.date).split('T')[0]} you drank:</h3>
                        <div class='showDrink'>
                        
                        <h3 id='waterDrank'>${lastDrink.dailyValue}</h3>
                        </div>
                        <i class="bi bi-water" id='waterIcon'></i>
                        <h3 id='waterText'>cup(s) of water</h3>
                        </div>
                    </div>`
    habitSection.insertAdjacentHTML('afterbegin', markup)

    const waterCard = document.querySelector('#waterHabit')
    waterCard.addEventListener('click', sendToWater)
}

async function sendToWater() {
    window.location.assign('/client/water.html')
}

exPreview(1)
changeTitle()
