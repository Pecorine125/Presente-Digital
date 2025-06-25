const animationArea = document.getElementById('animationArea');
const finalMessage = document.getElementById('finalMessage');

const messageParts = [
  "Querida Prof. Bianca Nora,",
  "Desejo muita felicidade e abraços sinceros para você.",
  "Que sua vida seja repleta de surpresas boas,",
  "e que você consiga alcançar todos os seus sonhos e metas com facilidade.",
  "Se alguma dificuldade aparecer pelo caminho, saiba que pode sempre contar comigo,",
  "pois estarei ao seu lado para apoiar e ajudar no que precisar.",
  "Tenho muito orgulho de você!",
  "Feliz aniversário, Bianca Nora! 🎉❤️",
  "Do Seu Aluno: Harahel Guilherme 🦊🐱🎂!"
];

// Cronômetro até próxima segunda 08:30
const countdownDiv = document.createElement('div');
countdownDiv.id = 'countdown';
countdownDiv.style.position = 'absolute';
countdownDiv.style.top = '20px';
countdownDiv.style.left = '50%';
countdownDiv.style.transform = 'translateX(-50%)';
countdownDiv.style.fontSize = '20px';
countdownDiv.style.color = '#c2185b';
countdownDiv.style.fontWeight = 'bold';
countdownDiv.style.textAlign = 'center';
document.body.appendChild(countdownDiv);

function getNextMondayAt830() {
  const now = new Date();
  const result = new Date();
  result.setHours(8, 30, 0, 0);
  const currentDay = now.getDay();
  const daysUntilMonday = (8 - currentDay) % 7 || 7;
  result.setDate(now.getDate() + daysUntilMonday);
  return result;
}

const targetDate = getNextMondayAt830();

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownDiv.style.display = 'none';
    showGiftBox();
    runPartyAnimations();
    return;
  }

  const m = Math.floor(diff / (1000 * 60));
  const s = Math.floor((diff / 1000) % 60);

  countdownDiv.textContent = `Presente será aberto em ${m}m ${s}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Presente animado
function showGiftBox() {
  const gift = document.createElement('div');
  gift.classList.add('gift-box');
  animationArea.appendChild(gift);

  // Após 4 segundos "abre" o presente e mostra mensagem
  setTimeout(() => {
    gift.classList.add('open');
    showMessageParts();
  }, 4000);
}

// Confetes
function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
  animationArea.appendChild(confetti);
  setTimeout(() => confetti.remove(), 5000);
}

// Balões
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = (Math.random() * 80 + 10) + 'vw';
  balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  balloon.style.animationDuration = (5 + Math.random() * 3) + 's';
  animationArea.appendChild(balloon);
  setTimeout(() => balloon.remove(), 8000);
}

function runPartyAnimations() {
  // Começa confetes e balões
  const confettiInterval = setInterval(createConfetti, 100);
  const balloonInterval = setInterval(createBalloon, 300);

  // Para os efeitos após 8 segundos
  setTimeout(() => {
    clearInterval(confettiInterval);
    clearInterval(balloonInterval);
    animationArea.innerHTML = '';
  }, 8000);
}

function typeWriter(element, text, speed = 40) {
  return new Promise(resolve => {
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
