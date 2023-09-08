const createNeuronNetwork = (svg, proyectos) => {
  console.log('SVG:', svg);
  console.log('Proyectos:', proyectos);

  // Número total de neuronas en la red
  const totalNeuronas = 10;

  // Accede a las variables CSS de ancho y alto
  const neuronWidth = getComputedStyle(document.documentElement).getPropertyValue('--neuron-width');
  const neuronHeight = getComputedStyle(document.documentElement).getPropertyValue(
    '--neuron-height'
  );

  // Convierte las variables CSS en números
  const neuronWidthValue = parseInt(neuronWidth, 10);
  const neuronHeightValue = parseInt(neuronHeight, 10);

  // Crea neuronas vacías y almacena sus coordenadas
  const neuronPositions = [];

  const SVG_NS = 'http://www.w3.org/2000/svg';

  for (let i = 0; i < totalNeuronas; i++) {
    const x = (i % 5) * 120 + 100; // Distribuye las neuronas en 5 filas
    const y = Math.floor(i / 5) * 80 + 100; // Distribuye las neuronas en 6 columnas

    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(SVG_NS, 'cx', x);
    circle.setAttributeNS(SVG_NS, 'cy', y);
    circle.setAttributeNS(SVG_NS, 'r', neuronWidthValue / 2); // Usa la variable CSS de ancho
    circle.setAttributeNS(SVG_NS, 'fill', '#e0e0e0'); // Color de la neurona vacía
    svg.appendChild(circle);

    // Almacena las coordenadas de la neurona en el array
    neuronPositions.push({ x, y });
  }

  // Agrega conexiones entre todas las neuronas
  for (let i = 0; i < totalNeuronas; i++) {
    const neuronA = document.querySelector(`#neuron-svg circle:nth-child(${i + 1})`);

    for (let j = 0; j < totalNeuronas; j++) {
      if (i !== j) {
        const neuronB = document.querySelector(`#neuron-svg circle:nth-child(${j + 1})`);
        // Evita conectar una neurona consigo misma
        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttributeNS(SVG_NS, 'x1', neuronA.getAttributeNS(SVG_NS, 'cx'));
        line.setAttributeNS(SVG_NS, 'y1', neuronA.getAttributeNS(SVG_NS, 'cy'));
        line.setAttributeNS(SVG_NS, 'x2', neuronB.getAttributeNS(SVG_NS, 'cx'));
        line.setAttributeNS(SVG_NS, 'y2', neuronB.getAttributeNS(SVG_NS, 'cy'));
        console.log(neuronB);
        line.setAttributeNS(SVG_NS, 'stroke', 'var(--dendrite-color)'); // Usa la variable CSS para el color
        line.setAttributeNS(SVG_NS, 'stroke-width', '2');
        svg.appendChild(line);
      }
    }

    // Agrega neuronas con imágenes y enlaces para tus 5 proyectos
    if (i < 5) {
      const proyecto = proyectos[i];

      const circle = document.querySelector(`#neuron-svg circle:nth-child(${i + 1})`);
      circle.setAttributeNS(SVG_NS, 'cx', i * 150 + 150); // Aumenta el espacio horizontal entre las neuronas de proyecto
      circle.setAttributeNS(SVG_NS, 'cy', 400);
      circle.setAttributeNS(SVG_NS, 'r', neuronWidthValue / 2); // Usa la variable CSS de ancho
      circle.setAttributeNS(SVG_NS, 'fill', '#e0e0e0');

      // Crear la imagen del proyecto
      const image = document.createElementNS(SVG_NS, 'image');
      image.setAttributeNS(SVG_NS, 'x', i * 120 + 100 - neuronWidthValue / 2); // Ajusta la posición de la imagen
      image.setAttributeNS(SVG_NS, 'y', 370 - neuronHeightValue / 2); // Ajusta la posición de la imagen
      image.setAttributeNS(SVG_NS, 'width', neuronWidthValue); // Usa la variable CSS de ancho
      image.setAttributeNS(SVG_NS, 'height', neuronHeightValue); // Usa la variable CSS de alto
      image.setAttributeNS(SVG_NS, 'href', `proyecto${i + 1}.png`); // Enlaza la imagen del proyecto

      const link = document.createElementNS(SVG_NS, 'a');
      link.setAttributeNS(SVG_NS, 'href', proyecto.enlace);

      const text = document.createElementNS(SVG_NS, 'text');
      text.setAttributeNS(SVG_NS, 'x', i * 120 + 100);
      text.setAttributeNS(SVG_NS, 'y', 440); // Posición del texto debajo del círculo
      text.setAttributeNS(SVG_NS, 'text-anchor', 'middle');
      text.textContent = proyecto.nombre;

      link.appendChild(circle);
      link.appendChild(image); // Agrega la imagen a la neurona
      link.appendChild(text);

      svg.appendChild(link);
    }
  }
};

export default createNeuronNetwork;
