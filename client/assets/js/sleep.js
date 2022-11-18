window.addEventListener('load', createDisplay)

const logOutBtn = document.querySelector('.logout')

logOutBtn.addEventListener('click', logOut);

async function createDisplay() {
    const { user, sleepGoal, sleepTrackers, lastSleep } = await retrieveSleepData()
    if (!sleepGoal){displayNewGoalForm(user)} 
        else if (!lastSleep) {
            displayGoal(sleepGoal)
            displayStreak(sleepTrackers, sleepGoal)
            displayAddTrackerButton(user)
        } else {
        displayLatestSleep(sleepGoal, lastSleep)
        displayGoal(sleepGoal)
        displayStreak(sleepTrackers, sleepGoal)
        displayAddTrackerButton(user)
    }
}

async function retrieveSleepData() {
    try {
    user = await JSON.parse(localStorage.getItem("user"));
    const sleepGoal = (await (await fetch(`https://habithelper.herokuapp.com/goals/${user.id}/1`)).json())[0]
    const sleepTrackers = await (await fetch(`https://habithelper.herokuapp.com/trackers/${user.id}/1`)).json()
    const lastSleep = sleepTrackers[(sleepTrackers.length)-1]
    return  { user, sleepGoal, sleepTrackers, lastSleep };
    } catch (err) {
        return false
    }
}

function displayNewGoalForm () {
    const goalSection = document.querySelector('div.trackers')
    goalSection.innerHTML = "";
    const goalForm = `<form id="goalForm">
                        <input type="range" id="addGoal" name="addGoal" value="0" min="0" max="12" step="1" oninput="this.nextElementSibling.firstChild.value = this.value"></input>
                        <label for="addGoal"><output>0</output> hours</label>
                        <input type="submit" id="submitGoal" value="Add Goal!">
                    </form>
                    <button id="backToHome">Back</button>`
    goalSection.insertAdjacentHTML('afterbegin', goalForm)

    const button = document.querySelector('#backToHome')
    button.addEventListener('click', () => {window.location.assign('/homepage.html')})

    const newGoalForm = document.querySelector('#goalForm')
    newGoalForm.addEventListener('submit', submitGoal)
}

async function submitGoal (e) {
    e.preventDefault;
    const dailyGoal = e.target.addGoal.value
    try {
        const body = { "userId": user.id, 
                        "habitId": 1, 
                        "dailyGoal": dailyGoal, 
                        "weeklyGoal":  dailyGoal*7,
                        "goalUnits": "hours"}
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        const r = await fetch(`https://habithelper.herokuapp.com/goals`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        window.location.reload();
    } catch (err) {
        console.warn(err);
    }
}

function displayLatestSleep(sleepGoal, lastSleep) {

    const progressSection = document.querySelector('div.progress')

    const goalProgressDisplay = `<h2>Latest Logged Sleep</h2>
                                <div id="sleepProgress">
                                    <div class="circular-progress">
                                        <span class="progress-value">? / 8 hours</span>
                                    </div>
                                </div>`
    
    progressSection.insertAdjacentHTML('beforeend',goalProgressDisplay)

    const circularProgress = document.querySelector(".circular-progress")
    const progressValue = document.querySelector(".progress-value")

    progressValue.textContent = `${lastSleep.dailyValue} / ${sleepGoal.dailyGoal} hours`
    circularProgress.style.background = `conic-gradient(#1F4AAC ${(lastSleep.dailyValue)/(sleepGoal.dailyGoal)*360}deg, lightgrey 0deg)`    
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
    markup = `<button id="displayAddTrackerForm" class="sleepButton"><i class="bi bi-plus-circle"></i></i>&nbspLog Sleep!</button>`
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
            <button id="displayAddTrackerButton">Back</button>`
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
        const r = await fetch(`https://habithelper.herokuapp.com/trackers`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        window.location.reload();
    } catch (err) {
        console.warn(err);
    }
}

async function logOut(){
    window.location.assign('/index.html')
}
