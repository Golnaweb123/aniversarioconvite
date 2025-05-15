const confetti = {
  particles: [],
  canvas: document.getElementById('confetti-canvas'),
  ctx: null,
  colors: ['#ff69b4', '#ffd700', '#00ffff', '#adff2f', '#ff4500', '#da70d6'],

  setup: function () {
    this.ctx = this.canvas.getContext('2d');
    this.setSize();
    window.addEventListener('resize', () => this.setSize());
    this.createParticles(250);
    this.animate();
  },

  setSize: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  createParticles: function (count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height - this.canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * count,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }
  },

  draw: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      this.ctx.beginPath();
      this.ctx.lineWidth = p.r;
      this.ctx.strokeStyle = p.color;
      this.ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      this.ctx.stroke();
    }
    this.update();
  },

  update: function () {
    let angle = 0.01;
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.tiltAngle += p.tiltAngleIncrement;
      p.y += (Math.cos(angle + p.d) + 3 + p.r / 2) / 2;
      p.x += Math.sin(angle);
      p.tilt = Math.sin(p.tiltAngle) * 15;

      if (p.y > this.canvas.height) {
        p.x = Math.random() * this.canvas.width;
        p.y = -20;
        p.tilt = Math.floor(Math.random() * 10) - 10;
      }
    }
  },

  animate: function () {
    requestAnimationFrame(() => this.animate());
    this.draw();
  }
};

window.onload = () => confetti.setup();
