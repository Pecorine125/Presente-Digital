const startBtn = document.getElementById('startBtn');
const animationArea = document.getElementById('animationArea');
const finalMessage = document.getElementById('finalMessage');
const countdown = document.getElementById('countdown');

let confettiInterval;

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 70%)`;
  confetti.style.animationDuration = (3 + Math.random()*2) + 's';
  animationArea.appendChild(confetti);
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

function explosionConfetti(amount = 70) {
  for(let i = 0; i < amount; i++) {
    createConfetti();
  }
}

function showMessage() {
  countdown.textContent = '';
  finalMessage.innerHTML = `
    <p>Querida Prof. Bianca Nora,</p>
    <p>Desejo muita felicidade e abraços sinceros para você. Que sua vida seja repleta de surpresas boas, e que você consiga alcançar todos os seus sonhos e metas com facilidade.</p>
    <p>Se alguma dificuldade aparecer pelo caminho, saiba que pode sempre contar comigo, pois estarei ao seu lado para apoiar e ajudar no que precisar.</p>
    <p>Tenho muito orgulho de você!</p>
    <p>Feliz aniversário, Bianca Nora! 🎉❤️</p>
  `;
  finalMessage.style.animation = 'none';
  void finalMessage.offsetWidth; // reinicia animação CSS
  finalMessage.style.animation = null;
}

function runAnimations() {
  startBtn.style.display = 'none';
  finalMessage.textContent = '';
  animationArea.innerHTML = '';

  let secondsLeft = 10;
  countdown.textContent = secondsLeft;

  confettiInterval = setInterval(() => {
    createConfetti();
    secondsLeft--;
    countdown.textContent = secondsLeft;

    if(secondsLeft < 0) {
      clearInterval(confettiInterval);
      countdown.textContent = '';
      explosionConfetti();
      showMessage();
    }
  }, 1000);
}

startBtn.addEventListener('click', runAnimations);
