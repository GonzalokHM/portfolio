let messageContainer;

const showLineMessage = () => {
  if (!messageContainer) {
    const contactLinks = document.querySelector('.footer-contact-links');
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const messageDiv = document.createElement('div');
    messageDiv.id = 'lineMessageContainer';
    messageDiv.innerHTML = '<p>Contacta con nosotros a través de Line: +34656316843</p>';

    overlay.appendChild(messageDiv);
    contactLinks.insertAdjacentElement('afterend', overlay);

    messageContainer = messageDiv;

    setTimeout(() => {
      if (messageContainer) {
        messageContainer.remove();
        messageContainer = null;
      }
    }, 8000);
  }
};

export default showLineMessage;
