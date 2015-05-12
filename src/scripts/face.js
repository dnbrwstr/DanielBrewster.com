var { World, Constraint, Particle } = require('@dnbrwstr/baby-verlet'),
  request = require('superagent'),
  two = require('./two');

class Face {

  constructor(options) {
    this.world = new World({
      width: window.innerWidth,
      height: window.innerHeight,
      gravity: [0,0],
      airFriction: 0.01
    });

    this.loadSVG(() => {
      if (options.onLoad) {
        options.onLoad();
      }
    });
  }

  set position(position) {
    this.view.translation.x = position.x;
    this.view.translation.y = position.y;
  }

  get position() {
    return {
      x: this.view.translation.x,
      y: this.view.translation.y
    };
  }

  set size(size) {
    var baseSize = this.view.getBoundingClientRect().width / this.view.scale;
    this.view.scale = size / baseSize;
  }

  get size() {
    return this.view.getBoundingClientRect().width;
  }

  set mousePosition(position) {
    if (this.mouseConstraints) this.world.remove(this.mouseConstraints);
    if (this.mouseParticle) this.world.remove(this.mouseParticle);

    this.mouseParticle = new Particle({
      fixed: true,
      position: [
        (position.x - this.view.translation.x) / this.view.scale, 
        (position.y + window.scrollY - this.view.translation.y) / this.view.scale
      ]
    });

    this.world.add(this.mouseParticle);

    this.mouseConstraints = this.facePoints.map((fp) => {
      var p = fp.particle;
      var d = p.distanceFrom(this.mouseParticle) - 10;

      if (d < 100) {
        return new Constraint({
          particles: [this.mouseParticle, p],
          length: p.distanceFrom(this.mouseParticle) - 10,
          stiffness: 0.01
        });
      }
    });

    this.world.add(this.mouseConstraints);
  }  

  loadSVG(cb) {
    request.get('face.svg')
      .end((err, res) => {
        this.processSVG(res.text);
        this.setupConstraints();
        cb();
      });
  }

  processSVG(svgString) {
    var node = document.createElement('div');
    node.innerHTML = svgString;
    var svg = two.interpret(node.children[0]);
    svg.stroke = 'black';
    svg.fill = 'transparent';
    svg.linewidth = 10;

    for (var childKey in svg.children) {
      var child = svg.children[childKey];

      if (child.vertices.length > 3) {
        var v = child.vertices.pop();
        child.vertices[0].controls.left = v.controls.left;
      }
    }

    this.view = svg;
  }

  setupConstraints() {
    this.anchorConstraints = [];
    this.facePoints = [];

    this.forEachVertice((v) => {
      var particle = new Particle({
        position: [v.x, v.y]
      });

      var anchor = new Particle({
        position: [v.x, v.y],
        fixed: true
      });

      var constraint = new Constraint({
        particles: [particle, anchor],
        length: 0,
        stiffness: 0.01
      });

      this.world.add([particle, anchor, constraint]);

      this.anchorConstraints.push(constraint);
      this.facePoints.push({
        vertice: v,
        particle: particle
      });
    });
  }

  makeFace() {
    this.anchorConstraints.forEach(function (c) {
      c.length = Math.random() * 30;
      c.stiffness = Math.random() * .01 + .008;
    });
  }

  reset() {
    this.anchorConstraints.forEach(function (c) {
      c.length = 0;
      c.stiffness = 0.01;
    });
  }

  update() {
    this.world.update();

    this.facePoints.forEach(function (p) {
      p.vertice.x = p.particle.position.x;
      p.vertice.y = p.particle.position.y;
    });
  }

  forEachVertice(fn) {
    for (var childKey in this.view.children) {
      var child = this.view.children[childKey];
      child.vertices.forEach(fn);
    }
  }
}


module.exports = Face;
