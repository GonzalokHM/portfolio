const drawPieChart = () => {
  const pieChart = document.getElementById('pieChart');

  const cx = 130;
  const cy = 120;
  const r = 100;

  const data = [
    { nombre: 'JavaScript', porcentaje: 25, color: '#ffb88d' },
    { nombre: 'TypeScript', porcentaje: 15, color: '#ff8d8d' },
    { nombre: 'React', porcentaje: 20, color: '#35ce93' },
    { nombre: 'Git', porcentaje: 10, color: '#35cdce' },
    { nombre: 'VSCode', porcentaje: 15, color: '#c38dff' },
    { nombre: 'Node', porcentaje: 15, color: '#fbd753' }
  ];

  const coords = (angle, radius) => {
    const arad = (Math.PI / 180) * angle;
    return {
      x: cx + radius * Math.cos(arad),
      y: cy + radius * Math.sin(arad)
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = coords(startAngle, radius);
    const end = coords(endAngle, radius);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} L ${x} ${y} Z`;
  };

  const highlightSegment = (segment, percentage, name) => {
    segment.setAttribute('transform', 'scale(1.1)');
    console.log(`Highlighting ${name} (${percentage}%)`);
  };

  const resetSegment = (segment) => {
    segment.setAttribute('transform', 'scale(1)');
  };

  const drawSegment = (startAngle, endAngle, color, percentage, name) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', describeArc(cx, cy, r, startAngle, endAngle));
    path.setAttribute('fill', color);
    path.setAttribute('stroke', '#fff');
    path.setAttribute('stroke-width', '1');
    path.addEventListener('mouseover', () => highlightSegment(path, percentage, name));
    path.addEventListener('mouseout', () => resetSegment(path));
    // pieChart.appendChild(path);

    const textAngle = (startAngle + endAngle) / 2;
    const textCoords = coords(textAngle, r * 0.8);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', textCoords.x);
    text.setAttribute('y', textCoords.y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('alignment-baseline', 'middle');
    text.setAttribute('fill', '#fff');
    text.textContent = `${name} (${percentage}%)`;
    // path.appendChild(text);

    pieChart.appendChild(path);
    pieChart.appendChild(text);
  };

  const getAngle = (percentage) => (360 * percentage) / 100;

  const drawChart = () => {
    let startAngle = 0;
    if (pieChart) {
      data.forEach((segment) => {
        const endAngle = startAngle + getAngle(segment.porcentaje);
        drawSegment(startAngle, endAngle, segment.color, segment.porcentaje, segment.nombre);
        startAngle = endAngle;
      });
    } else {
      console.error('El elemento #pieChart no se encontró en el DOM.');
    }
  };
  drawChart();
};
export default drawPieChart;
