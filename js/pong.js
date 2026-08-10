(function () {
  'use strict';

  const overlay = document.querySelector('#pongGame');
  if (!overlay) return;

  const canvas = document.querySelector('#pongCanvas');
  const context = canvas.getContext('2d');
  const stage = overlay.querySelector('.pong-stage');
  const seed = document.querySelector('#pongCursorSeed');
  const playerScoreNode = document.querySelector('#pongPlayerScore');
  const aiScoreNode = document.querySelector('#pongAiScore');
  const result = document.querySelector('#pongResult');
  const resultTitle = document.querySelector('#pongResultTitle');
  const restartButton = document.querySelector('#pongRestart');
  const exitButton = document.querySelector('#pongExit');
  const resultExitButton = document.querySelector('#pongResultExit');
  const pageElements = Array.from(document.querySelectorAll('body > .site-header, body > .company-header, body > main, body > .site-footer, body > .company-footer, body > .cursor-glow'));
  const gameUi = Array.from(overlay.querySelectorAll('.pong-scoreboard, .pong-title, .pong-instructions, .pong-exit'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const keys = new Set();
  const tapState = new WeakMap();
  let transition = null;
  let activationTrigger = null;
  let animationFrame = null;
  let hintTimeline = null;
  let hintRefreshFrame = null;
  let hintResizeObserver = null;

  const state = {
    active: false,
    exiting: false,
    running: false,
    matchOver: false,
    width: 0,
    height: 0,
    dpr: 1,
    paddleWidth: 8,
    paddleHeight: 100,
    playerX: 0,
    aiX: 0,
    playerY: 0,
    aiY: 0,
    playerScore: 0,
    aiScore: 0,
    ball: { x: 0, y: 0, radius: 8, vx: 0, vy: 0 },
    trail: [],
    serveDelay: 0,
    lastTime: 0
  };

  function updateEasterHintGeometry() {
    const hint = document.querySelector('.easter-hint');
    const copy = hint && hint.querySelector('.easter-hint-copy');
    const arrow = hint && hint.querySelector('.easter-hint-arrow');
    const curve = arrow && arrow.querySelector('.easter-hint-curve');
    const head = arrow && arrow.querySelector('.easter-hint-head');
    const anchor = hint && hint.closest('.contact-cursor-anchor');
    const cursor = anchor && anchor.querySelector('.contact-cursor');
    if (!hint || !copy || !curve || !head || !cursor) return;

    if (window.gsap) window.gsap.set(hint, { y: 0 });
    const hintRect = hint.getBoundingClientRect();
    const copyRect = copy.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();
    const cursorCenterX = cursorRect.left + (cursorRect.width / 2);
    const copyCenterX = copyRect.left + (copyRect.width / 2);
    const arrowGap = 7;
    const targetViewportX = copyCenterX >= cursorCenterX
      ? cursorRect.right + arrowGap
      : cursorRect.left - arrowGap;
    const targetX = targetViewportX - hintRect.left;
    const targetY = cursorRect.top + (cursorRect.height / 2) - hintRect.top;
    const cursorIsLeft = targetX < (hintRect.width / 2);
    const startX = cursorIsLeft
      ? copyRect.left - hintRect.left + 3
      : copyRect.right - hintRect.left - 3;
    const startY = copyRect.top - hintRect.top - 5;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const controlOneX = startX + (dx * 0.26);
    const controlOneY = startY + (dy * 0.04);
    const controlTwoX = targetX - (dx * 0.22);
    const controlTwoY = targetY - (dy * 0.24);

    curve.setAttribute('d', `M ${startX.toFixed(2)} ${startY.toFixed(2)} C ${controlOneX.toFixed(2)} ${controlOneY.toFixed(2)} ${controlTwoX.toFixed(2)} ${controlTwoY.toFixed(2)} ${targetX.toFixed(2)} ${targetY.toFixed(2)}`);

    const vectorX = targetX - controlTwoX;
    const vectorY = targetY - controlTwoY;
    const vectorLength = Math.max(1, Math.hypot(vectorX, vectorY));
    const unitX = vectorX / vectorLength;
    const unitY = vectorY / vectorLength;
    const arrowLength = 11;
    const arrowWidth = 5.5;
    const baseX = targetX - (unitX * arrowLength);
    const baseY = targetY - (unitY * arrowLength);
    const perpendicularX = -unitY * arrowWidth;
    const perpendicularY = unitX * arrowWidth;
    head.setAttribute('d', `M ${(baseX + perpendicularX).toFixed(2)} ${(baseY + perpendicularY).toFixed(2)} L ${targetX.toFixed(2)} ${targetY.toFixed(2)} L ${(baseX - perpendicularX).toFixed(2)} ${(baseY - perpendicularY).toFixed(2)}`);
  }

  function refreshEasterHint() {
    if (hintRefreshFrame) window.cancelAnimationFrame(hintRefreshFrame);
    hintRefreshFrame = window.requestAnimationFrame(() => {
      hintRefreshFrame = null;
      if (hintTimeline) hintTimeline.kill();
      updateEasterHintGeometry();
      setupEasterHint();
    });
  }

  function initializeEasterHint() {
    refreshEasterHint();
    const hint = document.querySelector('.easter-hint');
    const copy = hint && hint.querySelector('.easter-hint-copy');
    const title = hint && hint.closest('h2');
    if (window.ResizeObserver && title && copy) {
      hintResizeObserver = new ResizeObserver(refreshEasterHint);
      hintResizeObserver.observe(title);
      hintResizeObserver.observe(copy);
    }
    if (window.MutationObserver && copy) {
      const observer = new MutationObserver(refreshEasterHint);
      observer.observe(copy, { childList: true, characterData: true, subtree: true });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshEasterHint);
  }

  function setupEasterHint() {
    const hint = document.querySelector('.easter-hint');
    const copy = hint && hint.querySelector('.easter-hint-copy');
    const strokes = hint ? Array.from(hint.querySelectorAll('path')) : [];
    if (!hint || !copy || !strokes.length) return;
    if (hintTimeline) hintTimeline.kill();

    if (!window.gsap || reducedMotion.matches) {
      hint.style.opacity = '1';
      hint.style.visibility = 'visible';
      copy.style.clipPath = 'inset(0 0 0 0)';
      strokes.forEach((stroke) => {
        stroke.style.strokeDasharray = 'none';
        stroke.style.strokeDashoffset = '0';
      });
      return;
    }

    const strokeLengths = strokes.map((stroke) => Math.ceil(stroke.getTotalLength()));
    strokes.forEach((stroke, index) => {
      window.gsap.set(stroke, {
        strokeDasharray: strokeLengths[index],
        strokeDashoffset: strokeLengths[index]
      });
    });
    window.gsap.set(hint, { autoAlpha: 0, y: 4 });
    window.gsap.set(copy, { clipPath: 'inset(0 100% 0 0)' });
    hintTimeline = window.gsap.timeline({ repeat: -1, repeatDelay: 0.55, delay: 1.4 })
      .to(hint, { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power2.out' })
      .to(copy, { clipPath: 'inset(0 0% 0 0)', duration: 1.15, ease: 'steps(16)' })
      .to(strokes, { strokeDashoffset: 0, duration: 0.72, stagger: 0.13, ease: 'power1.inOut' }, '-=0.46')
      .to({}, { duration: 1.75 })
      .to(hint, { autoAlpha: 0, y: -6, duration: 0.48, ease: 'power2.in' })
      .set(copy, { clipPath: 'inset(0 100% 0 0)' })
      .set(strokes, { strokeDashoffset: (index) => strokeLengths[index] })
      .set(hint, { y: 4 });
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function updateScore() {
    playerScoreNode.textContent = String(state.playerScore).padStart(2, '0');
    aiScoreNode.textContent = String(state.aiScore).padStart(2, '0');
  }

  function resizeGame() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.paddleWidth = clamp(state.width * 0.012, 7, 11);
    state.paddleHeight = clamp(state.height * 0.17, 72, 124);
    state.playerX = clamp(state.width * 0.045, 20, 64);
    state.aiX = state.width - state.playerX - state.paddleWidth;
    state.playerY = clamp(state.playerY || ((state.height - state.paddleHeight) / 2), 0, state.height - state.paddleHeight);
    state.aiY = clamp(state.aiY || ((state.height - state.paddleHeight) / 2), 0, state.height - state.paddleHeight);
    state.ball.radius = clamp(Math.min(state.width, state.height) * 0.012, 6, 10);
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  }

  function resetBall(direction = Math.random() > 0.5 ? 1 : -1) {
    const speed = clamp(state.width * 0.34, 300, 470);
    const angle = (Math.random() * 0.72) - 0.36;
    state.ball.x = state.width / 2;
    state.ball.y = state.height / 2;
    state.ball.vx = Math.cos(angle) * speed * direction;
    state.ball.vy = Math.sin(angle) * speed;
    state.trail = [];
    state.serveDelay = 0.62;
  }

  function restartMatch() {
    state.playerScore = 0;
    state.aiScore = 0;
    state.matchOver = false;
    result.classList.remove('is-visible');
    result.setAttribute('aria-hidden', 'true');
    updateScore();
    resetBall();
    exitButton.focus({ preventScroll: true });
  }

  function finishMatch(playerWon) {
    state.matchOver = true;
    resultTitle.textContent = document.querySelector(playerWon ? '#pongWinCopy' : '#pongLoseCopy').textContent;
    result.classList.add('is-visible');
    result.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => restartButton.focus({ preventScroll: true }), 260);
  }

  function scorePoint(playerScored) {
    if (playerScored) state.playerScore += 1;
    else state.aiScore += 1;
    updateScore();
    if (state.playerScore >= 5 || state.aiScore >= 5) {
      finishMatch(state.playerScore > state.aiScore);
      return;
    }
    resetBall(playerScored ? -1 : 1);
  }

  function movePlayer(clientY) {
    if (!state.active || state.matchOver) return;
    state.playerY = clamp(clientY - (state.paddleHeight / 2), 0, state.height - state.paddleHeight);
  }

  function update(delta) {
    const keyboardSpeed = state.height * 0.72;
    if (keys.has('ArrowUp') || keys.has('KeyW')) state.playerY -= keyboardSpeed * delta;
    if (keys.has('ArrowDown') || keys.has('KeyS')) state.playerY += keyboardSpeed * delta;
    state.playerY = clamp(state.playerY, 0, state.height - state.paddleHeight);

    const aiTarget = state.ball.vx > 0 ? state.ball.y - (state.paddleHeight / 2) : (state.height - state.paddleHeight) / 2;
    const aiSpeed = clamp(state.height * 0.42, 260, 430) * delta;
    state.aiY += clamp(aiTarget - state.aiY, -aiSpeed, aiSpeed);
    state.aiY = clamp(state.aiY, 0, state.height - state.paddleHeight);

    if (state.matchOver) return;
    if (state.serveDelay > 0) {
      state.serveDelay -= delta;
      return;
    }

    const ball = state.ball;
    state.trail.unshift({ x: ball.x, y: ball.y });
    if (state.trail.length > 10) state.trail.pop();
    ball.x += ball.vx * delta;
    ball.y += ball.vy * delta;

    if (ball.y - ball.radius <= 0 && ball.vy < 0) {
      ball.y = ball.radius;
      ball.vy *= -1;
    }
    if (ball.y + ball.radius >= state.height && ball.vy > 0) {
      ball.y = state.height - ball.radius;
      ball.vy *= -1;
    }

    const playerHit = ball.vx < 0
      && ball.x - ball.radius <= state.playerX + state.paddleWidth
      && ball.x + ball.radius >= state.playerX
      && ball.y >= state.playerY - ball.radius
      && ball.y <= state.playerY + state.paddleHeight + ball.radius;
    if (playerHit) {
      const impact = clamp((ball.y - (state.playerY + (state.paddleHeight / 2))) / (state.paddleHeight / 2), -1, 1);
      const speed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.045, 720);
      ball.x = state.playerX + state.paddleWidth + ball.radius;
      ball.vx = Math.cos(impact * 0.78) * speed;
      ball.vy = Math.sin(impact * 0.78) * speed;
    }

    const aiHit = ball.vx > 0
      && ball.x + ball.radius >= state.aiX
      && ball.x - ball.radius <= state.aiX + state.paddleWidth
      && ball.y >= state.aiY - ball.radius
      && ball.y <= state.aiY + state.paddleHeight + ball.radius;
    if (aiHit) {
      const impact = clamp((ball.y - (state.aiY + (state.paddleHeight / 2))) / (state.paddleHeight / 2), -1, 1);
      const speed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.035, 700);
      ball.x = state.aiX - ball.radius;
      ball.vx = -Math.cos(impact * 0.72) * speed;
      ball.vy = Math.sin(impact * 0.72) * speed;
    }

    if (ball.x + ball.radius < 0) scorePoint(false);
    else if (ball.x - ball.radius > state.width) scorePoint(true);
  }

  function draw() {
    context.clearRect(0, 0, state.width, state.height);
    context.save();
    context.strokeStyle = 'rgba(242, 247, 242, 0.18)';
    context.lineWidth = 1;
    context.setLineDash([8, 14]);
    context.beginPath();
    context.moveTo(state.width / 2, 0);
    context.lineTo(state.width / 2, state.height);
    context.stroke();
    context.setLineDash([]);

    context.shadowColor = 'rgba(34, 197, 94, 0.72)';
    context.shadowBlur = 18;
    context.fillStyle = '#22c55e';
    context.fillRect(state.playerX, state.playerY, state.paddleWidth, state.paddleHeight);
    context.shadowColor = 'rgba(242, 247, 242, 0.35)';
    context.shadowBlur = 10;
    context.fillStyle = 'rgba(242, 247, 242, 0.82)';
    context.fillRect(state.aiX, state.aiY, state.paddleWidth, state.paddleHeight);

    state.trail.forEach((point, index) => {
      const alpha = (1 - (index / state.trail.length)) * 0.18;
      context.beginPath();
      context.fillStyle = `rgba(34, 197, 94, ${alpha})`;
      context.arc(point.x, point.y, Math.max(1, state.ball.radius * (1 - (index / 12))), 0, Math.PI * 2);
      context.fill();
    });
    context.shadowColor = 'rgba(34, 197, 94, 0.8)';
    context.shadowBlur = 16;
    context.fillStyle = '#f2f7f2';
    context.beginPath();
    context.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function frame(time) {
    if (!state.running) return;
    const delta = Math.min((time - state.lastTime) / 1000, 0.035) || 0;
    state.lastTime = time;
    update(delta);
    draw();
    animationFrame = window.requestAnimationFrame(frame);
  }

  function startGame() {
    resizeGame();
    state.playerY = (state.height - state.paddleHeight) / 2;
    state.aiY = (state.height - state.paddleHeight) / 2;
    restartMatch();
    state.running = true;
    state.lastTime = performance.now();
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(frame);
  }

  function cleanExit() {
    document.body.classList.remove('pong-active', 'pong-transitioning');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.removeProperty('visibility');
    overlay.style.removeProperty('opacity');
    overlay.style.removeProperty('pointer-events');
    stage.style.removeProperty('opacity');
    seed.removeAttribute('style');
    if (window.gsap) window.gsap.set(pageElements, { clearProps: 'opacity,transform' });
    else pageElements.forEach((element) => {
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
    });
    state.exiting = false;
    result.classList.remove('is-visible');
    result.setAttribute('aria-hidden', 'true');
    keys.clear();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  function exitGame() {
    if (!state.active || state.exiting) return;
    state.exiting = true;
    state.active = false;
    state.running = false;
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    if (transition) transition.kill();
    if (window.gsap && !reducedMotion.matches) {
      transition = window.gsap.timeline({ onComplete: cleanExit })
        .to(stage, { opacity: 0, duration: 0.26, ease: 'power2.in' })
        .to(overlay, { opacity: 0, duration: 0.38, ease: 'power2.inOut' }, '<0.08')
        .to(pageElements, { opacity: 1, y: 0, duration: 0.46, stagger: 0.025, ease: 'power2.out' }, '<');
    } else {
      cleanExit();
    }
  }

  function enterGame(trigger) {
    if (state.active || state.exiting) return;
    state.active = true;
    activationTrigger = trigger;
    resizeGame();
    const triggerRect = trigger.getBoundingClientRect();
    const triggerStyle = window.getComputedStyle(trigger);
    const targetTop = (state.height - state.paddleHeight) / 2;
    document.body.classList.add('pong-active', 'pong-transitioning');
    overlay.setAttribute('aria-hidden', 'false');
    result.classList.remove('is-visible');
    seed.style.background = triggerStyle.backgroundColor || '#22c55e';

    if (transition) transition.kill();
    if (window.gsap && !reducedMotion.matches) {
      transition = window.gsap.timeline()
        .set(overlay, { visibility: 'visible', pointerEvents: 'auto', opacity: 0 })
        .set(stage, { opacity: 1 })
        .set([canvas, overlay.querySelector('.pong-grid')], { opacity: 0 })
        .set(gameUi, { opacity: 0, y: 10 })
        .set(seed, { left: triggerRect.left, top: triggerRect.top, width: Math.max(triggerRect.width, 5), height: Math.max(triggerRect.height, 12), opacity: 1 })
        .to(pageElements, { opacity: 0, y: -18, duration: 0.48, stagger: 0.025, ease: 'power2.in' })
        .to(overlay, { opacity: 1, duration: 0.42, ease: 'power2.out' }, '<')
        .to(seed, { left: state.playerX, top: targetTop, width: state.paddleWidth, height: state.paddleHeight, duration: 0.78, ease: 'power3.inOut' }, '-=0.05')
        .call(startGame)
        .to([canvas, overlay.querySelector('.pong-grid')], { opacity: 1, duration: 0.46, ease: 'power2.out' })
        .to(gameUi, { opacity: 1, y: 0, duration: 0.38, stagger: 0.07, ease: 'power2.out' }, '<0.08')
        .to(seed, { opacity: 0, duration: 0.2 }, '<')
        .call(() => {
          document.body.classList.remove('pong-transitioning');
          exitButton.focus({ preventScroll: true });
        });
    } else {
      overlay.style.visibility = 'visible';
      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';
      stage.style.opacity = '1';
      pageElements.forEach((element) => { element.style.opacity = '0'; });
      seed.style.opacity = '0';
      startGame();
      document.body.classList.remove('pong-transitioning');
      exitButton.focus({ preventScroll: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEasterHint, { once: true });
  } else {
    initializeEasterHint();
  }

  document.querySelectorAll('.terminal-cursor').forEach((trigger) => {
    trigger.addEventListener('pointerup', (event) => {
      if (!event.isPrimary) return;
      const now = performance.now();
      const previous = tapState.get(trigger) || { count: 0, first: now, last: 0 };
      if (now - previous.last > 520 || now - previous.first > 1050) {
        previous.count = 0;
        previous.first = now;
      }
      previous.count += 1;
      previous.last = now;
      tapState.set(trigger, previous);
      if (previous.count < 3) return;
      event.preventDefault();
      tapState.set(trigger, { count: 0, first: now, last: now });
      enterGame(trigger);
    });
  });

  overlay.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    movePlayer(event.clientY);
  });
  overlay.addEventListener('pointermove', (event) => {
    if (event.target.closest('button')) return;
    movePlayer(event.clientY);
  });
  overlay.addEventListener('touchmove', (event) => {
    if (!state.active || !event.touches[0]) return;
    event.preventDefault();
    movePlayer(event.touches[0].clientY);
  }, { passive: false });

  window.addEventListener('keydown', (event) => {
    if (!state.active) return;
    if (event.code === 'Escape') {
      event.preventDefault();
      exitGame();
      return;
    }
    if (event.code === 'Enter' && state.matchOver) {
      event.preventDefault();
      restartMatch();
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'KeyW', 'KeyS'].includes(event.code)) {
      event.preventDefault();
      keys.add(event.code);
    }
  });
  window.addEventListener('keyup', (event) => keys.delete(event.code));
  window.addEventListener('resize', () => {
    if (state.active) resizeGame();
    else refreshEasterHint();
  });
  document.addEventListener('visibilitychange', () => {
    if (!state.active) return;
    state.lastTime = performance.now();
  });

  restartButton.addEventListener('click', restartMatch);
  exitButton.addEventListener('click', exitGame);
  resultExitButton.addEventListener('click', exitGame);
}());
