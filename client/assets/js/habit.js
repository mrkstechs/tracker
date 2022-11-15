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

async function displayHabits () {
    const user = await getUser();
    console.log(user)
    userTrackedGoals = await (await fetch(`http://localhost:3000/goals/${user.id}`)).json()
    if (userTrackedGoals.find(habit => habit.id == 1)) {
        console.log("User is tracking sleep")
        displaySleep()
    }
    if (userTrackedGoals.find(habit => habit.id == 2)) {
        console.log("User is tracking exercise")
        displayExercise()
    }
    if (userTrackedGoals.find(habit => habit.id == 3)) {
        console.log("User is tracking water")
        displayWater()
    }
}

async function displaySleep() {
    const markup = `<div class="habit">
                        <i class="bi bi-alarm"></i>
                        <h2>Sleep</h2>
                        <div class="progress" id="sleep">
                        <h3>Your progress so far:</h3>
                        </div>
                    </div>`
    habitSection.insertAdjacentHTML('afterbegin', markup)
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