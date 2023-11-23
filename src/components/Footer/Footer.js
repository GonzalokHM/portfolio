import './Footer.css';

const template = () => {
  return `
  <h3>more about me:</h3>
  <ul class="footer-contact-links">
  <li id="linkedinLinkF" class="gitKedinF">
   <a href="https://www.linkedin.com/in/gonzalo-hernando-2973a2202/" target="_blank">
   <i class="fa-brands fa-linkedin"></i>
  </a>
  </li>
  <li id="line">
  <a href="line://msg/text/+34656316843" id="lineLink">
  <i class="fa-brands fa-line" style="color: #00ff04;"></i>
  </a>
  </li>
  <li id="githubLinkF" class="gitKedinF">
   <a href="https://github.com/GonzalokHM" target="_blank">
       <i class="fab fa-github"></i>
   </a>
  </li>
  </ul>
  <p>developed with heart by Gonzalo Hernando</p>
  `;
};
let messageContainer;

const Footer = () => {
  document.querySelector('footer').innerHTML = template();
  const lineLink = document.getElementById('lineLink');

  lineLink.addEventListener('click', (ev) => {
    ev.preventDefault();

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Dispositivo móvil, abrir Line
      window.location.href = 'line://msg/text/+34656316843';
      console.error('Failed to launch error ==> Because you are not in a smartphone');
    } else if (!messageContainer) {
      // Dispositivo de escritorio, mostrar mensaje
      const contactLinks = document.getElementsByClassName('footer-contact-links')[0];
      contactLinks.insertAdjacentHTML(
        'afterend',
        `<div id="overlay">
           <div id="lineMessageContainer">
               <p>Contacta con nosotros a través de Line: +34656316843</p>
            </div>
         </div>`
      );

      messageContainer = document.getElementById('lineMessageContainer');

      // Eliminar el mensaje después de 8 segundos
      setTimeout(() => {
        if (messageContainer) {
          messageContainer.remove();
          messageContainer = '';
        }
      }, 8000);
    }
  });
};

export default Footer;
