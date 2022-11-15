window.addEventListener('load', displayHabits)


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

exPreview(1)