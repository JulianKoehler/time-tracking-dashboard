'use strict';

//the Buttons to select each period
const dailyBtn = document.querySelector(".dashboard__grid__user-info__selection-wrapper__daily");
const weeklyBtn = document.querySelector(".dashboard__grid__user-info__selection-wrapper__weekly");
const monthlyBtn = document.querySelector(".dashboard__grid__user-info__selection-wrapper__monthly");

// get all the divs that are showing the hours spent in the dashboard
const workCurrent = document.querySelector(".work-hours");
const workLast = document.querySelector(".work-last");
const playCurrent = document.querySelector(".play-hours");
const playLast = document.querySelector(".play-last");
const studyCurrent = document.querySelector(".study-hours");
const studyLast = document.querySelector(".study-last");
const exerciseCurrent = document.querySelector(".exercise-hours");
const exerciseLast = document.querySelector(".exercise-last");
const socialCurrent = document.querySelector(".social-hours");
const socialLast = document.querySelector(".social-last");
const selfcareCurrent = document.querySelector(".self-care-hours");
const selfcareLast = document.querySelector(".self-care-last");

// creating an Array of the elements to loop through them in the other functions
const currentList = [workCurrent, playCurrent, studyCurrent, exerciseCurrent, socialCurrent, selfcareCurrent];
const lastList = [workLast, playLast, studyLast, exerciseLast, socialLast, selfcareLast];
const btnArray = [dailyBtn, weeklyBtn, monthlyBtn];

const URL = '../data.json';

//fetch the data initial onload
window.onload = () => {
    fetch(URL)
    .then(response => response.json())
    .then(json => renderData(json))
}

//fetch the data onclick for each period button
btnArray.forEach(btn => btn.addEventListener('click', () => {
    fetch(URL)
        .then(response => response.json())
        .then(json => renderData(json))
}))

//removes the ".selected" CSS class each time for all buttons (refers to the selectPeriod() function below)
const removeClass = () => {
    btnArray.forEach(btn => btn.classList.remove("selected"));
}

// highlights the currently presented timeframe or period by assigning the CSS class ".selected" which changes the color of the font to white. 1 is daily, 2 weekly and 3 monthly. The function is being invoked in the HTML with the according parameter on each div
const selectPeriod = period => {
    switch (period) {
        case 1:
            removeClass();
            dailyBtn.classList.add("selected");
            break;
        case 2:
            removeClass();
            weeklyBtn.classList.add("selected");
            break;
        case 3:
            removeClass();
            monthlyBtn.classList.add("selected");
            break;
    }
}

const renderData = data => {
    if (dailyBtn.classList.contains("selected")) { // renderings in case the user selected "Daily"
        setHours(data, "daily", "Day")
        
    } else if (weeklyBtn.classList.contains("selected")) { // renderings in case the user selected "Weekly"
        setHours(data, "weekly", "Week")

    } else if (monthlyBtn.classList.contains("selected")) { //renderings in case the user selected "Monthly"
        setHours(data, "monthly", "Month")
    }
    console.log(data)
}

// loops through the HTML-Div list setting the hours based on the period passed to the function in the renderData function above
function setHours(data, period, timeframe) {
    for (let i = 0; i < currentList.length; i++) {
        currentList[i].textContent = `${data[i].timeframes[period].current}hrs`; // for the current hours
    }
    for (let i = 0; i < lastList.length; i++) {
        lastList[i].textContent = `Last ${timeframe} - ${data[i].timeframes[period].previous}hrs`; // for the hours of the last period
    }
}