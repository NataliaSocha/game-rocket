let KEY_SPACE = false;
let KEY_UP = false;
let KEY_DOWN = false;

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
