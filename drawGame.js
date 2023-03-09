let backgroundImage = new Image();
let myReq;
const requestAnimationFrame = window.requestAnimationFrame;

const rocket = {
  x: 20,
  y: 200,
  width: 140,
  height: 60,
  src: "img/rocketyellow.png",
};

let ufos = [];
let shots = [];

function createUfos() {
  let ufo = {
    x: 1000,
    y: Math.random() * 500,
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

function loadImages() {
  backgroundImage.src = "img/sky-background1.png";
  rocket.img = new Image();
  rocket.img.src = rocket.src;
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
