const startBtn = document.getElementById('startBtn');
const animationArea = document.getElementById('animationArea');
const finalMessage = document.getElementById('finalMessage');

// Função para criar confetes
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

// Função para criar balão
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = (Math.random() * 80 + 10) + 'vw';
  balloon.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 70%)`;
  balloon.style.animationDuration = (5 + Math.random()*3) + 's';
  animationArea.appendChild(balloon);
  setTimeout(() => {
    balloon.remove();
  }, 8000);
}

// Animação principal em sequência
function runAnimations() {
  startBtn.style.display = 'none';
  finalMessage.textContent = '';
  animationArea.innerHTML = '';

  // 1. Confetes por 3 segundos
  let confettiInterval = setInterval(createConfetti, 100);
  setTimeout(() => {
    clearInterval(confettiInterval);
    animationArea.innerHTML = '';
    // 2. Texto piscando "Parabéns!"
    const congrats = document.createElement('div');
    congrats.textContent = 'Parabéns!';
    congrats.classList.add('blink');
    animationArea.appendChild(congrats);

    setTimeout(() => {
      animationArea.innerHTML = '';
      // 3. Balões subindo por 4 segundos
      let balloonInterval = setInterval(createBalloon, 300);
      setTimeout(() => {
        clearInterval(balloonInterval);
        animationArea.innerHTML = '';
        // 4. Mostrar mensagem final
        finalMessage.textContent = 'Feliz aniversário querida prof. Bianca Nora';
        finalMessage.style.animation = 'none';
        // Forçar restart da animação
        void finalMessage.offsetWidth;
        finalMessage.style.animation = null;
      }, 4000);
    }, 2500);
  }, 3000);
}

startBtn.addEventListener('click', runAnimations);
