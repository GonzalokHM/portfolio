import './styles.css';

const Projects = () => {
  const container = document.createElement('div');
  container.className = 'projetsContainer';

  // Crear título
  const title = document.createElement('h2');
  title.id = 'projectsTitle';
  title.textContent = 'Projects';

  // Crear el contenedor de animación de partículas
  const animationContainer = document.createElement('div');
  animationContainer.classList.add('particle-network-animation');

  // Crear el botón de control
  const controlButton = document.createElement('button');
  controlButton.classList.add('controlButton');
  controlButton.textContent = 'Control Particle';

  // Crear la leyenda de controles
  const controlLegend = document.createElement('div');
  controlLegend.classList.add('controlLegend');

  const controlsTitle = document.createElement('h4');
  controlsTitle.textContent = 'Controls:';

  const controls = ['Arrows: Move', 'ESC: Destroy', 'Space: Interact'];

  controls.forEach((text) => {
    const p = document.createElement('p');
    p.textContent = text;
    controlLegend.appendChild(p);
  });

  // Ensamblar los elementos
  controlLegend.prepend(controlsTitle);
  animationContainer.append(controlButton, controlLegend);
  container.append(title, animationContainer);

  return container;
};

export default Projects;
