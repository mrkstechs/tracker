window.addEventListener('load', createDisplay)

async function createDisplay() {
    const { user, sleepGoal, sleepTrackers, lastSleep } = await retrieveSleepData()
    if (!sleepGoal){displayNewGoalForm(user)} else {
        displayLatestSleep(sleepGoal, lastSleep)
        displayGoal(sleepGoal)
        displayStreak(sleepTrackers, sleepGoal)
        displayAddTrackerButton(user)
    }
}

async function retrieveSleepData() {
    try {
    user = await JSON.parse(localStorage.getItem("user"));
    const sleepGoal = (await (await fetch(`http://localhost:3000/goals/${user.id}/1`)).json())[0]
    const sleepTrackers = await (await fetch(`http://localhost:3000/trackers/${user.id}/1`)).json()
    const lastSleep = sleepTrackers[(sleepTrackers.length)-1]
    return  { user, sleepGoal, sleepTrackers, lastSleep };
    } catch (err) {
        return false
    }
}

// function displayAddSleepGoal (user) {
//     const trackersSection = document.querySelector('div.trackers')
    // const markup = `<div class="habit" id="sleepHabit">
    //                     <i class="bi bi-alarm"></i>
    //                     <h2>Sleep</h2>
    //                     <div class="newGoal">
    //                         <h1>+</h1>
    //                         <h4>Start tracking sleep!</h4>
    //                     </div>
    //                 </div>`
//     trackersSection.insertAdjacentHTML('afterbegin', markup)
//     newGoalButton = document.querySelector('div.newGoal')
//     newGoalButton.addEventListener('click', (user) => {displayNewGoalForm(user)})
// }

function displayNewGoalForm (user) {
    const goalSection = document.querySelector('div.trackers')
    goalSection.innerHTML = "";
    const goalForm = `<form id="sleepForm">
                        <input type="range" id="addSleep" name="addSleep" value="0" min="0" max="12" step="1" oninput="this.nextElementSibling.firstChild.value = this.value"></input>
                        <label for="addSleep"><output>0</output> hours</label>
                        <input type="submit" id="submitGoal" value="Add Goal!">
                    </form>
                    <button id="backToHome">back</button>`
    goalSection.insertAdjacentHTML('afterbegin', goalForm)

    const button = document.querySelector('#backToHome')
    button.addEventListener('click', () => {window.location.assign('/client/homepage.html')})

}

function displayLatestSleep(sleepGoal, lastSleep) {

    const progressSection = document.querySelector('div.progress')

    const goalProgressDisplay = `<h2>Progress</h2>
                                <div id="sleepProgress">
                                    <div class="circular-progress">
                                        <span class="progress-value">? / 8 hours</span>
                                    </div>
                                </div>`
    
    progressSection.insertAdjacentHTML('beforeend',goalProgressDisplay)

    const circularProgress = document.querySelector(".circular-progress")
    const progressValue = document.querySelector(".progress-value")
    progressValue.textContent = `${lastSleep.dailyValue} / ${sleepGoal.dailyGoal} hours`
    circularProgress.style.background = `conic-gradient(#f0ff ${(lastSleep.dailyValue)/(sleepGoal.dailyGoal)*360}deg, lightgrey 0deg)`    
}

function displayGoal(sleepGoal) {
    const goalSection = document.querySelector('div.goal') 
    const markup = `<h2>Goal</h2>
                    <h1>${sleepGoal.dailyGoal}</h1>
                    <h3> hours / night </h3`
    goalSection.insertAdjacentHTML("afterbegin",markup)
}

function displayStreak(sleepTrackers, sleepGoal) {
    const streakSection = document.querySelector('div.streak')
    const streak = calculateStreak(sleepTrackers, sleepGoal);
    const markup = `<h2>Streak</h2>
                    <h1>${streak}<i class="bi bi-fire"></i></h1>`
    streakSection.insertAdjacentHTML("afterbegin",markup)
}

function calculateStreak(sleepTrackers, sleepGoal){
    streak = 0;
    sleepTrackers.forEach(tracker => {
        if (tracker.dailyValue >= sleepGoal.dailyGoal){
            streak++;
        } else {
            streak = 0;
        }
    })
    return streak;
}

function displayAddTrackerButton (user) {
    const logSleepSection = document.querySelector('div.logSleep')
    logSleepSection.innerHTML = ""
    markup = `<button id="displayAddTrackerForm" class="sleepButton"><i class="bi-plus"></i><br>Log Sleep!</button>`
    logSleepSection.insertAdjacentHTML('afterbegin',markup)
    const button = document.querySelector('#displayAddTrackerForm')
    button.addEventListener('click', () => {displayAddTrackerForm(logSleepSection, user)})
}

function displayAddTrackerForm (pageSection, user) {
    pageSection.innerHTML = ""
    markup = `<form id="sleepForm">
                <input type="range" id="addSleep" name="addSleep" value="0" min="0" max="12" step="1" oninput="this.nextElementSibling.firstChild.value = this.value"></input>
                <label for="addSleep"><output>0</output> hours</label>
                <input type="submit" id="submitSleep" value="Log Sleep!">
            </form>
            <button id="displayAddTrackerButton">back</button>`
    pageSection.insertAdjacentHTML('afterbegin',markup)
    const button = document.querySelector('#displayAddTrackerButton')
    button.addEventListener('click', function() {displayAddTrackerButton(user)})

    const sleepForm = document.querySelector('#sleepForm')
    sleepForm.addEventListener('submit', submitTracker)
}

async function submitTracker (e) {
    e.preventDefault();
    const dailyValue = e.target.addSleep.value
    try {
        const body = { "habitId": 1, "dailyValue": dailyValue, "userId": user.id }
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