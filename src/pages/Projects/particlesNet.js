class Particle {
  constructor(parent, x, y, isProject, proyecto) {
    this.network = parent;
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.particleColor = isProject
      ? proyecto.particleColor
      : this.returnRandomArrayitem(this.network.options.particleColors);
    this.radius = isProject ? proyecto.radius : this.getLimitedRandom(1.5, 2.5);
    this.opacity = isProject ? proyecto.opacity : 0;
    this.x = x || Math.random() * this.canvas.width;
    this.y = y || Math.random() * this.canvas.height;
    this.velocity = {
      x: (Math.random() - 0.5) * parent.options.velocity,
      y: (Math.random() - 0.5) * parent.options.velocity
    };
    this.isProject = isProject || false;
    this.proyecto = proyecto || null;
  }

  update() {
    if (this.isProject && this.proyecto) {
      // Actualizar la posición de la partícula en relación con el proyecto
      this.x = this.proyecto.x;
      this.y = this.proyecto.y;
    }
    if (this.opacity < 1) {
      this.opacity += 0.01;
    } else {
      this.opacity = 1;
    }
    if (this.x > this.canvas.width + 100 || this.x < -100) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y > this.canvas.height + 100 || this.y < -100) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = this.opacity;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  returnRandomArrayitem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getLimitedRandom(min, max, roundToInteger) {
    let number = Math.random() * (max - min) + min;
    if (roundToInteger) {
      number = Math.round(number);
    }
    return number;
  }
}

class ParticleNetwork {
  constructor(parent, proyectos) {
    this.options = {
      velocity: 1,
      density: 15000,
      netLineDistance: 200,
      netLineColor: '#929292',
      particleColors: ['#aaa']
    };
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.particles = [];
    this.mouseIsDown = false;
    this.touchIsMoving = false;
    this.spawnQuantity = 3;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('touchmove', this.onTouchMove);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('touchstart', this.onTouchStart);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mouseout', this.onMouseOut);
    this.canvas.addEventListener('touchend', this.onTouchEnd);

    this.createParticles(true, proyectos);
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
    this.bindUiActions();
  }

  createParticles(isInitial, proyectos) {
    // Inicializar o resetear partículas
    const quantity = (this.canvas.width * this.canvas.height) / this.options.density;
    if (isInitial) {
      // Crear partículas iniciales de proyectos
      for (let i = 0; i < proyectos.length; i++) {
        const proyecto = proyectos[i];
        const x = (i % 5) * 150 + 100;
        const y = Math.floor(i / 5) * 150 + 100;
        this.particles.push(new Particle(this, x, y, true, proyecto));
      }
    } else {
      // Crear partículas normales
      for (let i = 0; i < quantity; i++) {
        this.particles.push(new Particle(this));
      }
    }
  }

  update() {
    if (this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalAlpha = 1;

      // Dibujar conexiones
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = this.particles.length - 1; j > i; j--) {
          const p1 = this.particles[i];
          const p2 = this.particles[j];
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

          if (distance <= this.options.netLineDistance) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.options.netLineColor;
            this.ctx.globalAlpha =
              ((this.options.netLineDistance - distance) / this.options.netLineDistance) *
              p1.opacity *
              p2.opacity;
            this.ctx.lineWidth = 0.7;
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }

      // Actualizar y dibujar partículas
      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];

        // Actualizar posición de partículas de proyectos
        // if (particle.isProject) {
        //     const proyecto = particle.proyecto;
        //     const x = (i % 5) * 150 + 100;
        //     const y = Math.floor(i / 5) * 150 + 100;
        //     particle.updatePosition(x, y);
        // }

        particle.update();
        particle.draw();
      }

      if (this.options.velocity !== 0) {
        this.animationFrame = requestAnimationFrame(this.update.bind(this));
      }
    } else {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  createInteractionParticle() {
    this.interactionParticle = new Particle(this);
    this.interactionParticle.velocity = {
      x: 0,
      y: 0
    };
    this.particles.push(this.interactionParticle);
    return this.interactionParticle;
  }

  removeInteractionParticle() {
    // Encontrar la partícula de interacción
    const index = this.particles.indexOf(this.interactionParticle);
    if (index > -1) {
      // Removerla
      this.interactionParticle = undefined;
      this.particles.splice(index, 1);
    }
  }

  bindUiActions() {
    this.spawnQuantity = 3;
    this.mouseIsDown = false;
    this.touchIsMoving = false;

    this.onMouseMove = function (e) {
      if (!this.interactionParticle) {
        this.createInteractionParticle();
      }
      this.interactionParticle.x = e.offsetX;
      this.interactionParticle.y = e.offsetY;
    }.bind(this);

    this.onTouchMove = function (e) {
      e.preventDefault();
      this.touchIsMoving = true;
      if (!this.interactionParticle) {
        this.createInteractionParticle();
      }
      this.interactionParticle.x = e.changedTouches[0].clientX;
      this.interactionParticle.y = e.changedTouches[0].clientY;
    }.bind(this);

    this.onMouseDown = function (e) {
      this.mouseIsDown = true;
      var counter = 0;
      var quantity = this.spawnQuantity;
      var intervalId = setInterval(
        function () {
          if (this.mouseIsDown) {
            if (counter === 1) {
              quantity = 1;
            }
            for (var i = 0; i < quantity; i++) {
              if (this.interactionParticle) {
                this.particles.push(
                  new Particle(this, this.interactionParticle.x, this.interactionParticle.y)
                );
              }
            }
          } else {
            clearInterval(intervalId);
          }
          counter++;
        }.bind(this),
        50
      );
    }.bind(this);

    this.onTouchStart = function (e) {
      e.preventDefault();
      setTimeout(
        function () {
          if (!this.touchIsMoving) {
            for (var i = 0; i < this.spawnQuantity; i++) {
              this.particles.push(
                new Particle(this, e.changedTouches[0].clientX, e.changedTouches[0].clientY)
              );
            }
          }
        }.bind(this),
        200
      );
    }.bind(this);

    this.onMouseUp = function (e) {
      this.mouseIsDown = false;
    }.bind(this);

    this.onMouseOut = function (e) {
      this.removeInteractionParticle();
    }.bind(this);

    this.onTouchEnd = function (e) {
      e.preventDefault();
      this.touchIsMoving = false;
      this.removeInteractionParticle();
    }.bind(this);

    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('touchmove', this.onTouchMove);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('touchstart', this.onTouchStart);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mouseout', this.onMouseOut);
    this.canvas.addEventListener('touchend', this.onTouchEnd);
  }

  unbindUiActions() {
    if (this.canvas) {
      this.canvas.removeEventListener('mousemove', this.onMouseMove);
      this.canvas.removeEventListener('touchmove', this.onTouchMove);
      this.canvas.removeEventListener('mousedown', this.onMouseDown);
      this.canvas.removeEventListener('touchstart', this.onTouchStart);
      this.canvas.removeEventListener('mouseup', this.onMouseUp);
      this.canvas.removeEventListener('mouseout', this.onMouseOut);
      this.canvas.removeEventListener('touchend', this.onTouchEnd);
    }
  }
}

(() => {
  class ParticleNetworkAnimation {
    init(element, proyectos) {
      this.$el = $(element);
      this.projects = Array.from(this.$el.querySelectorAll('.project'));
      this.container = element;
      this.canvas = document.createElement('canvas');
      this.sizeCanvas();
      this.container.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.particleNetwork = new ParticleNetwork(this, proyectos);

      this.bindUiActions();

      return this;
    }

    // Resto de los métodos y eventos...
  }

  const pna = new ParticleNetworkAnimation();
  pna.init(document.querySelector('.particle-network-animation'), proyectos);
})();

export default ParticleNetworkAnimation
