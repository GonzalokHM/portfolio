const showInfo = (company, modal, overlay, infoContainerModal) => {
  if (!modal || !overlay || !infoContainerModal) {
    console.error('Faltan elementos del modal');
    return;
  }

  infoContainerModal.innerHTML = '';

  const companyLink = document.createElement('a');
  companyLink.href = company.url;
  companyLink.target = '_blank';

  const companyLogo = document.createElement('img');
  companyLogo.src = company.logo;
  companyLogo.alt = `Logo ${company.name}`;
  companyLink.appendChild(companyLogo);

  const companyName = document.createElement('p');
  companyName.innerHTML = `<strong>${company.name}</strong>`;

  const createInfoBlock = (label, value) => {
    const wrapper = document.createElement('div');

    const labelElement = document.createElement('div');
    labelElement.className = 'highlight-label';
    labelElement.textContent = label;

    const valueElement = document.createElement('p');
    valueElement.textContent = value;

    wrapper.appendChild(labelElement);
    wrapper.appendChild(valueElement);

    return wrapper;
  };

  infoContainerModal.append(
    companyLink,
    companyName,
    createInfoBlock('Position:', company.position),
    createInfoBlock('Dates:', company.dates),
    createInfoBlock('Description:', company.description),
    createInfoBlock('Responsibilities:', company.responsibilities.join(', '))
  );

  overlay.style.display = 'block';
  modal.style.display = 'block';
};

export default showInfo;
