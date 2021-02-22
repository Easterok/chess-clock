const timers = document.querySelectorAll('.js-time');

const players = document.querySelectorAll('.player');

let activePlayerIndex = null;
let activePlayerInterval = null;

let timeBank = Array.from(players).map(() => 10 * 60 * 1000);

let start = null;
let playerStartTime = null;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/chess-clock/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
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
    timers[activePlayerIndex].textContent = `${new Date(newTime).getMinutes()}:${new Date(newTime).getSeconds()}`;

    window.requestAnimationFrame(render);
}

players.forEach((player, index) => {
    player.addEventListener('click', () => {
        if (activePlayerIndex === null) {
            window.requestAnimationFrame(render);
        }

        if (activePlayerIndex !== index) {
            activePlayerIndex = index;
            start = null;
            playerStartTime = timeBank[index];
        } else {
            activePlayerIndex = null;
        }
    });
});


const reset = document.querySelector('.js-reset');

reset.addEventListener('click', () => {
    activePlayerIndex = null;
    start = null;

    timeBank = Array.from(players).map(() => 10 * 60 * 1000);

    Array.from(timers).forEach((timer, index) => {
        timer.textContent = `10:00`;
    })
});