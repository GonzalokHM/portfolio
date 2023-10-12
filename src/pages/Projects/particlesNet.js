import proyectos from './projectList'

const getLimitedRandom=(min, max, roundToInteger)=> {
  let number = Math.random() * (max - min) + min;
  if (roundToInteger) {
    number = Math.round(number);
  }
  return number;
}

const returnRandomArrayitem=(array)=> {
  return array[Math.floor(Math.random() * array.length)];
}

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
      this.resize(proyecto.radius * 2);
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

  update() {
    if (this.proyecto) {
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
 // Calcular las coordenadas de dibujo para ajustar la imagen al tamaño de la partícula
 const imgX = this.x - this.radius;
 const imgY = this.y - this.radius;
 const imgWidth = this.radius * 2;
 const imgHeight = this.radius * 2;

 // Dibuja la imagen dentro de la partícula
 this.ctx.drawImage(this.img, imgX, imgY, imgWidth, imgHeight);
} 
    } else {
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = this.opacity;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

  loadImage() {
    // Cargar la imagen de proyecto
    this.img = new Image();
    this.img.onload = () => {
     console.log('La imagen se ha cargado con éxito')
    };
    this.img.onerror = (error) => {
      // Manejar errores al cargar la imagen
      console.error('Error al cargar la imagen:', error);
      // Puedes tomar medidas como mostrar una imagen de reemplazo o registrar el error
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
    console.log('Dentro del constructor de ParticleNetwork');
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

  createProjectParticles = ()=> {
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

    return projectParticles;
  };

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
    if (!this.mouseIsDown && !this.touchIsMoving) {
      this.createInteractionParticle();
    }
    this.animationFrame = requestAnimationFrame(this.update.bind(this));
  }
  createInteractionParticle() {
    // Obtener una partícula de proyecto aleatoria (puedes personalizar esta lógica según tus necesidades)
    const randomProjectParticle = this.getRandomProjectParticle();
  
    if (randomProjectParticle) {
      // Verificar si ya existe una partícula de proyecto del mismo proyecto
      const existingProjectParticleIndex = this.particles.findIndex((particle) =>
        particle.isProject && particle.proyecto === randomProjectParticle.proyecto
      );
  
      if (existingProjectParticleIndex !== -1) {
        // Eliminar la partícula de proyecto existente del mismo proyecto
        this.particles.splice(existingProjectParticleIndex, 1);
      }
  
      // Crear una partícula de interacción basada en la partícula de proyecto seleccionada
      const interactionParticle = {
        particleColor: randomProjectParticle.particleColor, // Usar el mismo color
        radius: randomProjectParticle.radius * 2, // Usar un radio más grande
        opacity: 0.7 // Opacidad personalizada
      };
  
      this.particles.push(new Particle(this, null, null, true, interactionParticle));
    }
  }
  bindUiActions() {
    this.spawnQuantity = 3;
    this.mouseIsDown = false;
    this.touchIsMoving = false;
  
    this.onMouseMove = (e) => {
      console.log('Dentro de onMouseMove');
      if (!this.interactionParticle) {
        this.createInteractionParticle();
      }
      this.interactionParticle.x = e.offsetX;
      this.interactionParticle.y = e.offsetY;
    };
  
    this.onTouchMove = (e) => {
      e.preventDefault();
      this.touchIsMoving = true;
      if (!this.interactionParticle) {
        this.createInteractionParticle();
      }
      this.interactionParticle.x = e.changedTouches[0].clientX;
      this.interactionParticle.y = e.changedTouches[0].clientY;
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
          for (let i = 0; i < quantity; i++) {
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
      }, 50);
    };
  
    this.onTouchStart = (e) => {
      e.preventDefault();
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
  
    this.onMouseOut = (e) => {
      this.removeInteractionParticle();
    };
  
    this.onTouchEnd = (e) => {
      e.preventDefault();
      this.touchIsMoving = false;
      this.removeInteractionParticle();
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
  constructor(proyectos) {
    console.log('ParticleNetworkAnimation constructor, this:', this);
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

  }
}

export default ParticleNetworkAnimation