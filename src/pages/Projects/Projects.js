import './styles.css';
import ParticleNetworkAnimation from './particlesNet';

const proyectos = [
  {
    nombre: 'P1 responsive',
    img: 'src="proyecto1.png"',
    enlace: 'https://dreamotorshop.netlify.app'
  },
  {
    nombre: 'P2 tienda dinamica',
    img: 'src="proyecto2.png"',
    enlace: 'https://thegreenshop.netlify.app/'
  },
  {
    nombre: 'gym-Tracker',
    img: 'src="proyecto3.png"',
    enlace: 'https://thetracker.netlify.app/'
  },
  {
    nombre: 'color fliper',
    img: 'src="proyecto4.png"',
    enlace: 'https://thecolordesing.netlify.app/'
  },
  { nombre: 'TPBS', img: 'src="proyecto5.png"', enlace: 'https://app.thepowermba.com/' }
];
const Projects = () => {
  // Inicializa la animación de partículas
  const animationContainer = document.createElement('div');
  animationContainer.classList.add('particle-network-animation');
  document.body.appendChild(animationContainer);

  const particleAnimation = new ParticleNetworkAnimation();
  particleAnimation.init(animationContainer, proyectos);

  const projectsContainer = document.createElement('div');
  projectsContainer.classList.add('neuron-container');

  // const projectsHTML = proyectos
  //   .map(
  //     (proyecto, index) => `
  //           <div class="project">
  //               <a href="${proyecto.enlace}" class="neuron">
  //                   <img src="proyecto${index + 1}.png" alt="${proyecto.nombre}">
  //               </a>
  //               <p>${proyecto.nombre}</p>
  //           </div>
  //       `
  //   )
  //   .join('');

  // projectsContainer.innerHTML = `
  //       <h2>Projects</h2>
  //       ${projectsHTML}
  //   `;

  // return projectsContainer;
};

export default Projects;
