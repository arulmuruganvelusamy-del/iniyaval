/**
 * Floating hearts, sparkles, and cursor/touch trails
 */

(function (global) {
  const TAU = Math.PI * 2;

  function createFloatingHearts(count, w, h) {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 3 + Math.random() * 6,
        speed: 0.2 + Math.random() * 0.4,
        phase: Math.random() * TAU,
        hue: 340 + Math.random() * 25,
        drift: (Math.random() - 0.5) * 0.3,
      });
    }
    return list;
  }

  function updateFloatingHearts(list, dt, w, h) {
    list.forEach((p) => {
      p.y -= p.speed;
      p.x += Math.sin(p.phase) * p.drift;
      p.phase += dt * 0.8;
      if (p.y < -20) {
        p.y = h + 20;
        p.x = Math.random() * w;
      }
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
    });
  }

  function drawFloatingHearts(ctx, list) {
    list.forEach((p) => {
      HeartTree.drawHeart(ctx, p.x, p.y, p.size, `hsla(${p.hue}, 75%, 80%, 0.6)`, true);
    });
  }

  function createTrail() {
    return { points: [], maxLen: 25 };
  }

  function addTrailPoint(trail, x, y) {
    trail.points.unshift({ x, y, life: 1 });
    if (trail.points.length > trail.maxLen) trail.points.pop();
  }

  function updateTrail(trail, dt) {
    trail.points.forEach((p) => (p.life -= dt * 1.2));
    trail.points = trail.points.filter((p) => p.life > 0);
  }

  function drawTrail(ctx, trail) {
    if (trail.points.length < 2) return;
    ctx.strokeStyle = "rgba(255, 180, 200, 0.5)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trail.points[0].x, trail.points[0].y);
    trail.points.forEach((p, i) => {
      if (i === 0) return;
      ctx.globalAlpha = p.life;
      ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  global.Particles = {
    createFloatingHearts,
    updateFloatingHearts,
    drawFloatingHearts,
    createTrail,
    addTrailPoint,
    updateTrail,
    drawTrail,
  };
})(typeof window !== "undefined" ? window : this);
