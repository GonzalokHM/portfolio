import showLineMessage from '../../utils/footerMesage';
import links from '../../utils/footerLinks';
import './Footer.css';

const Footer = () => {
  const footer = document.querySelector('footer');
  footer.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = 'More about me:';

  const contactList = document.createElement('ul');
  contactList.classList.add('footer-contact-links');

  links.forEach((link) => {
    const li = document.createElement('li');
    li.id = link.id;
    if (link.className) li.classList.add(link.className);

    const a = document.createElement('a');
    a.href = link.href;
    a.target = '_blank';
    a.innerHTML = `<i class="${link.icon}" style="color: ${link.color || 'inherit'};"></i>`;

    li.appendChild(a);
    contactList.appendChild(li);

    if (link.special) {
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (/Mobi|Android/i.test(navigator.userAgent)) {
          window.location.href = link.href;
        } else {
          showLineMessage();
        }
      });
    }
  });

  const devText = document.createElement('p');
  devText.textContent = 'Developed with heart by Gonzalo Hernando';

  footer.append(title, contactList, devText);
};

export default Footer;
