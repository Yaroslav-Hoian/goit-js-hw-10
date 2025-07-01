import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = "";

const input = document.querySelector("#datetime-picker");
const showDays = document.querySelector("[data-days]");
const showHours = document.querySelector("[data-hours]");
const showMinutes = document.querySelector("[data-minutes]");
const showSeconds = document.querySelector("[data-seconds]");
const btn = document.querySelector("button");
btn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (selectedDates[0] < new Date()) {
            btn.disabled = true;
            return iziToast.error({
                position: 'topRight',
                title: 'Error',
                message: 'Please choose a date in the future',
            });
        } else btn.disabled = false;    
    },
};

const fp = flatpickr("#datetime-picker", options);



function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    showDays.textContent = addLeadingZero(days);
    showHours.textContent = addLeadingZero(hours);
    showMinutes.textContent = addLeadingZero(minutes);
    showSeconds.textContent = addLeadingZero(seconds);
    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

btn.addEventListener("click", () => {
    btn.disabled = true;
    input.disabled = true;
    const intervalId = setInterval(() => {
        if ((userSelectedDate - new Date()) <= 0) {
            clearInterval(intervalId);
            btn.disabled = false;
            input.disabled = false;
            return;
        };
        convertMs(userSelectedDate - new Date());
    }, 1000);
});




