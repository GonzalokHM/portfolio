import './Footer.css';

const template = () => {
  return `
    <p>https://github.com/GonzalokHM</p>
    `;
};

const Footer = () => {
  document.querySelector('footer').innerHTML = template();
};

export default Footer;
