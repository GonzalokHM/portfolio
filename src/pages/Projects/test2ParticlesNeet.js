ParticleNetwork.prototype.createProjectParticles = function () {
  const projectParticles = [];
  const numProjectParticles = proyectos.length; // 'proyectos' es la lista de tus proyectos

  // Tamaño y radio de las partículas-proyecto (ajústalos según tus preferencias)
  const projectParticleRadius = 20;

  // Distribuye las partículas-proyecto aleatoriamente sin superponerse
  for (let i = 0; i < numProjectParticles; i++) {
    let isOverlapping = false;
    let projectParticle;

    do {
      isOverlapping = false;
      // Genera una posición aleatoria dentro del contenedor
      const x = getLimitedRandom(0, this.canvas.width - projectParticleRadius * 2, true);
      const y = getLimitedRandom(0, this.canvas.height - projectParticleRadius * 2, true);

      // Crea la partícula-proyecto en la posición generada
      projectParticle = new Particle(this, x, y, true, proyectos[i]);

      // Verifica si se superpone con otras partículas-proyecto
      for (const existingParticle of projectParticles) {
        const distance = Math.sqrt(
          Math.pow(x - existingParticle.x, 2) + Math.pow(y - existingParticle.y, 2)
        );
        if (distance < projectParticleRadius * 2) {
          isOverlapping = true;
          break;
        }
      }
    } while (isOverlapping);

    // Agrega la partícula-proyecto al arreglo
    projectParticles.push(projectParticle);
  }

  // Ahora 'projectParticles' contiene todas las partículas-proyecto distribuidas aleatoriamente
  return projectParticles;
};
