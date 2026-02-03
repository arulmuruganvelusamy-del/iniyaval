/**
 * Heart Tree — Custom animated trees made of hearts
 * Trunks: intertwined heart shapes. Leaves: floating hearts that fall, sparkle, reform.
 * Sways with cursor/touch. No stock art.
 */

(function (global) {
  const TAU = Math.PI * 2;

  function heartPath(ctx, x, y, scale) {
    scale = scale || 1;
    ctx.beginPath();
    const top = y - 0.9 * scale;
    ctx.moveTo(x, top + 0.3 * scale);
    ctx.bezierCurveTo(x + 0.9 * scale, top - 0.4 * scale, x + 1.2 * scale, top + 0.6 * scale, x, top + 1.2 * scale);
    ctx.bezierCurveTo(x - 1.2 * scale, top + 0.6 * scale, x - 0.9 * scale, top - 0.4 * scale, x, top + 0.3 * scale);
    ctx.closePath();
  }

  function drawHeart(ctx, x, y, size, fill, glow) {
    ctx.save();
    if (glow) {
      ctx.shadowColor = fill;
      ctx.shadowBlur = 12 + size * 2;
    }
    heartPath(ctx, x, y, size);
    ctx.fillStyle = fill;
    ctx.fill();
    if (glow) ctx.shadowBlur = 0;
    ctx.restore();
  }

  function createTree(options) {
    const x = options.x ?? 0.5;
    const baseY = options.baseY ?? 1;
    const scale = options.scale ?? 0.08;
    const trunkHearts = [];
    const branches = [];
    const leafHearts = [];
    const sparkles = [];
    const w = options.width || 800;
    const h = options.height || 1200;
    const cx = x * w;
    const by = baseY * h;

    // Trunk: stacked hearts (tree built from hearts)
    const trunkHeartCount = 5;
    for (let i = 0; i < trunkHeartCount; i++) {
      const offset = (i % 2) * 14 - 7;
      trunkHearts.push({
        x: cx + offset,
        y: by - 35 - i * 22,
        size: 22 - i * 2,
        phase: i * 0.4,
      });
    }

    // Branch endpoints + branch hearts (branches made of small hearts)
    const branchCount = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < branchCount; i++) {
      const bx = cx + (Math.random() - 0.5) * 140;
      const by2 = by - 100 - Math.random() * 220;
      const branchHearts = [];
      const steps = 4 + Math.floor(Math.random() * 3);
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        branchHearts.push({
          x: cx + (bx - cx) * t + Math.sin(s) * 8,
          y: by - 60 + (by2 - (by - 60)) * t + Math.cos(s * 0.7) * 5,
          size: 6 - t * 3,
          phase: s * 0.5,
        });
      }
      branches.push({ x: bx, y: by2, phase: Math.random() * TAU, branchHearts });
    }

    // Leaf hearts on branches
    const leavesPerBranch = 4 + Math.floor(Math.random() * 4);
    branches.forEach((b) => {
      for (let j = 0; j < leavesPerBranch; j++) {
        leafHearts.push({
          branchX: b.x,
          branchY: b.y,
          phase: Math.random() * TAU,
          offsetX: (Math.random() - 0.5) * 40,
          offsetY: (Math.random() - 0.5) * 40,
          size: 4 + Math.random() * 5,
          fallProgress: Math.random(),
          fallDuration: 3 + Math.random() * 4,
          fallStart: Math.random() * 2,
          state: "attached",
          sparkleTime: 0,
          hue: 340 + Math.random() * 30,
        });
      }
    });

    return {
      cx,
      by,
      w,
      h,
      scale,
      trunkHearts,
      branches,
      leafHearts,
      sparkles,
      sway: 0,
      swayTarget: 0,
      mouseX: 0,
      mouseY: 0,
    };
  }

  function updateTree(tree, dt, mouseX, mouseY) {
    const w = tree.w;
    const h = tree.h;
    tree.mouseX = mouseX;
    tree.mouseY = mouseY;
    const dx = (mouseX / w - 0.5) * 2;
    tree.swayTarget = dx * 0.08;
    tree.sway += (tree.swayTarget - tree.sway) * 0.06;

    tree.leafHearts.forEach((leaf) => {
      leaf.phase += dt * 0.5;
      if (leaf.state === "attached") {
        leaf.fallStart -= dt;
        if (leaf.fallStart <= 0) leaf.state = "falling";
      } else if (leaf.state === "falling") {
        leaf.fallProgress += dt / leaf.fallDuration;
        if (leaf.fallProgress >= 1) {
          leaf.state = "sparkle";
          leaf.sparkleTime = 0;
          for (let s = 0; s < 8; s++) {
            tree.sparkles.push({
              x: leaf.branchX + leaf.offsetX + (Math.random() - 0.5) * 20,
              y: leaf.branchY + leaf.offsetY,
              vx: (Math.random() - 0.5) * 2,
              vy: -1 - Math.random() * 2,
              life: 0.4 + Math.random() * 0.4,
              size: 2 + Math.random() * 3,
              hue: leaf.hue,
            });
          }
        }
      } else if (leaf.state === "sparkle") {
        leaf.sparkleTime += dt;
        if (leaf.sparkleTime > 0.8) {
          leaf.state = "attached";
          leaf.fallProgress = 0;
          leaf.fallStart = 1 + Math.random() * 2;
        }
      }
    });

    tree.sparkles.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.life -= dt;
      s.vy += dt * 0.5;
    });
    tree.sparkles = tree.sparkles.filter((s) => s.life > 0);
  }

  function drawTree(ctx, tree, time) {
    const sway = tree.sway;
    const cx = tree.cx;
    const by = tree.by;

    ctx.save();
    ctx.translate(cx, by);
    ctx.rotate(sway);

    // Trunk (stacked hearts — tree built from hearts)
    const trunkFill = "rgba(200, 110, 130, 0.9)";
    const trunkStroke = "rgba(160, 80, 100, 0.5)";
    tree.trunkHearts.forEach((th) => {
      ctx.save();
      ctx.translate(th.x - cx, th.y - by);
      ctx.rotate(Math.sin(time * 0.25 + th.phase) * 0.03);
      heartPath(ctx, 0, 0, th.size);
      ctx.shadowColor = "rgba(240, 160, 180, 0.7)";
      ctx.shadowBlur = 18;
      ctx.fillStyle = trunkFill;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = trunkStroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    });

    // Branches (chains of small hearts)
    tree.branches.forEach((b) => {
      if (b.branchHearts) {
        b.branchHearts.forEach((bh, idx) => {
          const sway = Math.sin(time * 0.2 + b.phase + idx * 0.3) * 3;
          ctx.save();
          ctx.translate(bh.x - cx + sway, bh.y - by);
          const fill = `hsla(345, 55%, 72%, ${0.85 - idx * 0.08})`;
          drawHeart(ctx, 0, 0, Math.max(3, bh.size), fill, true);
          ctx.restore();
        });
      }
    });

    ctx.restore();

    // Leaf hearts (in world space for fall animation)
    tree.leafHearts.forEach((leaf) => {
      const bx = leaf.branchX + Math.sin(time * 0.25 + leaf.phase) * 4;
      const by2 = leaf.branchY;
      let lx, ly;
      if (leaf.state === "attached" || leaf.state === "sparkle") {
        lx = bx + leaf.offsetX + Math.sin(leaf.phase) * 3;
        ly = by2 + leaf.offsetY;
      } else {
        const t = leaf.fallProgress;
        const ease = 1 - Math.pow(1 - t, 1.5);
        const drift = Math.sin(leaf.phase + t * 4) * 8;
        lx = bx + leaf.offsetX + drift;
        ly = by2 + leaf.offsetY + ease * 180 + Math.sin(t * Math.PI) * 20;
      }
      if (leaf.state !== "sparkle" || leaf.sparkleTime < 0.3) {
        const alpha = leaf.state === "sparkle" ? 1 - leaf.sparkleTime / 0.8 : 1;
        const fill = `hsla(${leaf.hue}, 70%, 75%, ${alpha * 0.95})`;
        drawHeart(ctx, lx, ly, leaf.size, fill, true);
      }
    });

    // Sparkles
    tree.sparkles.forEach((s) => {
      const a = s.life;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, TAU);
      ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${a})`;
      ctx.shadowColor = `hsl(${s.hue}, 80%, 80%)`;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  global.HeartTree = {
    createTree,
    updateTree,
    drawTree,
    drawHeart,
    heartPath,
  };
})(typeof window !== "undefined" ? window : this);
