import './styles.css';
import jobsList from './jobs';
import drawPieChart from './Piechart';

const Experience = () => {
  const container = document.createElement('div');
  container.id = 'experience-container';

  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggleView';
  toggleButton.textContent = 'Mostrar Estudios';

  const jobsContainer = document.createElement('div');
  jobsContainer.id = 'jobs';

  const pieChart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  pieChart.id = 'pieChart';
  pieChart.setAttribute('width', '260');
  pieChart.setAttribute('height', '250');
  pieChart.style.display = 'none';

  let view = 'jobs';
  const updateView = () => {
    if (view === 'jobs') {
      jobsContainer.style.display = 'block';
      pieChart.style.display = 'none';
      toggleButton.textContent = 'Mostrar Estudios';
      jobsList();
    } else {
      jobsContainer.style.display = 'none';
      pieChart.style.display = 'block';
      toggleButton.textContent = 'Mostrar Experiencia';
      drawPieChart();
    }
  };

  const toggleView = () => {
    view = view === 'jobs' ? 'studies' : 'jobs';
    updateView();
  };

  toggleButton.addEventListener('click', toggleView);

  container.append(toggleButton, jobsContainer, pieChart);
  document.querySelector('main').appendChild(container);
  updateView();
  return container;
};

export default Experience;
