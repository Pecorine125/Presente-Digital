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
  "Feliz aniversário, Bianca Nora! 🎉❤️"
];

// Função máquina de escrever para texto dentro de um elemento
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

// Mostrar a mensagem parte por parte sem apagar as anteriores
async function showMessageParts() {
  finalMessage.style.opacity = 1;
  finalMessage.style.animation = 'none';
  await new Promise(r => setTimeout(r, 10)); // Forçar reflow

  finalMessage.innerHTML = ''; // limpa antes de começar

  for (const part of messageParts) {
    const line = document.createElement('div');
    finalMessage.appendChild(line); // adiciona uma nova linha
    await typeWriter(line, part);
    await new Promise(r => setTimeout(r, 700)); // pausa entre frases
  }

  // Animação final suave (escala e opacidade)
  finalMessage.style.animation = 'fadeInScale 2s forwards';
}

// Animação principal em sequência
function runAnimations() {
  startBtn.style.display = 'none';
  finalMessage.textContent = '';
  finalMessage.style.opacity = 0;
  animationArea.innerHTML = '';

  // 1. Confetes por 3 segundos
  const confettiInterval = setInterval(createConfetti, 100);
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
      const balloonInterval = setInterval(createBalloon, 300);
      setTimeout(() => {
        clearInterval(balloonInterval);
        animationArea.innerHTML = '';

        // 4. Mostrar mensagem final animada
        showMessageParts();

      }, 4000);
    }, 2500);
  }, 3000);
}

// Funções de confetes e balões (iguais ao anterior)
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

startBtn.addEventListener('click', runAnimations);
