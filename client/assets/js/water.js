window.addEventListener('load', createDisplay)

async function createDisplay() {
    const { user, waterGoal, waterTracker, lastDrink } = await retrieveWaterData()
    displayGoal(waterGoal)
    displayWaterProgress(waterGoal, lastDrink)
    displayStreak(waterTracker, waterGoal)
}

async function retrieveWaterData(){
    user = await JSON.parse(localStorage.getItem('user'));
    const waterGoal = (await (await fetch(`http://localhost:3000/goals/${user.id}/3`)).json())[0]
    const waterTracker = await (await fetch(`http://localhost:3000/trackers/${user.id}/3`)).json()
    const lastDrink = waterTracker[(waterTracker.length) - 1]
    //console.log(user)
    console.log(waterGoal)
    // console.log(waterTracker)
    console.log(lastDrink)
    return { user, waterGoal, waterTracker, lastDrink};
}

async function displayGoal(waterGoal){
    const goalSection = document.querySelector('.goal')
    const goal = document.createElement('h2')
    goal.textContent = `${waterGoal.dailyGoal}`
    goalSection.append(goal, `${waterGoal.goalUnits} / day`)
}

async function displayWaterProgress(waterGoal, lastDrink){
    const progressSection = document.querySelector('.progress')
    const progressDisplay = ` <div class="circular-progress">
                    <span class="progress-value">${lastDrink.dailyValue} / ${waterGoal.dailyGoal} ${waterGoal.goalUnits}</span>
                    </div>`
    progressSection.insertAdjacentHTML('beforeend', progressDisplay)
}

async function displayStreak(waterTracker, waterGoal){
    const streakSection = document.querySelector('.streak')
    const streak = calculateStreak(waterTracker, waterGoal);
    const streakDisplay = document.createElement('h2')
    streakDisplay.textContent = `${streak}`;
    streakSection.append(streak)
}

async function calculateStreak(waterTracker, waterGoal){
    let streak=0;
    waterTracker.forEach(tracker =>{
        if(tracker.dailyValue >= waterGoal.dailyGoal){
            streak++;
        } else {
            streak = 0;
        }
    })
    return streak;
}
// retrieveWaterData();
