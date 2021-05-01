const timers = document.querySelectorAll(".js-time");
const body = document.querySelector("body");
const players = document.querySelectorAll(".player");

let activePlayerIndex = null;
let activePlayerInterval = null;
let gameTime = 10 * 60 * 1000;
let timeBank = Array.from(players).map(() => gameTime);

let start = null;
let playerStartTime = null;
let walkTime = 0;

resetGameTime();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/chess-clock/sw.js").then();
}

function render(timestamp) {
  if (activePlayerIndex === null) {
    return;
  }

  if (start === null) {
    start = timestamp;
  }

  const diff = timestamp - start;
  const newTime = playerStartTime - diff;

  timeBank[activePlayerIndex] = newTime;
  timers[activePlayerIndex].textContent = getDateString(new Date(newTime));

  window.requestAnimationFrame(render);
}

players.forEach((player, index) => {
  player.addEventListener("click", () => {
    if (activePlayerIndex === null) {
      body.classList.toggle("game_active");
      window.requestAnimationFrame(render);
    }

    activePlayerIndex = 1 - index;
    start = null;
    timeBank[activePlayerIndex] = timeBank[activePlayerIndex] + walkTime;
    playerStartTime = timeBank[activePlayerIndex];
  });
});

const reset = document.querySelector(".js-reset");

reset.addEventListener("click", () => {
  activePlayerIndex = null;
  start = null;

  body.classList.toggle("game_active");
  resetGameTime();
});

function setTime(value) {
  const newTime = parseInt(value) * 60 * 1000;
  gameTime = newTime;

  resetGameTime();
}

function addWalkTime(value) {
  walkTime = parseInt(value);
}

function addTime(player, value) {
  const index = player === "first" ? 0 : 1;

  if (activePlayerIndex === index) {
    playerStartTime += value;
  } else {
    timeBank[index] = timeBank[index] + value;

    Array.from(timers).forEach((timer, index) => {
      timer.textContent = getDateString(new Date(timeBank[index]));
    });
  }
}

function resetGameTime() {
  timeBank = Array.from(players).map(() => gameTime);

  const date = new Date(gameTime);
  const content = getDateString(date);

  Array.from(timers).forEach((timer) => (timer.textContent = content));
}

function getDateString(date) {
  return date.toLocaleTimeString("ru").slice(3);
}
