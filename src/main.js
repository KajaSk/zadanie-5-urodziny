import './style.css';
import dayjs from 'dayjs';

const form = document.getElementById('birthdayForm');
const dialog = document.getElementById('result');
const close = document.getElementById('close');
const dialogText = document.getElementById('dialogText');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const birthDateValue = document.getElementById('birthdate').value;
  if (!birthDateValue) return;

  const today = dayjs().startOf('day');
  const birthdayThisYear = dayjs(birthDateValue).year(today.year()).startOf('day');

  let lastBirthday = birthdayThisYear;
  if(birthdayThisYear.isAfter(today)){
    lastBirthday = lastBirthday.subtract(1, 'year');
  }

  const daysPassed = today.diff(lastBirthday, 'days');
  let message = '<p class="mb-4">Od Twoich ostatnich urodzin minęło: <strong>' + daysPassed + '</strong> dni.</p>';

  let nextBirthday = birthdayThisYear;
  if(today.isAfter(birthdayThisYear)){
    nextBirthday = nextBirthday.add(1, 'year');
  }
  const daysToNextBirthday = nextBirthday.diff(today, 'days');
  const weeksToBirtday = Math.floor(daysToNextBirthday/7);

  const isBirthdayToday = today.isSame(birthdayThisYear, 'day');
  if(isBirthdayToday){
    message += '<p class="text-2xl font-bold mt-2">Wszystkiego najlepszego!</p>';
  }else{
    if(weeksToBirtday === 0){
      message += '<p class="font-bold">Masz urodziny w tym tygodniu!</p>';
    }
  }

  message += '<p>Do najbliższych urodzin pozostało: <strong>' + weeksToBirtday + '</strong> tygodni.</p>';

  dialogText.innerHTML = message;
  dialog.showModal();
})
close.addEventListener('click', () => {
    dialog.close();
  })
