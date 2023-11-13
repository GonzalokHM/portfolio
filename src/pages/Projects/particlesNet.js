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

let arrowUpKeyPressed = false;
let arrowDownKeyPressed = false;
let arrowLeftKeyPressed = false;
let arrowRightKeyPressed = false;

class Particle {
  constructor(parent, x, y, isProject, proyecto, isControlled) {
    this.network = parent;
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.isProject = isProject || false;
    this.proyecto = proyecto || null;
    this.isControlled = isControlled || false;
    this.controlledSpeed = 5;

    if (isProject && proyecto) {
      // Configuración específica para partículas de proyectos
      this.loadImage(proyecto.img);
      this.radius = 35;
      this.velocity = {
        x: (Math.random() - 0.5) * parent.options.velocity,
        y: (Math.random() - 0.5) * parent.options.velocity
      };
      this.x = x;
      this.y = y;
      // Define los límites de la zona de movimiento basados en la posición de creación
      const marginX = this.canvas.width * 0.2;
      const marginY = this.canvas.height * 0.2;
      
      // Establece la moveArea
      this.moveArea = {
          x: marginX,
          y: marginY,
          width: this.canvas.width - 2 * marginX,
          height: this.canvas.height - 2 * marginY
      };
   
    } else if (!isProject && !isControlled) {
      // Configuración para partículas normales de fondo
      this.radius = getLimitedRandom(5.5, 8.5);
      this.opacity = 0.5;
      this.x = x || Math.random() * this.canvas.width;
      this.y = y || Math.random() * this.canvas.height;
      this.velocity = {
        x: (Math.random() - 0.5) * parent.options.velocity,
        y: (Math.random() - 0.5) * parent.options.velocity
      };
      this.moveArea = {
        x: 0,
        y: 0,
        width: this.canvas.width,
        height: this.canvas.height
      };
    } else if (isControlled) {
      this.particleColor = returnRandomArrayitem(this.network.options.particleColors);
      this.radius = 15;
      this.x = x;
      this.y = y;
      this.moveArea = {
        x: 0,
        y: 0,
        width: this.canvas.width,
        height: this.canvas.height
      };
    }
  }

  update() {
    if (this.opacity < 1) {
      this.opacity += 0.01;
    } else {
      this.opacity = 1;
    }

    if (!this.isProject && !this.isControlled) {
      if (this.x > this.canvas.width || this.x < 0) {
        this.velocity.x = -this.velocity.x;
      }
      if (this.y > this.canvas.height || this.y < 0) {
        this.velocity.y = -this.velocity.y;
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y; 
    }

    else if (this.isProject && this.proyecto) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
   
        // Comprueba si la partícula choca con algún borde de la moveArea
        if (this.x  > this.moveArea.width || this.x < this.moveArea.x) {
          // Si choca con el borde horizontal, revierte la velocidad en X
          this.velocity.x = -this.velocity.x;
      }

      if (this.y  > this.moveArea.height || this.y < this.moveArea.y) {
          // Si choca con el borde vertical, revierte la velocidad en Y
          this.velocity.y =  -this.velocity.y;
      }
    
      // Comprueba la colisión con otras partículas de proyecto
      for (const particle of this.network.particles) {
        if (particle.isProject && particle !== this) {
          
          const distance = this.network.getDistance(this, particle);
          const combinedRadius = this.radius + particle.radius;
          // Si hay colisión, ajusta las posiciones y velocidades
          const tolerance = 0.1;
          if (distance < combinedRadius + tolerance) {
            const angle = Math.atan2(particle.y - this.y, particle.x - this.x);
            const overlap = combinedRadius - distance;
            
            // Calcula las nuevas posiciones después del ajuste por superposición
            this.x -= (overlap / 2) * Math.cos(angle);
            this.y -= (overlap / 2) * Math.sin(angle);
            particle.x += (overlap / 2) * Math.cos(angle);
            particle.y += (overlap / 2) * Math.sin(angle);
            
            // Invierte la dirección de la velocidad para ambas partículas
            this.velocity.x *= -1;
            this.velocity.y *= -1;
            particle.velocity.x *= -1;
            particle.velocity.y *= -1;
          }
        }
      }
    }
    
     else if (this.isControlled) {
      if (this.isControlled) {
        if (arrowUpKeyPressed) {
          this.y = Math.max(this.moveArea.y, this.y - this.controlledSpeed); // Mueve hacia arriba
        }
        if (arrowDownKeyPressed) {
          this.y = Math.min(this.moveArea.y + this.moveArea.height, this.y + this.controlledSpeed); // Mueve hacia abajo
        }
        if (arrowLeftKeyPressed) {
          this.x = Math.max(this.moveArea.x, this.x - this.controlledSpeed); // Mueve hacia la izquierda
        }
        if (arrowRightKeyPressed) {
          this.x = Math.min(this.moveArea.x + this.moveArea.width, this.x + this.controlledSpeed); // Mueve hacia la derecha
        }
      }
    }
  }

  draw() {
    this.ctx.beginPath();

    if (this.isControlled) {
      // Dibuja la partícula controlada de manera especial
      this.ctx.fillStyle = this.particleColor;
    }
    if (this.isProject && this.proyecto) {
      // Si es una partícula de proyecto, dibuja la imagen
      if (this.img) {
        // Calcular las coordenadas de dibujo para ajustar la imagen al tamaño de la partícula
        const imgX = this.x - this.radius;
        const imgY = this.y - this.radius;
        const imgWidth = this.radius * 2;
        const imgHeight = this.radius * 2;
        // Crea un área de recorte circular
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.clip();

        // Dibuja la imagen dentro del área de recorte circular
        this.ctx.drawImage(this.img, imgX, imgY, imgWidth, imgHeight);

        // Restaura el contexto para evitar que el área de recorte afecte a otros elementos
        this.ctx.restore();
        return;
      }
    } else if (!this.isProject && !this.isControlled) {
      this.ctx.fillStyle = 'white';
    }
    this.ctx.globalAlpha = this.opacity;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  loadImage() {
    const x = this.x;
    const y = this.y;
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
}

class ParticleNetwork {
  constructor(parent) {
    this.options = {
      velocity: 1,
      density: 15000,
      netLineDistance: 200,
      netLineColor: '#929292',
      particleColors: ['red', 'green', 'blue']
    };
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.particles = [];
    this.mouseIsDown = false;
    this.touchIsMoving = false;
    this.arrowControlledParticle = null;
    this.spawnQuantity = 3;

    this.proyectos = proyectos;

    // Inicializa el botón y la leyenda para el control de partículas
    this.controlButton = document.querySelector('.controlButton');
    this.controlLegend = document.querySelector('.controlLegend');

    // Agregar un controlador de eventos para las teclas de flecha
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));

    this.createProjectParticles();
    this.createParticles();
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
    this.bindUiActions();
  }

  createProjectParticles() {
    const projectParticles = [];
    const numProjectParticles = this.proyectos.length;
    const containerWidth = this.canvas.width;
    const containerHeight = this.canvas.height;

    let numRows = 1; // Número inicial de filas

    if (containerWidth >= 768 && containerWidth < 1024) {
      numRows = 2; // Tablet: 2 filas
    } else if (containerWidth < 768) {
      numRows = 5; // Móvil: 5 filas
    }

    const numCols = Math.ceil(numProjectParticles / numRows);

    const horizontalSpacing = containerWidth / (numCols + 1);
    const verticalSpacing = containerHeight / (numRows + 1);

    for (let i = 0; i < numProjectParticles; i++) {
      const colIndex = i % numCols;
      const rowIndex = Math.floor(i / numCols);
      const x = (colIndex + 1) * horizontalSpacing;
      const y = (rowIndex + 1) * verticalSpacing;

      // Crear la partícula de proyecto con imagen y tamaño adecuado
      const proyecto = this.proyectos[i];

      proyecto.radius = 40;
      const projectParticle = new Particle(this, x, y, true, proyecto);
      projectParticles.push(projectParticle);

      // Además, crear las partículas de proyecto con imágenes y tamaños adecuados
      this.particles.push(projectParticle);
    }

    return projectParticles;
  }

  createParticles() {
    // Crear partículas normales
    const numNormalParticles = 30; //cambiaaar cuando se debuge por competo!!!!!!!!!!
    for (let i = 0; i < numNormalParticles; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.particles.push(new Particle(this, x, y));
    }
  }

  createArrowControlledParticle(event) {
    const button = this.controlButton;

    // Calcular las coordenadas iniciales al lado del botón
    const x = event.clientX + 10;
    const y = event.clientY - 150;

    this.isControlled = true;
    // Configura la partícula controlada
    const controlledParticle = new Particle(this, x, y, false, null, this.isControlled);
    // Establece la partícula controlada
    this.arrowControlledParticle = controlledParticle;

    // Agrega la partícula a la lista de partículas
    this.particles.push(controlledParticle);
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

    if (this.arrowControlledParticle) {
      // Permitir que la partícula controlada se mueva
      this.arrowControlledParticle.update();
    }

    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }

  onKeyDown(event) {
    if (this.arrowControlledParticle) {
      // El usuario está controlando una partícula
      if (event.key === 'ArrowUp') {
        arrowUpKeyPressed = true;
      } else if (event.key === 'ArrowDown') {
        arrowDownKeyPressed = true;
      } else if (event.key === 'ArrowLeft') {
        arrowLeftKeyPressed = true;
      } else if (event.key === 'ArrowRight') {
        arrowRightKeyPressed = true;
      } // La barra espaciadora para interactuar con partículas proyecto
      else if (event.key === ' ') {
        this.interactWithProjectParticles();
      } // Presionar Esc para eliminar la partícula controlada
      else if (event.key === 'Escape') {
        this.removeArrowControlledParticle();
      }
    }
  }

  onKeyUp(event) {
    if (this.arrowControlledParticle) {
      // Detener el movimiento cuando se suelte la tecla de flecha
      if (event.key === 'ArrowUp') {
        arrowUpKeyPressed = false;
      } else if (event.key === 'ArrowDown') {
        arrowDownKeyPressed = false;
      } else if (event.key === 'ArrowLeft') {
        arrowLeftKeyPressed = false;
      } else if (event.key === 'ArrowRight') {
        arrowRightKeyPressed = false;
      }
    }
  }

  interactWithProjectParticles() {
    const thresholdDistance = 100;

    // Iterar a través de las partículas del proyecto y verificar la cercanía
    if (this.arrowControlledParticle) {
      for (const particle of this.particles) {
        if (particle.isProject) {
          const distance = this.getDistance(this.arrowControlledParticle, particle);
          if (distance <= thresholdDistance) {
            // Abre la URL del proyecto
            window.open(particle.proyecto.url);
          }
        }
      }
    }
  }

  removeArrowControlledParticle() {
    const index = this.particles.indexOf(this.arrowControlledParticle);
    // Elimina la partícula controlada de la lista
    if (index !== -1) {
      this.particles.splice(index, 1);
    }
    // Restablece la referencia a la partícula controlada
    this.arrowControlledParticle = null;

    this.controlButton.style.display = 'block'; // Oculta el botón
    this.controlLegend.style.display = 'none'; // Muestra la leyenda
  }

  bindUiActions() {
    this.spawnQuantity = 3;
    this.mouseIsDown = false;
    this.touchIsMoving = false;

    this.onTouchMove = (e) => {
      e.preventDefault();
      this.touchIsMoving = true;
    };

    this.onMouseOrTouchStart = (e) => {
      for (let i = 0; i < this.spawnQuantity; i++) {
        this.particles.push(new Particle(this, e.clientX, e.clientY));
      }
    };

    // Agregar un controlador de eventos al botón
    this.controlButton.addEventListener('click', (event) => {
      this.createArrowControlledParticle(event);
      this.controlButton.style.display = 'none'; // Oculta el botón
      this.controlLegend.style.display = 'block'; // Muestra la leyenda
    });

    this.canvas.addEventListener('click', this.onMouseOrTouchStart);
    this.canvas.addEventListener('touchstart', this.onMouseOrTouchStart);
  }

  unbindUiActions() {
    if (this.canvas) {
      this.canvas.removeEventListener('click', this.onMouseOrTouchStart);
      this.canvas.removeEventListener('touchstart', this.onMouseOrTouchStart);
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
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.particleNetwork = null;
    this.particles = [];
    this.mouseIsDown = false;
    this.touchIsMoving = false;
    this.spawnQuantity = 3;
    this.proyectos = proyectos;

    // Agregar un controlador de eventos de redimensionamiento de ventana
    window.addEventListener('resize', () => {
      this.handleWindowResize();
      window.location.reload();
    });
    // Inicializar la animación
    this.init();
  }

  init() {
    // Configurar el contenedor y el canvas
    this.container = document.querySelector('.particle-network-animation');
    this.canvas = document.createElement('canvas');
    this.sizeCanvas();
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particleNetwork = new ParticleNetwork(this);

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
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

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
  }
}

const initializeParticleNetworkAnimation = () => {
  new ParticleNetworkAnimation();
};

export default initializeParticleNetworkAnimation;
