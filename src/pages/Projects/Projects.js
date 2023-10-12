import './styles.css';
import ParticleNetworkAnimation from './particlesNet';

const Projects = () => {
  // Inicializa la animación de partículas
  const animationContainer = document.createElement('div');
  animationContainer.classList.add('particle-network-animation');
  document.body.appendChild(animationContainer);
  console.log('1', animationContainer);

  const particleAnimation = new ParticleNetworkAnimation();
  particleAnimation.init();

  return animationContainer;
};

export default Projects;
