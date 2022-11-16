window.addEventListener('load', displayHabits)

const habitSection = document.querySelector('#habits')


async function exPreview (user) {
    try {
        const response = await fetch(`http://localhost:3000/goals/${user}`)
        const data = await response.json();
        const execiseGoal = data.filter(obj => obj.habitId == 2)
        const recommendedGoals = await fetch('http://localhost:3000/habits').then(data => data.json()).then(goals => goals.find(habit => habit.id == 2))
        console.log(`Users current goal/progress:`, execiseGoal)
        console.log(`Recommended goal/progress:`, recommendedGoals)
    } catch (err) {
        console.warn(err);
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
    }
    if (exerciseGoal) {
        console.log("User is tracking exercise")
        displayExercise(user, exerciseGoal)
    }
    if (waterGoal) {
        console.log("User is tracking water")
        displayWater(user, waterGoal)
    }
    // Needs add goal button if user has no goals
}

async function displaySleep(user, sleepGoal) {
    const sleepData = await (await fetch(`http://localhost:3000/trackers/${user.id}/1`)).json()
    console.log(sleepData)
    const lastSleep = sleepData[(sleepData.length-1)]
    console.log(lastSleep)
    
    const markup = `<div class="habit">
                        <i class="bi bi-alarm"></i>
                        <h2>Sleep</h2>
                        <div class="progress" id="sleep">
                        <h3>Last logged sleep:</h3>
                        <h4>${(lastSleep.date).split('T')[0]}</h4>
                        </div>
                    </div>`
    habitSection.insertAdjacentHTML('afterbegin', markup)
    
    const goalProgressDisplay = `<div id="sleepProgress">
                                    <div class="circular-progress">
                                        <span class="progress-value">7/8 hours</span>
                                    </div>
                                </div>`
    const progressSection = document.querySelector('#sleep')
    progressSection.insertAdjacentHTML('beforeend',goalProgressDisplay)
    
    const circularProgress = document.querySelector(".circular-progress")
    const progressValue = document.querySelector(".progress-value")
    
    progressValue.textContent = `${lastSleep.dailyValue} / ${sleepGoal.dailyGoal} hours`

    circularProgress.style.background = `conic-gradient(#f0ff ${(lastSleep.dailyValue)/(sleepGoal.dailyGoal)*360}deg, lightgrey 0deg)`
} 

async function displayExercise() {
    const markup = `<div class="habit">
                        <i class="bi bi-graph-up"></i>
                        <h2>Exercise</h2>
                        <div class="progress" id="exercise">
                        <h3>Your progress so far:</h3>
                        </div>
                    </div>`
    habitSection.insertAdjacentHTML('afterbegin', markup)
}

async function displayWater() {
    const markup = `<div class="habit">
                        <i class="bi bi-droplet"></i>
                        <h2>Water</h2>
                        <div class="progress" id="water">
                        <h3>Your progress so far:</h3>
                        </div>
                    </div>`
    habitSection.insertAdjacentHTML('afterbegin', markup)
}

exPreview(1)
changeTitle()
