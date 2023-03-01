let scoreEl = document.querySelector("#scoreEl");
const linkPlio = document.querySelector("#linkPlio");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const btnPortfolio = document.querySelector("#btnPortfolio");
const soundOff = document.querySelector("#soundOff");
const requestAnimationFrame = window.requestAnimationFrame;
let KEY_SPACE = false; // 32
let KEY_UP = false; // 38
let KEY_DOWN = false; // 40
let canvas;
let ctx;
let backgroundImage = new Image();
let myReq;
let score = 0;

soundwin = new Audio();
soundwin.src = "sound/win.wav";
soundSpace = new Audio();
soundSpace.src = "sound/spaceBattle.mp3";
soundRocket = new Audio();
soundRocket.src = "sound/tir.mp3";

soundOff.addEventListener("click", () => {
  soundwin.pause();
  soundSpace.pause(); // ta melodia dziala, to ta ktora sie od razu uruchamia, dzwiek trafienia ufo i koncowy zwyciestwa nie dzialaja
  soundRocket.currentTime = 0;
  soundRocket.pause();
});

startGameBtn.addEventListener("click", () => {
  setInterval(update, 1000 / 25);
  setInterval(createUfos, 2000);
  setInterval(checkForCollion, 1000 / 25);
  setInterval(checkForShoot, 1000 / 5);
  soundSpace.play();
  modalEl.style.display = "none";
});

let rocket = {
  x: 20,
  y: 200,
  width: 140,
  height: 60,
  src: "img/rocketyellow.png",
};

let ufos = [];
let shots = [];

document.onkeydown = (e) => {
  if (e.keyCode === 32) {
    // spacja wcisnieta
    KEY_SPACE = true;
  }

  if (e.keyCode === 38) {
    // gora wcisnieta
    KEY_UP = true;
  }

  if (e.keyCode === 40) {
    // dol wcisniety
    KEY_DOWN = true;
  }
};

document.onkeyup = (e) => {
  if (e.keyCode === 32) {
    // spacja odcisnieta
    KEY_SPACE = false;
  }

  if (e.keyCode === 38) {
    // do gory odcisniete
    KEY_UP = false;
  }

  if (e.keyCode === 40) {
    // w dol odcisniete
    KEY_DOWN = false;
  }
};

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
      // if(!soundOff){
      soundRocket.play();
      // }
      ufos = ufos.filter((u) => u != ufo);
      newChance();
      restartGame();
    } else if (score >= 1000) {
      linkPlio.classList.remove("hide");
      btnPortfolio.classList.remove("hideBtn");
      soundSpace.pause();
      // if(!soundOff){
      soundwin.play();
      // }
      cancelAnimationFrame(myReq); // po przerwaniu animacjo stronka sie po kilku sek przeladowuje sama
      //update22();zwieksza sie predkosc, jesli nie dodam wczesniej zmiany obrazu background.
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
        soundRocket.play();
        console.log("Collion!!!");
        setTimeout(() => {
          ufos = ufos.filter((u) => u != ufo);
        }, 2000);
        score += 100;
        scoreEl.innerHTML = "Score:" + " " + score;
      }
    });
  });
}

function createUfos() {
  let ufo = {
    x: 1000,
    y: Math.random() * 500, //ustawienie ufo w przypadkowym miejscu
    width: 80,
    height: 40,
    src: "img/ufo.png",
    img: new Image(),
  };
  ufo.img.src = ufo.src;
  ufos.push(ufo);
}

function checkForShoot() {
  if (KEY_SPACE) {
    let shot = {
      x: rocket.x + 110,
      y: rocket.y + 22,
      width: 25,
      height: 10,
      src: "img/meteorite.png",
      img: new Image(),
    };
    shot.img.src = shot.src;

    shots.push(shot);
  }
}

function update() {
  if (KEY_UP) {
    rocket.y -= 5;
  }

  if (KEY_DOWN) {
    rocket.y += 5;
  }
  ufos.forEach(function (ufo) {
    if (!ufo.hit) {
      ufo.x -= 5;
    }
  });
  shots.forEach(function (shot) {
    shot.x += 10;
  });
}

function update22() {
  if (KEY_UP) {
    rocket.y -= 5;
  }

  if (KEY_DOWN) {
    rocket.y += 5;
  }

  ufos.forEach(function (ufo) {
    if (!ufo.hit) {
      ufo.x -= 6;
    }
  });

  shots.forEach(function (shot) {
    shot.x += 10;
  });
}

function loadImages() {
  backgroundImage.src = "img/sky-background1.png";
  rocket.img = new Image();
  rocket.img.src = rocket.src;

  canvas.onclick = function () {
    // przyspiesza tylko na kazde klikniecie
    update22();
  };
}

function draw() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);
  ufos.forEach(function (ufo) {
    ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
  });

  shots.forEach(function (shot) {
    ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
  });

  myReq = requestAnimationFrame(draw);
}
myReq = requestAnimationFrame(draw);

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
