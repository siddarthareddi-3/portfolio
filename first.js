// Disable cursor on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.querySelector(".cursor").style.display = "none";
}

// Cursor trail effect
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;

  const star = document.createElement("div");
  star.className = "trail";
  star.style.top = `${e.clientY}px`;
  star.style.left = `${e.clientX}px`;
  document.body.appendChild(star);

  setTimeout(() => star.remove(), 400);
});

// Background starfield
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
for (let i = 0; i < 160; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(136,221,255,0.9)";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#00ffee";
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });
  requestAnimationFrame(animateStars);
}
animateStars();
