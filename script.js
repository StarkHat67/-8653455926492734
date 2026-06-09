function scrollToLetter() {
  document.getElementById("letter").scrollIntoView({
    behavior: "smooth"
  });
}

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "♡ Pausar música";
    } else {
      music.pause();
      musicBtn.textContent = "♡ Tocar música";
    }
  } catch {
    alert("Coloque um arquivo chamado musica.mp3 na pasta do site.");
  }
});

const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createHeart() {
  hearts.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 30,
    size: Math.random() * 18 + 10,
    speed: Math.random() * 1.4 + 0.7,
    opacity: Math.random() * 0.5 + 0.35,
    drift: Math.random() * 2 - 1
  });
}

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 30, size / 30);
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.bezierCurveTo(-30, -15, -25, -40, 0, -22);
  ctx.bezierCurveTo(25, -40, 30, -15, 0, 10);
  ctx.fillStyle = `rgba(255, 220, 235, ${opacity})`;
  ctx.shadowColor = "#ff9ac7";
  ctx.shadowBlur = 15;
  ctx.fill();
  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart, index) => {
    heart.y -= heart.speed;
    heart.x += heart.drift;
    drawHeart(heart.x, heart.y, heart.size, heart.opacity);

    if (heart.y < -50) {
      hearts.splice(index, 1);
    }
  });

  requestAnimationFrame(animateHearts);
}

setInterval(createHeart, 180);
animateHearts();

document.addEventListener("click", (event) => {
  for (let i = 0; i < 8; i++) {
    hearts.push({
      x: event.clientX,
      y: event.clientY,
      size: Math.random() * 16 + 8,
      speed: Math.random() * 2 + 1,
      opacity: 0.8,
      drift: Math.random() * 4 - 2
    });
  }
});
