const html = document.querySelector('html');

const focusBtn = document.querySelector('.app__card-button--foco');
const shortRestBtn = document.querySelector('.app__card-button--curto');
const longRestBtn = document.querySelector('.app__card-button--longo');

const buttons = document.querySelectorAll('.app__card-button');

const banner = document.querySelector('.app__image');

const title = document.querySelector('.app__title');

const musicInput = document.querySelector('#alternar-musica');

const music = new Audio('/sons/luna-rise-part-one.mp3');
const beep = new Audio('/sons/beep.mp3');
const startTimer = new Audio('/sons/play.mp3');
const pauseTimer = new Audio('/sons/pause.mp3');

music.loop = true;

const timeLeft = document.querySelector('#timer');
const startPauseBtn = document.querySelector('#start-pause');
const startPauseImg = startPauseBtn.querySelector('img');
const startPauseSpan = startPauseBtn.querySelector('span');

const startPauseBtnImg = document.querySelector('.app__card-primary-butto-icon');

let isPaused = false;
let countDown;

let time = 1500;

musicInput.addEventListener('change', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

focusBtn.addEventListener('click', () => {
    time = 1500;
    alterContext('foco');
    focusBtn.classList.toggle('active');

})
shortRestBtn.addEventListener('click', () => {
    time = 300;
    alterContext('descanso-curto');
    shortRestBtn.classList.toggle('active');

})
longRestBtn.addEventListener('click', () => {
    time = 900;
    alterContext('descanso-longo');
    longRestBtn.classList.toggle('active');

})



function alterContext(context) {
    timeLeft.textContent = formatTime(time);
    buttons.forEach((context) => {
        context.classList.remove('active');
    })
    html.setAttribute('data-contexto', context);
    banner.setAttribute('src', `/imagens/${context}.png`);
    switch (context) {
        case "descanso-curto":
            title.innerHTML = `
                    Que tal dar uma respirada?,<br>
                    <strong class="app__title-strong">Faça uma pausa curta!.</strong>`;

            break;
        case "descanso-longo":
            title.innerHTML = `
                    Hora de voltar à superfície.<br>
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>`;

            break;
        default:
            title.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
    }
}
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
timeLeft.textContent = formatTime(time);
startPauseBtn.addEventListener('click', () => {
    startPauseImg.setAttribute('src', '/imagens/pause.png');
    isPaused = !isPaused;
    startTimer.play();
    if (isPaused) {
        startPauseSpan.textContent = "Começar";
        startCountdown();
    } else {
        pauseTimer.play();
        startPauseSpan.textContent = "Pausar";
        startPauseImg.setAttribute('src', '/imagens/play_arrow.png');
        pauseCountDown();
    }
});

function startCountdown() {
    countdown = setInterval(() => {
        if (isPaused) {
            time--;
            timeLeft.textContent = formatTime(time);
            if (time <= 0) {
                clearInterval(countdown);
                timer.textContent = "Time's up!";
                beep.play();
            }
        }
    }, 1000);
}

function pauseCountDown() {
    clearInterval(countdown);
    countdown = null;
}