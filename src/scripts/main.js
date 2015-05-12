var Face = require('./face'),
  two = require('./two');

var layoutFace = function () {
  var maxHeight = window.innerHeight - 100;
  var maxWidth = window.innerWidth - 100;

  two.width = window.innerWidth;
  two.height = window.innerHeight;

  var size = Math.floor(Math.max(maxHeight, maxWidth) / 3);
  if (size > maxWidth || size > maxHeight) {
    size = Math.min(maxWidth, maxHeight);
  }

  face.position = {
    x: (window.innerWidth - size) / 2,
    y: (window.innerHeight - size) / 2
  }

  face.size = size;
};

var onMouseMove = function (e) {
  face.mousePosition = {
    x: e.clientX,
    y: e.clientY
  };
};

var makingFace = false;

var onClick = function () {
  if (makingFace) {
    face.reset();
  } else {
    face.makeFace();
  }

  makingFace = !makingFace;
}

var animate = function () {
  two.update();
  face.update();
  requestAnimationFrame(animate);
};

var face = new Face({
  onLoad: () => {
    layoutFace();
    requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', layoutFace);
  }
});