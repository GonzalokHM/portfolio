import './styles.css';
import ParticleNetworkAnimation from './particlesNet';

export const proyectos = [
  {
    nombre: 'P1 responsive',
    img: 'proyecto1.png',
    enlace: 'https://dreamotorshop.netlify.app'
  },
  {
    nombre: 'P2 tienda dinamica',
    img: 'proyecto2.png',
    enlace: 'https://thegreenshop.netlify.app/'
  },
  {
    nombre: 'gym-Tracker',
    img: 'proyecto3.png',
    enlace: 'https://thetracker.netlify.app/'
  },
  {
    nombre: 'color fliper',
    img: 'proyecto4.png',
    enlace: 'https://thecolordesing.netlify.app/'
  },
  { nombre: 'TPBS', img: 'proyecto5.png', enlace: 'https://app.thepowermba.com/' }
];

export const Projects = () => {
  // Inicializa la animación de partículas
  const animationContainer = document.createElement('div');
  animationContainer.classList.add('particle-network-animation');
  document.body.appendChild(animationContainer);
  console.log('1', animationContainer);
  console.log('2', proyectos);

  const particleAnimation = new ParticleNetworkAnimation();
  particleAnimation.init();
};
