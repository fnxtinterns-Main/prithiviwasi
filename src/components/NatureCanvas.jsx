import React, { useEffect, useRef } from 'react';

/**
 * NatureCanvas component
 * Recreates the subtle floating leaves & spores ambient canvas effect.
 * Features natural wind oscillation, gentle upward drift, and mouse/touch repulsion.
 */
export default function NatureCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const isMobile = width < 768;
    const TOTAL_LEAVES = isMobile ? 12 : Math.min(24, Math.floor(width / 60));
    const TOTAL_SPORES = isMobile ? 14 : Math.min(28, Math.floor(width / 45));

    const leafColors = [
      { fill: 'rgba(34, 197, 94, 0.40)', stroke: 'rgba(21, 128, 61, 0.50)' },
      { fill: 'rgba(74, 222, 128, 0.35)', stroke: 'rgba(34, 197, 94, 0.45)' },
      { fill: 'rgba(251, 146, 60, 0.35)', stroke: 'rgba(234, 88, 12, 0.45)' },
      { fill: 'rgba(249, 115, 22, 0.32)', stroke: 'rgba(234, 88, 12, 0.42)' }
    ];

    class Particle {
      constructor(isLeaf = false) {
        this.isLeaf = isLeaf;
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 30;
        this.size = this.isLeaf
          ? Math.random() * 11 + 7
          : Math.random() * 2.8 + 1.2;
        this.speedY = -(Math.random() * 0.45 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.025;
        this.oscillation = Math.random() * Math.PI * 2;
        this.oscillationSpeed = Math.random() * 0.02 + 0.01;
        this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
      }

      update() {
        this.y += this.speedY;
        this.oscillation += this.oscillationSpeed;
        this.x += this.speedX + Math.sin(this.oscillation) * 0.6;
        this.angle += this.rotationSpeed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }

        if (this.y < -40 || this.x < -40 || this.x > width + 40) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.isLeaf) {
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.bezierCurveTo(
            this.size * 0.75,
            -this.size * 0.4,
            this.size * 0.75,
            this.size * 0.4,
            0,
            this.size
          );
          ctx.bezierCurveTo(
            -this.size * 0.75,
            this.size * 0.4,
            -this.size * 0.75,
            -this.size * 0.4,
            0,
            -this.size
          );
          ctx.fillStyle = this.color.fill;
          ctx.fill();
          ctx.strokeStyle = this.color.stroke;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color.fill;
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const particles = [];
    for (let i = 0; i < TOTAL_LEAVES; i++) particles.push(new Particle(true));
    for (let i = 0; i < TOTAL_SPORES; i++) particles.push(new Particle(false));

    function renderLeaves() {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(renderLeaves);
    }

    renderLeaves();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="natureCanvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
        opacity: 0.9
      }}
    />
  );
}
