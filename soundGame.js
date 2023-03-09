const soundOff = document.querySelector("#soundOff");
let isSoundOn = true;

soundwin = new Audio();
soundwin.src = "sound/win.wav";
soundSpace = new Audio();
soundSpace.src = "sound/spaceBattle.mp3";
soundRocket = new Audio();
soundRocket.src = "sound/tir.mp3";

soundOff.addEventListener("click", () => {
  isSoundOn = false;
  soundwin.pause();
  soundSpace.pause();
  soundRocket.currentTime = 0;
  soundRocket.pause();
});
