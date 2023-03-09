const scoreEl = document.querySelector("#scoreEl");
const linkPlio = document.querySelector("#linkPlio");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const btnPortfolio = document.querySelector("#btnPortfolio");

let canvas;
let ctx;
let score = 0;

startGameBtn.addEventListener("click", () => {
  setInterval(update, 1000 / 25);
  setInterval(createUfos, 2000);
  setInterval(checkForCollion, 1000 / 25);
  setInterval(checkForShoot, 1000 / 5);
  soundSpace.play();
  modalEl.style.display = "none";
});

function startGame() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 574;
  loadImages();
  draw();
}

function checkForCollion() {
  ufos.forEach(function (ufo) {
    // zdezenie ufo z rakieta
    if (
      rocket.x + rocket.width > ufo.x &&
      rocket.y + rocket.height + 2 > ufo.y &&
      rocket.x < ufo.x &&
      rocket.y < ufo.y + ufo.height
    ) {
      rocket.img.src = "img/boom.png";
      soundSpace.pause();
      if (isSoundOn) {
        soundRocket.play();
      }
      ufos = ufos.filter((u) => u != ufo);
      newChance();
      restartGame();
    } else if (score >= 1000) {
      linkPlio.classList.remove("hide");
      btnPortfolio.classList.remove("hideBtn");
      soundSpace.pause();
      if (isSoundOn) {
        soundwin.play();
      }
      cancelAnimationFrame(myReq);
    }

    shots.forEach(function (shot) {
      // zdezenie pocisku z ufo
      if (
        shot.x + shot.width > ufo.x &&
        shot.y + shot.height > ufo.y &&
        shot.x < ufo.x &&
        shot.y < ufo.y + ufo.height
      ) {
        ufo.hit = true;
        ufo.img.src = "img/boom.png";
        if (isSoundOn) {
          soundRocket.play();
        }
        setTimeout(() => {
          ufos = ufos.filter((u) => u != ufo);
        }, 2000);
        score += 100;
        scoreEl.innerHTML = "Score:" + " " + score;
      }
    });
  });
}

function restartGame() {
  setTimeout(function () {
    window.location.reload();
  }, 5000);
}

function newChance() {
  setTimeout(function () {
    backgroundImage.src = "img/sky-background-try-again1.png";
  }, 2000);
}
