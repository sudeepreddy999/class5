const calendar = document.querySelector(".calendar"),
date = document.querySelector(".date"),
daysContainer = document.querySelector(".days"),
prev = document.querySelector(".prev"),
next = document.querySelector(".next"),
todayBtn = document.querySelector(".today-btn"),
gotoBtn = document.querySelector(".goto-btn"),
dateInput = document.querySelector(".date-input"),
eventDay = document.querySelector(".event-day"),
eventDate = document.querySelector(".event-date"),
eventsContainer = document.querySelector(".events"),
addEventBtn = document.querySelector(".add-event"),
addEventWrapper = document.querySelector(".add-event-wrapper "),
addEventCloseBtn = document.querySelector(".close "),
addEventTitle = document.querySelector(".event-name "),
addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
var dateadd = document.getElementById("dateadd")
var date2 = dateadd.innerHTML;


// Split the date string into an array
var parts = date2.split("-");

// Extract the date and month while preserving leading zeros
var yearm = parts[0];
var monthm = parts[1].padStart(2, '0');
var daym = parts[2].padStart(2, '0');

// // Output the extracted values
// console.log("Year: " + yearm);
// console.log("Month: " + monthm);
// console.log("Day: " + daym);


const months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December",
];

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

// const eventsArr = [];
// // getEvents();
// console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);
const prevLastDay = new Date(year, month, 0);
const prevDays = prevLastDay.getDate();
const lastDate = lastDay.getDate();
const day = firstDay.getDay();
const nextDays = 7 - lastDay.getDay() - 1;

date.innerHTML = months[month] + " " + year;

let days = "";
// Previous month dates
for (let x = day; x > 0; x--) {
  days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
}

for (let i = 1; i <= lastDate; i++) {
  
  if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth() ) {
    activeDay = i;
    getActiveDay(i);
    
      days += `<div class="day today active">${i}</div>`;
    
  } else {
    
      days += `<div class="day ">${i}</div>`;
    
  }
}
// Next month dates
for (let j = 1; j <= nextDays; j++) {
  days += `<div class="day next-date">${j}</div>`;
}
daysContainer.innerHTML = days;
addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
month--;
if (month < 0) {
  month = 11;
  year--;
}
initCalendar();
}

function nextMonth() {
month++;
if (month > 11) {
  month = 0;
  year++;
}
initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();
//function to add active on day
function addListner() {
const days = document.querySelectorAll(".day");
days.forEach((day) => {
  day.addEventListener("click", (e) => {
    getActiveDay(e.target.innerHTML);
    // updateEvents(Number(e.target.innerHTML));
    activeDay = Number(e.target.innerHTML);
    //remove active
    days.forEach((day) => {
      day.classList.remove("active");
    });
    //if clicked prev-date or next-date switch to that month
    if (e.target.classList.contains("prev-date")) {
      prevMonth();
      //add active to clicked day afte month is change
      setTimeout(() => {
        //add active where no prev-date or next-date
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
          if (
            !day.classList.contains("prev-date") &&
            day.innerHTML === e.target.innerHTML
          ) {
            day.classList.add("active");
          }
        });
      }, 100);
    } else if (e.target.classList.contains("next-date")) {
      nextMonth();
      //add active to clicked day afte month is changed
      setTimeout(() => {
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
          if (
            !day.classList.contains("next-date") &&
            day.innerHTML === e.target.innerHTML
          ) {
            day.classList.add("active");
          }
        });
      }, 100);
    } else {
      e.target.classList.add("active");
    }
    const date1 = e.target.innerHTML;
    const month1 = month+1;
    const year1 = year ;
    const data = {
       key1: date1,
       key2: month1,
       key3: year1
    };
    const Formforevents = document.getElementById('Formforevents');
    const dateforevents = document.getElementById('dateforevents');
    dateforevents.value=year1+"-"+month1+"-"+date1;
    console.log(dateforevents.value);
    Formforevents.submit();
    
  });
});
}
todayBtn.addEventListener("click", () => {
today = new Date();
month = today.getMonth();
year = today.getFullYear();
initCalendar();
});

dateInput.addEventListener("input", (e) => {
dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
if (dateInput.value.length === 2) {
  dateInput.value += "/";
}
if (dateInput.value.length > 7) {
  dateInput.value = dateInput.value.slice(0, 7);
}
if (e.inputType === "deleteContentBackward") {
  if (dateInput.value.length === 3) {
    dateInput.value = dateInput.value.slice(0, 2);
  }
}
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
console.log("here");
const dateArr = dateInput.value.split("/");
if (dateArr.length === 2) {
  if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
    month = dateArr[0] - 1;
    year = dateArr[1];
    initCalendar();
    return;
  }
}
alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
const day = new Date(year, month, date);
const dayName = day.toString().split(" ")[0];
eventDay.innerHTML = dayName;
eventDate.innerHTML = date + " " + months[month] + " " + year;
}


addEventBtn.addEventListener("click", () => {
addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
  addEventWrapper.classList.remove("active");
}
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
addEventTitle.value = addEventTitle.value.slice(0, 60);
});



function convertTime(time) {
let timeArr = time.split(":");
let timeHour = timeArr[0];
let timeMin = timeArr[1];
let timeFormat = timeHour >= 12 ? "PM" : "AM";
timeHour = timeHour % 12 || 12;
time = timeHour + ":" + timeMin + " " + timeFormat;
return time;
}

const subadd = document.getElementById('subadd');
const dat2add = document.getElementById('date2Add');
subadd.addEventListener("click", (e) => {
  const date1 = daym;
    const month1 = monthm;
    const year1 = yearm ;
  dat2add.value=year1+"-"+month1+"-"+date1;
  });