const jobsList = () => {
  const companies = [
    {
      name: 'Adobe Inc.',
      position: 'Full Stack Developer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Adobe_Corporate_Horizontal_Red_HEX.svg/50px-Adobe_Corporate_Horizontal_Red_HEX.svg.png',
      dates: 'July 2008 - November 2010',
      description: 'Creative software company, known for products like Photoshop and Illustrator.',
      responsibilities: [
        'Development of key features for e-commerce platforms.',
        'Integration of payment gateways and inventory management systems.'
      ],
      url: 'https://www.adobe.com/'
    },

    {
      name: 'IBM Corporation',
      position: 'Lead Full Stack Developer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/50px-IBM_logo.svg.png',
      dates: 'May 2012 - August 2014',
      description: 'Global technology company, specializing in hardware, software, and services.',
      responsibilities: [
        'Technical leadership of projects from conception to implementation.',
        'Development of customized solutions for diverse clients.'
      ],
      url: 'https://www.ibm.com/'
    },
    {
      name: 'Amazon Web Services (AWS)',
      position: 'Full Stack Developer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/50px-Amazon_Web_Services_Logo.svg.png',
      dates: 'April 2016 - June 2018',
      description: 'Leading provider of cloud services and infrastructure solutions.',
      responsibilities: [
        'Development of front-end and back-end modules for cloud-based applications.',
        'Collaboration on migration and architecture update projects.'
      ],
      url: 'https://aws.amazon.com/'
    },
    {
      name: 'Microsoft Corporation',
      position: 'Senior Full Stack Engineer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/50px-Microsoft_logo.svg.png',
      dates: 'July 2018 - December 2019',
      description:
        'Multinational technology company, known for its software, hardware, and services.',
      responsibilities: [
        'Leadership in the design and development of complex enterprise applications.',
        'Integration of external APIs to enhance product functionality.'
      ],
      url: 'https://www.microsoft.com/en-us'
    },
    {
      name: 'Facebook, Inc.',
      position: 'Full Stack Engineer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/50px-Facebook_f_logo_%282019%29.svg.png',
      dates: 'September 2014 - March 2016',
      description: 'Social media and online services company.',
      responsibilities: [
        'Development and maintenance of web applications to enhance user experience.',
        'Collaboration with multidisciplinary teams on large-scale projects.'
      ],
      url: 'https://www.facebook.com/'
    },
    {
      name: 'Oracle Corporation',
      position: 'Full Stack Engineer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/50px-Oracle_logo.svg.png',
      dates: 'December 2010 - April 2012',
      description: 'Technology company specializing in software, hardware, and database services.',
      responsibilities: [
        'Design and implementation of efficient databases.',
        'Development of APIs for third-party data integration.'
      ],
      url: 'https://www.oracle.com/'
    },
    {
      name: 'Google Inc.',
      position: 'Full Stack Developer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/IOS_Google_icon.png/50px-IOS_Google_icon.png',
      dates: 'January 2020 - Present',
      description: 'Leading technology company, focused on search engines and online services.',
      responsibilities: [
        'Development of front-end and back-end features for internal applications.',
        'Collaboration on projects to improve performance and scalability.'
      ],
      url: 'https://www.google.com/'
    }
  ];

  const jober = document.getElementById('jobs');
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const close = document.getElementById('close');
  const infoContainerModal = document.getElementById('jobs-info');

  const showInfo = (company) => {
    // Agregar la información al modal
    infoContainerModal.innerHTML = `
      <a href="${company.url}" target="_blank">
        <img src="${company.logo}" alt="Logo ${company.name}">
      </a>
      <p><strong>${company.name}</strong></p>
      <div class="highlight-label">Position:</div>
       <p>${company.position}</p>
      <div class="highlight-label">Dates:</div>
        <p>${company.dates}</p>
      <div class="highlight-label">Description:</div>
        <p>${company.description}</p>
      <div class="highlight-label">Responsibilities:</div>
        <p>${company.responsibilities.join(', ')}</p>
    `;

    // Mostrar el overlay y el modal
    overlay.style.display = 'block';
    modal.style.display = 'block';
  };

  // Configurar el botón de cierre
  close.addEventListener('click', () => {
    // Ocultar el overlay y el modal al hacer clic en el botón de cierre
    overlay.style.display = 'none';
    modal.style.display = 'none';
  });

  const listIt = () => {
    const totalcompanies = companies.length;
    const radio = 100; // Ajusta según tu diseño

    companies.forEach((company, index) => {
      const angle = (360 / totalcompanies) * index; // Calcular el ángulo
      const radians = (angle * Math.PI) / 180;

      const x = Math.cos(radians) * radio;
      const y = Math.sin(radians) * radio;

      const div = document.createElement('div');
      div.className = 'company';
      div.innerHTML = `<img src="${company.logo}" alt="Logo ${company.name}">`;

      div.style.left = `${x + 150}px`; // Ajusta según tu diseño
      div.style.top = `${y + 150}px`;

      div.addEventListener('touchstart', () => showInfo(company));
      div.addEventListener('click', () => showInfo(company));

      jober.appendChild(div);
    });
  };
  listIt();
};

export default jobsList;
