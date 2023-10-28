import proyectos from './projectList';

const getLimitedRandom = (min, max, roundToInteger) => {
  let number = Math.random() * (max - min) + min;
  if (roundToInteger) {
    number = Math.round(number);
  }
  return number;
};

const returnRandomArrayitem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

class Particle {
  constructor(parent, x, y, isProject, proyecto) {
    console.log('===> class Particle');
    this.network = parent;
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.isProject = isProject || false;
    this.proyecto = proyecto || null;
    this.isControlled = false;
    this.controlledSpeed = 5;

    if (this.isProject && this.proyecto) {
      // Configuración específica para partículas de proyectos
      this.loadImage(proyecto.img);
      this.resize(proyecto.radius * 2);
      this.particleColor = returnRandomArrayitem(this.network.options.particleColors);
    } else {
      // Configuración para partículas normales de fondo
      this.particleColor = returnRandomArrayitem(this.network.options.particleColors);
      this.radius = getLimitedRandom(1.5, 2.5);
      this.opacity = 0.5;
      this.x = x || Math.random() * this.canvas.width;
      this.y = y || Math.random() * this.canvas.height;
      this.velocity = {
        x: (Math.random() - 0.5) * parent.options.velocity,
        y: (Math.random() - 0.5) * parent.options.velocity
      };
    }
  }

  moveUp() {
    if (this.isControlled) {
      this.y -= this.controlledSpeed; // Mueve hacia arriba
    }
  }

  moveDown() {
    if (this.isControlled) {
      this.y += this.controlledSpeed; // Mueve hacia abajo
    }
  }

  moveLeft() {
    if (this.isControlled) {
      this.x -= this.controlledSpeed; // Mueve hacia la izquierda
    }
  }

  moveRight() {
    if (this.isControlled) {
      this.x += this.controlledSpeed; // Mueve hacia la derecha
    }
  }

  stopMoving() {
    this.x = 0;
    this.y = 0;
  }

  // Método para asignar una partícula como controlada
  setControlled() {
    this.isControlled = true;
  }

  // Método para eliminar el estado de control de la partícula
  removeControlled() {
    this.isControlled = false;
  }

  update() {
    if (this.opacity < 1) {
      this.opacity += 0.01;
    } else {
      this.opacity = 1;
    }
    if (!this.isProject) {
      if (this.x > this.canvas.width + 100 || this.x < -100) {
        this.velocity.x = -this.velocity.x;
      }
      if (this.y > this.canvas.height + 100 || this.y < -100) {
        this.velocity.y = -this.velocity.y;
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }

  draw() {
    this.ctx.beginPath();
    if (this.isControlled) {
      // Dibuja la partícula controlada de manera especial
      this.ctx.fillStyle = 'red';
    } else if (this.isProject && this.proyecto) {
      // Si es una partícula de proyecto, dibuja la imagen
      if (this.img) {
        // Calcular las coordenadas de dibujo para ajustar la imagen al tamaño de la partícula
        const imgX = this.x - this.radius;
        const imgY = this.y - this.radius;
        const imgWidth = this.radius * 2;
        const imgHeight = this.radius * 2;

        // Dibuja la imagen dentro de la partícula
        this.ctx.drawImage(this.img, imgX, imgY, imgWidth, imgHeight);
      return;
      }
    } else {
      this.ctx.fillStyle = this.particleColor;
    }
      this.ctx.globalAlpha = this.opacity;
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fill();
  }

  loadImage() {
    // Cargar la imagen de proyecto
    this.img = new Image();
    this.img.onload = () => {
      console.log('La imagen se ha cargado con éxito');
    };
    this.img.onerror = (error) => {
      // Manejar errores al cargar la imagen
      console.error('Error al cargar la imagen:', error);
      //mostrar una imagen de reemplazo o registrar el error
    };
    this.img.src = this.proyecto.img;
  }

  resize(newSize) {
    // Redimensionar la partícula de proyecto
    this.radius = newSize / 2;
  }
}

class ParticleNetwork {
  constructor(parent) {
    console.log('===> class ParticleNetwork');
    this.options = {
      velocity: 1,
      density: 15000,
      netLineDistance: 200,
      netLineColor: '#929292',
      particleColors: ['#aaa', '#bbb', '#ccc']
    };
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.particles = [];
    this.mouseIsDown = false;
    this.touchIsMoving = false;
    this.arrowControlledParticle = null; // Inicialmente, no hay partícula controlada
    this.spawnQuantity = 3;

    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('touchmove', this.onTouchMove);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('touchstart', this.onTouchStart);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mouseout', this.onMouseOut);
    this.canvas.addEventListener('touchend', this.onTouchEnd);

    this.proyectos = proyectos;

    this.createProjectParticles(proyectos);

    this.createParticles();
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
    this.bindUiActions();
  }

  createProjectParticles() {
    const projectParticles = [];
    const numProjectParticles = this.proyectos.length;

    // Tamaño y radio de las partículas-proyecto
    const projectParticleRadius = 20;
    const containerWidth = this.canvas.width;
    const containerHeight = this.canvas.height;
    const horizontalSpacing = containerWidth / (numProjectParticles + 1);
    const verticalCenter = containerHeight / 2;

    // Distribuir las partículas-proyecto a lo largo del ancho del contenedor
    for (let i = 0; i < numProjectParticles; i++) {
      const x = (i + 1) * horizontalSpacing;
      const y = verticalCenter;
      const projectParticle = new Particle(this, x, y, true, this.proyectos[i]);
      projectParticles.push(projectParticle);
    }

    return projectParticles;
  }

  createParticles() {
    // Crear partículas de proyecto con imágenes y tamaños adecuados
    for (const proyecto of this.proyectos) {
      if (proyecto.img) {
        proyecto.radius = 40;
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        this.particles.push(new Particle(this, x, y, true, proyecto));
      }
    }

    // Crear partículas normales
    const numNormalParticles = 100; // Cambia esto según la cantidad deseada de partículas normales
    for (let i = 0; i < numNormalParticles; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.particles.push(new Particle(this, x, y));
    }
  }

  connectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const particleA = this.particles[i];
        const particleB = this.particles[j];
        const distance = this.getDistance(particleA, particleB);

        // Define una distancia umbral para conectar partículas
        const thresholdDistance = 100;

        if (distance < thresholdDistance) {
          // Dibuja una línea entre las partículas conectadas
          this.drawConnection(particleA, particleB);
        }
      }
    }
  }

  getDistance(particleA, particleB) {
    const dx = particleA.x - particleB.x;
    const dy = particleA.y - particleB.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  drawConnection(particleA, particleB) {
    // Dibuja una línea entre las partículas conectadas
    this.ctx.strokeStyle = this.options.netLineColor;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(particleA.x, particleA.y);
    this.ctx.lineTo(particleB.x, particleB.y);
    this.ctx.stroke();
  }

  update() {
    // Actualizar partículas y redibujar la animación
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.connectParticles();

    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  // Método para asignar una partícula para ser controlada
  setArrowControlledParticle(particle) {
    this.arrowControlledParticle = particle;
  }

  // Método para eliminar la partícula controlada
  removeArrowControlledParticle() {
    this.arrowControlledParticle = null;
  }

  bindUiActions() {
    this.spawnQuantity = 3;
    this.mouseIsDown = false;
    this.touchIsMoving = false;

    this.onMouseMove = (e) => {
      console.log('Dentro de onMouseMove');
    };

    this.onTouchMove = (e) => {
      e.preventDefault();
      this.touchIsMoving = true;
    };

    this.onMouseDown = (e) => {
      this.mouseIsDown = true;
      let counter = 0;
      let quantity = this.spawnQuantity;
      const intervalId = setInterval(() => {
        if (this.mouseIsDown) {
          if (counter === 1) {
            quantity = 1;
          }
        } else {
          clearInterval(intervalId);
        }
        counter++;
      }, 50);
    };

    this.onTouchStart = (e) => {
      setTimeout(() => {
        if (!this.touchIsMoving) {
          for (let i = 0; i < this.spawnQuantity; i++) {
            this.particles.push(
              new Particle(this, e.changedTouches[0].clientX, e.changedTouches[0].clientY)
            );
          }
        }
      }, 200);
    };

    this.onMouseUp = (e) => {
      this.mouseIsDown = false;
    };

    this.onMouseOut = (e) => {};

    this.onTouchEnd = (e) => {
      e.preventDefault();
      this.touchIsMoving = false;
    };

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

  destroy() {
    // Liberar recursos y desvincular eventos al destruir la animación
    cancelAnimationFrame(this.animationFrame);
    this.unbindUiActions();
  }
}

class ParticleNetworkAnimation {
  constructor() {
    console.log('===> class ParticleNetworkAnimation');
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.particleNetwork = null;
    this.particles = [];
    this.mouseIsDown = false;
    this.touchIsMoving = false;
    this.spawnQuantity = 3;
    this.arrowControlledParticle = null; // Inicialmente, no hay partícula controlada
    this.proyectos = proyectos;

    // Agregar un controlador de eventos para las teclas de flecha
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));

    // Agregar un controlador de eventos de redimensionamiento de ventana
    window.addEventListener('resize', () => {
      this.handleWindowResize();
    });
    // Inicializar la animación
    this.init();
  }

  createArrowControlParticle() {
    console.log('dentro ==> createArrowControlParticle inicio');
    const button = this.controlButton;
    const buttonRect = button.getBoundingClientRect();

    // Calcular las coordenadas iniciales al lado del botón
    const initialX = buttonRect.left + buttonRect.width + 10;
    const initialY = buttonRect.top + buttonRect.height / 2;

    const controlledParticle = new Particle(this.particleNetwork, initialX, initialY, false);
    controlledParticle.isControlled = true;
    this.arrowControlledParticle = controlledParticle;
    console.log('dentro ==> createArrowControlParticle fin');
  }

  interactWithProjectParticles(controlledParticle) {
    const thresholdDistance = 100;

    // Iterar a través de las partículas del proyecto y verificar la cercanía
    for (const particle of this.particleNetwork.particles) {
      if (particle.isProject) {
        const distance = this.getDistance(controlledParticle, particle);
        if (distance <= thresholdDistance) {
          // Abre la URL del proyecto
          window.open(particle.proyecto.url, '_blank');
          console.log('Interactuando con la partícula del proyecto:', particle.proyecto);
        }
      }
    }
  }

  onKeyDown(event) {
    if (this.arrowControlledParticle) {
      // El usuario está controlando una partícula
      if (event.key === 'ArrowUp') {
        this.arrowControlledParticle.moveUp();
      } else if (event.key === 'ArrowDown') {
        this.arrowControlledParticle.moveDown();
      } else if (event.key === 'ArrowLeft') {
        this.arrowControlledParticle.moveLeft();
      } else if (event.key === 'ArrowRight') {
        this.arrowControlledParticle.moveRight();
      } else if (event.key === ' ') {
        // La barra espaciadora para interactuar con partículas proyecto
        this.interactWithProjectParticles(this.arrowControlledParticle);
      } else if (event.key === 'Escape') {
        // Presionar Esc para eliminar la partícula controlada
        this.removeArrowControlParticle();
      }
    }
  }

  onKeyUp(event) {
    if (event.key.startsWith('Arrow') && this.arrowControlledParticle) {
      // Detener el movimiento cuando se suelte la tecla de flecha
      this.arrowControlledParticle.stopMoving();
    }
  }

  removeArrowControlParticle() {
    // Elimina la partícula controlada
    this.arrowControlledParticle = null;
    // Deberías eliminar la representación visual de la partícula controlada si es necesario.

    this.controlButton.style.display = 'block'; // Oculta el botón
    this.controlLegend.style.display = 'none'; // Muestra la leyenda
  }

  init() {
    // Configurar el contenedor y el canvas
    this.container = document.querySelector('.particle-network-animation');
    this.canvas = document.createElement('canvas');
    this.sizeCanvas();
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particleNetwork = new ParticleNetwork(this, proyectos);

    this.bindUiActions();
  }

  handleWindowResize() {
    this.sizeCanvas();
  }

  sizeCanvas() {
    // Establecer las dimensiones del canvas en función del tamaño del contenedor
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }

  onProjectParticleClick(e) {
    // Obtener la posición del clic en relación con el lienzo
    const clickX = e.offsetX;
    const clickY = e.offsetY;

    // Iterar a través de las partículas y verificar si el clic está dentro de alguna partícula-proyecto
    for (const particle of this.particleNetwork.particles) {
      if (particle.isProject) {
        const dx = clickX - particle.x;
        const dy = clickY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Si el clic está dentro de una partícula-proyecto, abrir la URL del proyecto
        if (distance <= particle.radius) {
          window.open(particle.proyecto.url, '_blank');
          break; // Salir del bucle una vez que se abra la URL
        }
      }
    }
  }

  bindUiActions() {
    // Manejo de eventos de interacción del usuario
    this.canvas.addEventListener('click', this.onProjectParticleClick.bind(this));

    // Inicializa el botón y la leyenda para el control de partículas
    this.controlButton = document.querySelector('.controlButton');
    this.controlLegend = document.querySelector('.controlLegend');

    // Agregar un controlador de eventos al botón
    this.controlButton.addEventListener('click', () => {
      console.log('control Button check');
      this.createArrowControlParticle();
      console.log('==> despues createArrowControlParticle, dentro addEventLisener');
      this.controlButton.style.display = 'none'; // Oculta el botón
      this.controlLegend.style.display = 'block'; // Muestra la leyenda
    });

    this.canvas.addEventListener('click', this.onProjectParticleClick.bind(this));
  }
}

const initializeParticleNetworkAnimation = () => {
  const particleAnimation = new ParticleNetworkAnimation();
  particleAnimation.init();
};

export default initializeParticleNetworkAnimation;
