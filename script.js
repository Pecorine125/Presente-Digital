const startBtn = document.getElementById('startBtn');
const animationArea = document.getElementById('animationArea');
const finalMessage = document.getElementById('finalMessage');

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
  "Do Seu Aluno: Harahel Guilherme 🦊🐱🎂!"
  "E da sua Turma Preferida 3°C"
];

// Esconde o botão imediatamente (não será usado manualmente)
startBtn.style.display = 'none';

// Cria e configura a div do contador
const countdownDiv = document.createElement('div');
countdownDiv.id = 'countdown';
document.body.appendChild(countdownDiv);

// Função que retorna a data da próxima segunda às 8:30
function getNextMonday830() {
  const now = new Date();
  const result = new Date(now);
  const day = now.getDay();

  // Calcula quantos dias faltam para a próxima segunda (1)
  let daysUntilMonday = (1 - day + 7) % 7;
  if (daysUntilMonday === 0) {
    // Se hoje for segunda e já passou das 8:30, vai para próxima segunda
    if (now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() >= 30)) {
      daysUntilMonday = 7;
    }
  }
  result.setDate(now.getDate() + daysUntilMonday);
  result.setHours(8, 30, 0, 0); // 08:30:00
  return result;
}

const targetDate = getNextMonday830();

// Atualiza o contador regressivo
function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownDiv.style.display = 'none';
    runFinalSequence();
    return;
  }

  // Antes do presente abrir, mostra animação do personagem andando e depois troca pro presente animado
  updateCharacterState(diff);

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  countdownDiv.textContent = `Presente será aberto em ${d}d ${h}h ${m}m ${s}s`;
}

let characterState = 'walking'; // estados: walking, gift, open

// Atualiza animação do personagem conforme tempo restante
function updateCharacterState(diff) {
  const totalMsToPresent = targetDate - new Date();
  const timeToPresentInMin = diff / 60000;

  if (diff > 5 * 60 * 1000) {
    // Mais que 5 minutos - personagem andando
    if (characterState !== 'walking') {
      characterState = 'walking';
      animationArea.innerHTML = '';
      animationArea.appendChild(createWalkingCharacter());
    }
  } else if (diff > 0) {
    // Entre 5 minutos e 0 - presente animado tentando abrir
    if (characterState !== 'gift') {
      characterState = 'gift';
      animationArea.innerHTML = '';
      animationArea.appendChild(createGiftAnimation());
    }
  }
}

// Cria personagem andando (exemplo com simples quadrado animado andando esquerda-direita)
function createWalkingCharacter() {
  const character = document.createElement('div');
  character.style.width = '50px';
  character.style.height = '80px';
  character.style.backgroundColor = '#e91e63';
  character.style.borderRadius = '10px';
  character.style.position = 'relative';
  character.style.animation = 'walkSideToSide 4s linear infinite';
  return character;
}

// Cria presente animado (pode ser gif ou animação simples)
function createGiftAnimation() {
  const gift = document.createElement('div');
  gift.style.width = '70px';
  gift.style.height = '70px';
  gift.style.backgroundColor = '#ad1457';
  gift.style.borderRadius = '10px';
  gift.style.position = 'relative';
  gift.style.animation = 'giftShake 1s ease-in-out infinite';
  return gift;
}

// Define animações em CSS pelo JS
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
@keyframes walkSideToSide {
  0%, 100% { left: 0; }
  50% { left: 150px; }
}
@keyframes giftShake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}
`;
document.head.appendChild(styleSheet);

// Mostrar mensagem com digitação
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

// Mostrar as mensagens da carta sequencialmente
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

// Função principal da sequência final (confetes, balões, mensagem)
function runFinalSequence() {
  animationArea.innerHTML = '';
  finalMessage.style.opacity = 0;
  finalMessage.innerHTML = '';

  // Confetes
  const confettiInterval = setInterval(createConfetti, 100);

  setTimeout(() => {
    clearInterval(confettiInterval);
    animationArea.innerHTML = '';

    // "Parabéns!" piscando
    const congrats = document.createElement('div');
    congrats.textContent = 'Parabéns!';
    congrats.classList.add('blink');
    animationArea.appendChild(congrats);

    setTimeout(() => {
      animationArea.innerHTML = '';

      // Balões
      const balloonInterval = setInterval(createBalloon, 300);

      setTimeout(() => {
        clearInterval(balloonInterval);
        animationArea.innerHTML = '';
        showMessageParts();
      }, 4000);
    }, 2500);
  }, 3000);
}

// Confete simples
function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  confetti.style.animationDuration = (3 + Math.random() * 2) + 's';
  animationArea.appendChild(confetti);
  setTimeout(() => confetti.remove(), 5000);
}

// Balão simples
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = (Math.random() * 80 + 10) + 'vw';
  balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
  balloon.style.animationDuration = (5 + Math.random() * 3) + 's';
  animationArea.appendChild(balloon);
  setTimeout(() => balloon.remove(), 8000);
}

// Inicia a atualização do contador a cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);
