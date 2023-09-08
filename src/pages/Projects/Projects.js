import './styles.css';
import createNeuronNetwork from './neuronNet';

const Projects = () => {
  const proyectos = [
    { nombre: 'P1 responsive', enlace: 'https://dreamotorshop.netlify.app' },
    { nombre: 'P2 tienda dinamica', enlace: 'https://thegreenshop.netlify.app/' },
    { nombre: 'gym-Tracker', enlace: 'https://thetracker.netlify.app/' },
    { nombre: 'color fliper', enlace: 'https://thecolordesing.netlify.app/' },
    { nombre: 'TPBS', enlace: 'https://app.thepowermba.com/' }
  ];
  document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('neuron-svg');

    // Llama a la función para crear la red neuronal
    createNeuronNetwork(svg, proyectos);
  });

  const projectsHTML = proyectos
    .map(
      (proyecto, index) => `
    <div class="project">
      <a href="${proyecto.enlace}" class="neuron">
        <img src="proyecto${index + 1}.png" alt="${proyecto.nombre}">
      </a>
      <p>${proyecto.nombre}</p>
    </div>
    `
    )
    .join('');

  return `
    <h2>Projects</h2>
    <div class="neuron-container">
     <div id='neuron-svg'></div>
       ${projectsHTML}
    </div>
  `;
};

export default Projects;
