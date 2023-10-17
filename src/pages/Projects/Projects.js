import './styles.css';
import ParticleNetworkAnimation from './particlesNet';

const Projects = () => {
  // Inicializa la animación de partículas
  const animationContainer = document.createElement('div');
  animationContainer.classList.add('particle-network-animation');
  document.body.appendChild(animationContainer);
  console.log('1', animationContainer);

  // Crear el botón para crear partícula controlable
  const createControlButton = document.createElement('button');
  createControlButton.innerText = 'Crear Partícula Controlable';
  animationContainer.appendChild(createControlButton);

  // Crear el recuadro de leyenda
  const controlLegend = document.createElement('div');
  controlLegend.style.display = 'none'; // Inicialmente oculto
  controlLegend.innerHTML = `
      <p>Controles:</p>
      <p>Flechas: Mover partícula</p>
      <p>ESC: Eliminar partícula</p>
      <p>Barra Espaciadora: Interactuar</p>
    `;
  animationContainer.appendChild(controlLegend);

  const particleAnimation = new ParticleNetworkAnimation();
  particleAnimation.init();

  // Asignar eventos al botón
  createControlButton.addEventListener('click', () => {
    particleAnimation.createArrowControlParticle();
    createControlButton.style.display = 'none'; // Ocultar el botón
    controlLegend.style.display = 'block'; // Mostrar la leyenda
  });

  return animationContainer;
};

export default Projects;
