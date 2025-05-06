const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 140, y: 430, width: 40, height: 20 };
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

// Spawn enemies
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
        enemies.push({ x: 60 * i + 20, y: 40 * j + 20, width: 30, height: 20 });
    }
}

function drawPlayer() {
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 10));
}

function drawEnemies() {
    ctx.fillStyle = "white";
    enemies.forEach(e => ctx.fillRect(e.x, e.y, e.width, e.height));
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();

    bullets.forEach((b, i) => {
        b.y -= 5;
        if (b.y < 0) bullets.splice(i, 1);
    });

    enemies.forEach((e, ei) => {
        e.y += 0.2;
        if (e.y > canvas.height) gameOver = true;

        bullets.forEach((b, bi) => {
            if (b.x < e.x + e.width && b.x + 4 > e.x && b.y < e.y + e.height && b.y + 10 > e.y) {
                enemies.splice(ei, 1);
                bullets.splice(bi, 1);
                score += 10;
            }
        });
    });

    if (enemies.length === 0) gameOver = true;

    if (!gameOver) requestAnimationFrame(update);
    else {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 90, 240);
        ctx.fillText("Score: " + score, 100, 280);
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.x -= 10;
    if (e.key === "ArrowRight") player.x += 10;
    if (e.key === " " || e.key === "Spacebar") {
        bullets.push({ x: player.x + player.width / 2 - 2, y: player.y });
    }
});

update();