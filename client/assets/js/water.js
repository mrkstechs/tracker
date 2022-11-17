window.addEventListener('load', createDisplay)

async function createDisplay() {
    const { user, waterGoal, waterTracker, lastDrink } = await retrieveWaterData()
    if (!waterGoal) {displayNewGoalForm(user)} 
        else if (!lastDrink) {
            displayGoal(waterGoal)
            displayStreak(waterTracker, waterGoal)
            displayAddTrackerButton(user)
        } else {
            displayGoal(waterGoal)
            displayWaterProgress(waterGoal, lastDrink)
            displayStreak(waterTracker, waterGoal)
            displayAddTrackerButton(user)
        }
}

async function retrieveWaterData(){
    user = await JSON.parse(localStorage.getItem('user'));
    const waterGoal = (await (await fetch(`http://localhost:3000/goals/${user.id}/3`)).json())[0]
    const waterTracker = await (await fetch(`http://localhost:3000/trackers/${user.id}/3`)).json()
    const lastDrink = waterTracker[(waterTracker.length) - 1]
    return { user, waterGoal, waterTracker, lastDrink};
}

function displayNewGoalForm () {
    const goalSection = document.querySelector('div.trackers')
    goalSection.innerHTML = "";
    const goalForm = `<form id="goalForm">
                        <input type="range" id="addGoal" name="addGoal" value="0" min="0" max="20" step="1" oninput="this.nextElementSibling.firstChild.value = this.value"></input>
                        <label for="addGoal"><output>0</output>litres</label>
                        <input type="submit" id="submitGoal" value="Add Goal!">
                    </form>
                    <button id="backToHome">back</button>`
    goalSection.insertAdjacentHTML('afterbegin', goalForm)

    const button = document.querySelector('#backToHome')
    button.addEventListener('click', () => {window.location.assign('/client/homepage.html')})

    const newGoalForm = document.querySelector('#goalForm')
    newGoalForm.addEventListener('submit', submitGoal)
}

async function submitGoal (e) {
    e.preventDefault;
    const dailyGoal = e.target.addGoal.value
    try {
        const body = { "userId": user.id, 
                        "habitId": 3, 
                        "dailyGoal": dailyGoal, 
                        "weeklyGoal":  dailyGoal*7,
                        "goalUnits": "litres"}
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        const r = await fetch(`http://localhost:3000/goals`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        window.location.reload();
    } catch (err) {
        console.warn(err);
    }
}

function displayAddTrackerButton (user) {
    const logWaterSection = document.querySelector('div.logWater')
    logWaterSection.innerHTML = ""
    markup = `<button id="displayAddTrackerForm" class="waterButton"><i class="bi-plus"></i><br>Log Water!</button>`
    logWaterSection.insertAdjacentHTML('afterbegin',markup)
    const button = document.querySelector('#displayAddTrackerForm')
    button.addEventListener('click', () => {displayAddTrackerForm(logWaterSection, user)})
}

function displayAddTrackerForm (pageSection, user) {
    pageSection.innerHTML = ""
    markup = `<form id="waterForm">
                <input type="range" id="addWater" name="addWater" value="0" min="0" max="10" step="1" oninput="this.nextElementSibling.firstChild.value = this.value"></input>
                <label for="addWater"><output>0</output> litres</label>
                <input type="submit" id="submitWater" value="Log Water!">
            </form>
            <button id="displayAddTrackerButton">back</button>`
    pageSection.insertAdjacentHTML('afterbegin',markup)
    const button = document.querySelector('#displayAddTrackerButton')
    button.addEventListener('click', function() {displayAddTrackerButton(user)})

    const waterForm = document.querySelector('#waterForm')
    waterForm.addEventListener('submit', submitTracker)
}

async function submitTracker (e) {
    e.preventDefault();
    const dailyValue = e.target.addWater.value
    try {
        const body = { "habitId": 3, "dailyValue": dailyValue, "userId": user.id }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        const r = await fetch(`http://localhost:3000/trackers`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        window.location.reload();
    } catch (err) {
        console.warn(err);
    }
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
    // console.log(streak)
    const div = document.createElement('div')
    const streakDisplay = document.createElement('h2')
    streakDisplay.textContent = `${streak}`;
    const fire = document.createElement('i')
    fire.className = 'bi bi-fire'
    streakSection.append(streak, fire)
}

function calculateStreak(waterTracker, waterGoal){
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
