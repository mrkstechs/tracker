
async function exPreview (user) {
    try {
        const response = await fetch(`http://localhost:3000/goals/${user}`)
        const data = await response.json();
        const exerciseGoal = data.filter(obj => obj.habitId == 2)
        const recommendedGoals = await fetch('http://localhost:3000/habits').then(data => data.json()).then(goals => goals.find(habit => habit.id == 2))
        console.log(`User's current goal/progress:`, exerciseGoal)
        console.log(`Recommended goal/progress:`, recommendedGoals)
    } catch (err) {
        console.warn(err);
    }
}

function getUserGoals(user) {
    fetch(`http://localhost:3000/goals/${user}`)
    .then(r => r.json())
    .then(showExercise)
    .catch(console.warn)
}

function showExercise () {
    const goal = document.querySelector('#exercise')
    let goalNumber = document.createElement('h4')
    goalNumber.id = "goalnumber"
    goal.append(goalNumber) 
}







async function slePreview (user) {
    try {
        const response = await fetch(`http://localhost:3000/goals/${user}`)
    } catch {

    }
}

// function slePreview () {

// }

// function watPreview () {

// }

exPreview(1)

slePreview()

watPreview()