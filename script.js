const animationArea = document.getElementById('animationArea');
const finalMessage = document.getElementById('finalMessage');
const countdownDiv = document.getElementById('countdown');
const progressBar = document.getElementById('progressBar');

// Mensagens da carta
const messageParts = [
  "Querida Prof. Bianca Nora,",
  "Desejo muita felicidade e abraços sinceros para você.",
  "Que sua vida seja repleta de surpresas boas,",
  "e que você consiga alcançar todos os seus sonhos e metas com facilidade.",
  "Se alguma dificuldade aparecer pelo caminho, saiba que pode sempre contar comigo,",
  "pois estarei ao seu lado para apoiar e ajudar no que precisar.",
  "Tenho muito orgulho de você!",
  "Feliz aniversário, Bianca Nora! 🎉❤️",
  "Do Seu Aluno: Harahel Guilherme 🦊🐱🎂!",
  "E da sua Turma Preferida 3°C"
];

// Função para pegar a próxima segunda-feira às 08:15
function getNextMonday815() {
  const now = new Date();
  const day = now.getDay();

  let daysUntilMonday = (1 - day + 7) % 7;
  if (daysUntilMonday === 0) {
    if (now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() >= 15)) {
      daysUntilMonday = 7;
    }
  }
  const result = new Date(now);
  result.setDate(now.getDate() + daysUntilMonday);
  result.setHours(8, 15, 0, 0);
  return result;
}

const targetDate = getNextMonday815();

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownDiv.style.display = 'none';
    runFinalSequence();
    progressBar.style.width = '100%';
    progressBar.textContent = '100%';
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  countdownDiv.textContent = `Presente será aberto em ${d}d ${h}h ${m}m ${s}s`;

  updateProgressBar();
}

// Para a barra de progresso: começa 7 dias antes da próxima segunda 8:15, domingo 00:00
function getProgressStartDate() {
  const start = new Date(targetDate);
  start.setDate(targetDate.getDate() - 7);
  start.setHours(0, 0, 0, 0);
  return start;
}

const progressStartDate = getProgressStartDate();

function updateProgressBar() {
  const now = new Date();

  const totalDuration = targetDate - progressStartDate;
  const elapsed = now - progressStartDate;

  let progressPercent = Math.floor((elapsed / totalDuration) * 100);
  if (progressPercent < 0) progressPercent = 0;
  if (progressPercent > 100) progressPercent = 100;

  progressBar.style.width = progressPercent + '%';
  progressBar.textContent = progressPercent + '%';
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
  animationArea.appendChild(confetti);
  setTimeout(() => confetti.remove(), 5000);
}

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = (Math.random() * 80 + 10) + 'vw';
  balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  balloon.style.animationDuration = (5 + Math.random() * 3) + 's';
  animationArea.appendChild(balloon);
  setTimeout(() => balloon.remove(), 8000);
}

function typeWriter(element, text, speed = 40) {
  return new Promise((resolve) => {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else {
        resolve();
      }
    }
    typing();
  });
}

async function showMessageParts() {
  finalMessage.style.opacity = 1;
  finalMessage.style.animation = 'none';
  await new Promise(r => setTimeout(r, 10));
  finalMessage.innerHTML = '';

  for (const part of messageParts) {
    const line = document.createElement('div');
    finalMessage.appendChild(line);
    await typeWriter(line, part);
    await new Promise(r => setTimeout(r, 700));
  }

  finalMessage.style.animation = 'fadeInScale 2s forwards';
}

function runFinalSequence() {
  animationArea.innerHTML = '';
  finalMessage.style.opacity = 0;
  finalMessage.innerHTML = '';

  const confettiInterval = setInterval(createConfetti, 100);

  setTimeout(() => {
    clearInterval(confettiInterval);
    animationArea.innerHTML = '';

    const congrats = document.createElement('div');
    congrats.textContent = 'Parabéns!';
    congrats.classList.add('blink');
    animationArea.appendChild(congrats);

    setTimeout(() => {
      animationArea.innerHTML = '';

      const balloonInterval = setInterval(createBalloon, 300);

      setTimeout(() => {
        clearInterval(balloonInterval);
        animationArea.innerHTML = '';
        showMessageParts();
      }, 4000);
    }, 2500);
  }, 3000);
}

window.addEventListener('load', () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});