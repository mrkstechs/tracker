window.addEventListener('load', createDisplay)

async function createDisplay() {
    const { sleepGoal, sleepTrackers, lastSleep } = await retrieveSleepData()
    console.log(sleepGoal, sleepTrackers, lastSleep)
    displaySleepProgress(sleepGoal, lastSleep)
    displayGoal(sleepGoal)
    displayStreak(sleepTrackers, sleepGoal)
}

async function retrieveSleepData() {
    user = await JSON.parse(localStorage.getItem("user"));
    const sleepGoal = (await (await fetch(`http://localhost:3000/goals/${user.id}/1`)).json())[0]
    const sleepTrackers = await (await fetch(`http://localhost:3000/trackers/${user.id}/1`)).json()
    const lastSleep = sleepTrackers[(sleepTrackers.length)-1]
    return  { sleepGoal, sleepTrackers, lastSleep };
}

function displaySleepProgress(sleepGoal, lastSleep) {

    const progressSection = document.querySelector('div.progress')


    const goalProgressDisplay = `<div id="sleepProgress">
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
    const goal = document.createElement('h1')
    goal.textContent = `${sleepGoal.dailyGoal}`
    goalSection.append(goal, "hours / night")
}

function displayStreak(sleepTrackers, sleepGoal) {
    const streakSection = document.querySelector('div.streak')
    const streak = calculateStreak(sleepTrackers, sleepGoal);
    const streakElement = document.createElement('h1');
    streakElement.textContent = `${streak}`;
    streakSection.append(streak);
    

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


const logSleepSection = document.querySelector('div.logSleep')





// const sleepHabit = document.querySelector('#addSleepButton');
// const body = document.querySelector('body');
// const progress = document.querySelector('#progressDone');
// const progressBar = document.querySelector('#progress');


// sleepHabit.addEventListener('click', addSleep);

// //add a habit
// function addSleep(e){
//     e.preventDefault();
//     const amountGot = document.querySelector('#amountGot').value
//     const amountWanted = document.querySelector('#amountWanted').value
//     const dateDay = new Date().getDay()
//     const dateMonth = new Date().getMonth()

//     progress.style.width = `${(amountGot/amountWanted)*100}%`
//     progress.innerText = `${Math.ceil((amountGot/amountWanted)*100)}%`

//     switch (dateDay) {
//         case 0:
//             day = "Sunday";
//             break;
//         case 1:
//             day = "Monday";
//             break;
//         case 2:
//             day = "Tuesday";
//             break;
//         case 3:
//             day = "Wednesday";
//             break;
//         case 4:
//             day = "Thursday";
//             break;
//         case 5:
//             day = "Friday";
//             break;
//         case 6:
//             day = "Saturday";
//     }
//     switch(dateMonth){
//         case 0:
//             month = "January";
//             break;
//         case 1:
//             month = "February";
//             break;
//         case 2:
//             month = "March";
//             break;
//         case 3:
//             month = "April";
//             break;
//         case 4:
//             month = "May";
//             break;
//         case 5:
//             month = "June";
//             break;
//         case 6:
//             month = "July";
//             break;
//         case 7:
//             month = "August";
//             break;
//         case 8:
//             month = "September";
//             break;
//         case 9:
//             month = "October";
//             break;
//         case 10:
//             month = "November";
//             break;
//         case 11:
//             month = "December";
//             break;  
//     }
//     const habit ={
//         text: 'Sleep ',
//         amountGot: `${amountGot}`,
//         amountWanted: `${amountWanted}`,
//         completed: false,
//     }
//     const result = `<li>
//         <label>${habit.amountGot}/${habit.amountWanted} |
//         <span>${habit.text} | ${day} ${month}</span></label>
//     </li>`
//     body.innerHTML = result;
//     body.append(progressBar)
// }

// module.exports(addSleep);
