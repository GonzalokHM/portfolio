import companies from '../../data/jobsData';
import showInfo from '../../data/showInfo';

const jobsList = () => {
  const jober = document.getElementById('jobs');
  if (!jober) return;

  let overlay = document.getElementById('overlay');
  let modal = document.getElementById('modal');
  let infoContainerModal = document.getElementById('jobs-info');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);
  }

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <span id="close">X</span>
      <div id="jobs-info"></div>
    `;
    document.body.appendChild(modal);
  }

  if (!infoContainerModal) {
    infoContainerModal = document.getElementById('jobs-info');
  }

  modal.querySelector('#close').addEventListener('click', () => {
    overlay.style.display = 'none';
    modal.style.display = 'none';
  });

  const totalCompanies = companies.length;
  const radio = 100;
  const centerX = 150;
  const centerY = 150;

  companies.forEach((company, index) => {
    const angle = (360 / totalCompanies) * index;
    const radians = (angle * Math.PI) / 180;

    const x = Math.cos(radians) * radio + centerX;
    const y = Math.sin(radians) * radio + centerY;

    const div = document.createElement('div');
    div.className = 'company';
    div.innerHTML = `<img src="${company.logo}" alt="Logo ${company.name}">`;

    div.style.position = 'absolute';
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;

    div.addEventListener('click', () => showInfo(company, modal, overlay, infoContainerModal));

    jober.appendChild(div);
  });
};

export default jobsList;
