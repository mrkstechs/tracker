const sleepHabit = document.querySelector('#addSleepButton');
const body = document.querySelector('body');
const progress = document.querySelector('#progressDone');
const progressBar = document.querySelector('#progress');


sleepHabit.addEventListener('click', addSleep);

//add a habit
function addSleep(e){
    e.preventDefault();
    const amountGot = document.querySelector('#amountGot').value
    const amountWanted = document.querySelector('#amountWanted').value
    const dateDay = new Date().getDay()
    const dateMonth = new Date().getMonth()

    progress.style.width = `${(amountGot/amountWanted)*100}%`
    progress.innerText = `${Math.ceil((amountGot/amountWanted)*100)}%`

    switch (dateDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }
    switch(dateMonth){
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;  
    }
    const habit ={
        text: 'Sleep ',
        amountGot: `${amountGot}`,
        amountWanted: `${amountWanted}`,
        completed: false,
    }
    const result = `<li>
        <label>${habit.amountGot}/${habit.amountWanted} |
        <span>${habit.text} | ${day} ${month}</span></label>
    </li>`
    body.innerHTML = result;
    body.append(progressBar)
}

module.exports(addSleep);
