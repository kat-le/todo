import { format } from "date-fns";

function renderClock() {
  const clock = document.querySelector(".clock");
  const greeting = document.querySelector(".greeting");

  function updateTime() {
    const now = new Date();

    clock.textContent = format(now, "hh:mm a");
    greeting.textContent = getGreeting();
  }
  updateTime();

  const now = new Date();
  const delay = (60 - now.getSeconds()) * 1000;

  setTimeout(() => {
    updateTime();

    setInterval(updateTime, 60000);
  }, delay);
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

export default {
  renderClock,
};
