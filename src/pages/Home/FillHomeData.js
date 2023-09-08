import Home from './Home';

const fillHomeData = () => {
  // ... Tu lógica para obtener los datos, por ejemplo:
  const profileData = {
    imagePath: '/foto.jpg',
    name: 'Gonzalo Hernando Montes',
    job: 'Enthusiastic Full Stack Developer in the Making',
    description:
      'I am a passionate programmer and a digital enthusiast. My constant curiosity about technology drives me to explore new solutions and tackle challenges with creativity. I love translating ideas into functional code and developing innovative solutions that make a difference. I aspire to continue growing as a developer and contribute to exciting projects that drive technological progress.'
  };

  // ... Lógica para llenar los datos en el componente Home
  const homeComponent = Home();
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = homeComponent;
  const profileImage = document.getElementById('profileImage');
  const name = document.getElementById('name');
  const job = document.getElementById('job');
  const description = document.getElementById('description');

  profileImage.src = profileData.imagePath;
  name.textContent = profileData.name;
  job.textContent = profileData.job;
  description.textContent = profileData.description;
};
export default fillHomeData;
