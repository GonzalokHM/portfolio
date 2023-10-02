class Particle {
  constructor(parent, x, y, isProject, proyecto) {
    this.network = parent;
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.isProject = isProject || false;
    this.proyecto = proyecto || null;

    if (this.isProject && this.proyecto) {
      // Configuración específica para partículas de proyectos
      this.loadImage(proyecto.img);
      this.resize(projecto.radius * 2);
    } else {
      // Configuración para partículas normales de fondo
      this.particleColor = this.returnRandomArrayitem(this.network.options.particleColors);
      this.radius = this.getLimitedRandom(1.5, 2.5);
      this.opacity = 0;
      this.x = x || Math.random() * this.canvas.width;
      this.y = y || Math.random() * this.canvas.height;
      this.velocity = {
        x: (Math.random() - 0.5) * parent.options.velocity,
        y: (Math.random() - 0.5) * parent.options.velocity
      };
    }
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
    if (this.isProject && this.proyecto) {
      // Si es una partícula de proyecto, dibuja la imagen
      if (this.img) {
        this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
      }
    } else {
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = this.opacity;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
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

  loadImage(imgSrc) {
    // Cargar la imagen de proyecto
    this.img = new Image();
  this.img.src = this.proyecto.img;
  }

  resize(newSize) {
    // Redimensionar la partícula de proyecto
    this.radius = newSize / 2;
  }
}

class ParticleNetwork {
  constructor(parent) {
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

    this.createProjectParticles(proyectos);

    this.createProjectParticles = ()=> {
      const projectParticles = [];
      const numProjectParticles = proyectos.length;

      // Tamaño y radio de las partículas-proyecto
      const projectParticleRadius = 20;

      // Distribuye las partículas-proyecto aleatoriamente sin superponerse
      for (let i = 0; i < numProjectParticles; i++) {
        let isOverlapping = false;
        let projectParticle;
        do {
          isOverlapping = false;
          // Genera una posición aleatoria dentro del contenedor
          const x = getLimitedRandom(0, this.canvas.width - projectParticleRadius * 2, true);
          const y = getLimitedRandom(0, this.canvas.height - projectParticleRadius * 2, true);

          // Crea la partícula-proyecto en la posición generada
          projectParticle = new Particle(this, x, y, true, proyectos[i]);

          // Verifica si se superpone con otras partículas-proyecto
          for (const existingParticle of projectParticles) {
            const distance = Math.sqrt(
              Math.pow(x - existingParticle.x, 2) + Math.pow(y - existingParticle.y, 2)
            );
            if (distance < projectParticleRadius * 2) {
              isOverlapping = true;
              break;
            }
          }
        } while (isOverlapping);
        // Agrega la partícula-proyecto al arreglo
        projectParticles.push(projectParticle);
      }

      // Ahora 'projectParticles' contiene todas las partículas-proyecto distribuidas aleatoriamente
      return projectParticles;
    };

    this.createParticles(true, SetProyectos);
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
    this.bindUiActions();
  }

 createProjectParticles(proyectos) {
    // Crear partículas de proyecto con imágenes y tamaños adecuados
    for (const proyecto of proyectos) {
      if (proyecto.img) {
        proyecto.radius = 40;
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        this.particles.push(new Particle(this, x, y, true, proyecto));
      }
    }
  }

  update() {
    // Actualizar partículas y redibujar la animación
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    if (!this.mouseIsDown && !this.touchIsMoving) {
      this.createInteractionParticle();
    }
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  createInteractionParticle() {
    // Crear una partícula de interacción (en respuesta al movimiento del ratón/touch)
    const proyecto = {
      particleColor: '#FF0000', // Color personalizado
      radius: 2, // Radio personalizado
      opacity: 0.7 // Opacidad personalizada
    };
    this.particles.push(new Particle(this, null, null, true, proyecto));
  }

  removeInteractionParticle() {
    // Eliminar partícula de interacción (en respuesta al mouseup/touchend)
    this.particles = this.particles.filter((particle) => !particle.isProject);
  }

  bindUiActions() {
    // Manejo de eventos de interacción del usuario
  }

  unbindUiActions() {
    // Desvincular eventos de interacción del usuario
  }

  onMouseMove(event) {
    // Lógica de detección de movimiento del ratón
  }

  onTouchMove(event) {
    // Lógica de detección de movimiento táctil
  }

  onMouseDown(event) {
    // Lógica de mousedown
  }

  onTouchStart(event) {
    // Lógica de touchstart
  }

  onMouseUp(event) {
    // Lógica de mouseup
  }

  onMouseOut(event) {
    // Lógica de mouseout
  }

  onTouchEnd(event) {
    // Lógica de touchend
  }

  destroy() {
    // Liberar recursos y desvincular eventos al destruir la animación
    cancelAnimationFrame(this.animationFrame);
    this.unbindUiActions();
  }
}

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
