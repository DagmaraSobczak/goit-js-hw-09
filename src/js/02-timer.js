import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
let countdownTime = new Date().getTime();

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      countdownTime = selectedDates[0].getTime();
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  const timeLeft = countdownTime - new Date().getTime();

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  if (timeLeft <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  let countdownInterval = setInterval(() => {
    const timeLeft = countdownTime - new Date().getTime();

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Odliczanie zakończone!');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      daysValue.textContent = addLeadingZero(days);
      hoursValue.textContent = addLeadingZero(hours);
      minutesValue.textContent = addLeadingZero(minutes);
      secondsValue.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
