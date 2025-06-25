const startBtn = document.getElementById('startBtn');
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

// ⏳ Cronômetro regressivo até segunda às 08:20
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

// Próxima segunda às 08:20
function getNextMonday820() {
  const now = new Date();
  const result = new Date();
  result.setHours(8, 20, 0, 0);
  result.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7)); // próxima segunda
  if (now > result) result.setDate(result.getDate() + 7);
  return result;
}

const targetDate = getNextMonday820();

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownDiv.style.display = 'none';
    runAnimations(); // Começa automaticamente
    return;
  }

  const m = Math.floor(diff / (100000 * 60));
  const s = Math.floor((diff / 100000) % 60);

  countdownDiv.textContent = `Presente será aberto em ${m}m ${s}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Esconde o botão manual, não será usado
startBtn.style.display = 'none';

// 🎉 Animações

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
  animationArea.appendChild(confetti);
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = (Math.random() * 80 + 10) + 'vw';
  balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  balloon.style.animationDuration = (5 + Math.random() * 3) + 's';
  animationArea.appendChild(balloon);
  setTimeout(() => {
    balloon.remove();
  }, 8000);
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

function runAnimations() {
  finalMessage.innerHTML = '';
  finalMessage.style.opacity = 0;
  animationArea.innerHTML = '';

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
