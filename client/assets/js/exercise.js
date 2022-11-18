window.addEventListener('load', createDisplay)

const logOutBtn = document.querySelector('.logout')

logOutBtn.addEventListener('click', logOut);

async function createDisplay () {
    try {
    const { user, exerciseGoal, exerciseTrackers, lastExercise } = await retrieveExData()
    if (!exerciseGoal){displayNewGoalForm(user)}
        else if (!lastExercise) {
            displayGoal(exerciseGoal)
            displayStreak(exerciseTrackers, exerciseGoal)
            displayAddTrackerButton(user)
        } else {
        displayLatestExercise(exerciseGoal, lastExercise)
        displayGoal(exerciseGoal)
        displayStreak(exerciseTrackers, exerciseGoal)
        displayAddTrackerButton(user)
    }
    return { user, exerciseGoal, exerciseTrackers, lastExercise }
    } catch (err) {
        console.log(err)
    } 
}

async function retrieveExData() {
    try {
    user = await JSON.parse(localStorage.getItem("user"));
    const exerciseGoal = (await (await fetch(`https://habithelper.herokuapp.com/goals/${user.id}/2`)).json())[0]
    const exerciseTrackers = await (await fetch(`https://habithelper.herokuapp.com/trackers/${user.id}/2`)).json()
    const lastExercise = exerciseTrackers[(exerciseTrackers.length)-1]
    return  { user, exerciseGoal, exerciseTrackers, lastExercise };
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
                        "habitId": 2, 
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

function displayLatestExercise(exerciseGoal, lastExercise) {

    const progressSection = document.querySelector('div.progress')

    const goalProgressDisplay = `<h2>Latest Exercise</h2>
                                <div id="exerciseProgress">
                                    <div class="circular-progress">
                                        <span class="progress-value">? / 8 hours</span>
                                    </div>
                                </div>`

    progressSection.insertAdjacentHTML('beforeend', goalProgressDisplay)

    const circularProgress = document.querySelector(".circular-progress")
    const progressValue = document.querySelector(".progress-value")

    progressValue.textContent = `${lastExercise.dailyValue} / ${exerciseGoal.dailyGoal} hours`
    circularProgress.style.background = `conic-gradient(#1F4AAC ${(lastExercise.dailyValue)/(exerciseGoal.dailyGoal)*360}deg, lightgrey 0deg)`
}

function displayGoal(exerciseGoal) {
    const goalSection = document.querySelector('div.goal') 
    const markup = `<h2>Goal</h2>
                    <h1>${exerciseGoal.dailyGoal}</h1>
                    <h3> hours / day </h3`
    goalSection.insertAdjacentHTML("afterbegin",markup)
}

function displayStreak(exerciseTrackers, exerciseGoal) {
    const streakSection = document.querySelector('div.streak')
    const streak = calculateStreak(exerciseTrackers, exerciseGoal);
    const markup = `<h2>Streak</h2>
                    <h1>${streak}<i class="bi bi-fire"></i></h1>`
    streakSection.insertAdjacentHTML("afterbegin",markup)
}

function calculateStreak(exerciseTrackers, exerciseGoal){
    streak = 0;
    exerciseTrackers.forEach(tracker => {
        if (tracker.dailyValue >= exerciseGoal.dailyGoal){
            streak++;
        } else {
            streak = 0;
        }
    })
    return streak;
}

function displayAddTrackerButton (user) {
    const logExSection = document.querySelector('div.logexercise')
    logExSection.innerHTML = ""
    markup = `<button id="displayAddTrackerForm" class="exerciseButton"><i class="bi-plus-circle"></i><br>Log Exercise!</button>`
    logExSection.insertAdjacentHTML('afterbegin',markup)
    const button = document.querySelector('#displayAddTrackerForm')
    button.addEventListener('click', () => {displayAddTrackerForm(logExSection, user)})
}

function displayAddTrackerForm (pageSection, user) {
    pageSection.innerHTML = ""
    markup = `<form id="exerciseForm">
                <input type="range" id="addExercise" name="addExercise" value="0" min="0" max="12" step="1" oninput="this.nextElementSibling.firstChild.value = this.value"></input>
                <label for="addExercise"><output>0</output> hours</label>
                <input type="submit" id="submitExercise" value="Log Exercise!">
            </form>
            <button id="displayAddTrackerButton">Back</button>`
    pageSection.insertAdjacentHTML('afterbegin',markup)
    const button = document.querySelector('#displayAddTrackerButton')
    button.addEventListener('click', function() {displayAddTrackerButton(user)})

    const exerciseForm = document.querySelector('#exerciseForm')
    exerciseForm.addEventListener('submit', submitTracker)
}

async function submitTracker (e) {
    e.preventDefault();
    const dailyValue = e.target.addExercise.value
    try {
        const body = { "habitId": 2, "dailyValue": dailyValue, "userId": user.id }
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

module.exports = {createDisplay, retrieveExData, displayNewGoalForm, submitGoal, displayLatestExercise, displayGoal, displayStreak, calculateStreak, displayAddTrackerButton, displayAddTrackerForm, submitTracker}
