/**
 * ⚡ MILENA IS 14! - JAVASCRIPT LOGIC & SUPERHERO SOUNDTRACK ENGINE
 * Features:
 * - Real-time Countdown Timer (22 Oct 2026 16:00)
 * - Epic Multi-Voice Superhero Soundtrack Synthesizer (Brass Lead, Hero Bass, Harmony & Beats)
 * - Interactive Click Onomatopoeias (POW!, BOOM!, ZAP!) with Sound FX
 * - WhatsApp RSVP & Native Share Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initSuperheroAudio();
  initOnomatopoeiaEffects();
  initShareFeature();
  initHapticAndButtonAnimations();
});

/* ==========================================================================
   1. CUENTA REGRESIVA EN TIEMPO REAL (22 OCTUBRE 2026 - 16:00 HRS)
   ========================================================================== */
function initCountdown() {
  // Fecha objetivo: 22 de Octubre de 2026 a las 16:00:00 hora local
  const targetDate = new Date(2026, 9, 22, 16, 0, 0).getTime(); // Mes 9 = Octubre (0-indexed)

  const elDays = document.getElementById('cdDays');
  const elHours = document.getElementById('cdHours');
  const elMinutes = document.getElementById('cdMinutes');
  const elSeconds = document.getElementById('cdSeconds');
  const elStatus = document.getElementById('countdownStatus');

  let prevSec = null;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMinutes) elMinutes.textContent = '00';
      if (elSeconds) elSeconds.textContent = '00';
      if (elStatus) {
        elStatus.innerHTML = '<span class="zap-badge">🎉</span><p class="status-msg">¡LA SUPER FIESTA DE MILENA HA COMENZADO!</p>';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (num) => String(num).padStart(2, '0');

    if (elDays) elDays.textContent = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMinutes) elMinutes.textContent = pad(minutes);
    if (elSeconds) {
      elSeconds.textContent = pad(seconds);
      if (prevSec !== seconds) {
        elSeconds.style.transform = 'scale(1.15)';
        setTimeout(() => {
          if (elSeconds) elSeconds.style.transform = 'scale(1)';
        }, 150);
        prevSec = seconds;
      }
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. REPRODUCTOR DE MÚSICA & SINTETIZADOR SUPERHEROICO (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let masterGain = null;
let isMusicPlaying = false;
let musicTimer = null;
let currentBar = 0;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.55, audioCtx.currentTime); // Volumen óptimo
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function initSuperheroAudio() {
  const musicBtn = document.getElementById('musicToggleBtn');
  const musicTooltip = document.getElementById('musicStatusText');
  const speakerIcon = document.getElementById('speakerIcon');

  if (!musicBtn) return;

  // Desbloquear audio en el primer toque de la pantalla (política de autoplay móvil)
  const unlockAudio = () => {
    getAudioContext();
    document.removeEventListener('touchstart', unlockAudio);
    document.removeEventListener('pointerdown', unlockAudio);
  };
  document.addEventListener('touchstart', unlockAudio, { passive: true });
  document.addEventListener('pointerdown', unlockAudio, { passive: true });

  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  function toggleMusic() {
    const ctx = getAudioContext();
    if (!ctx) {
      showComicToast('⚠️ Tu navegador no soporta Web Audio');
      return;
    }

    if (isMusicPlaying) {
      stopSuperheroMusic();
      isMusicPlaying = false;
      musicBtn.classList.remove('is-playing');
      if (speakerIcon) speakerIcon.textContent = '🔈';
      if (musicTooltip) musicTooltip.textContent = '🎵 ¡Toca para música!';
      showComicToast('🔇 Música Pausada');
    } else {
      isMusicPlaying = true;
      musicBtn.classList.add('is-playing');
      if (speakerIcon) speakerIcon.textContent = '🔊';
      if (musicTooltip) musicTooltip.textContent = '💥 ¡Sonando Épico!';
      showComicToast('⚡ ¡Música Superheroica Activada!');
      startSuperheroMusicLoop();
    }
  }
}

/**
 * TEMA MUSICAL SUPERHEROICO ÉPICO
 * Estilo Fanfarria de Superhéroes / Avengers / Marvel Comics
 */
function startSuperheroMusicLoop() {
  if (!isMusicPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const tempo = 132; // BPM enérgico
  const stepTime = (60 / tempo) / 4; // semicorchea

  // Frecuencias de notas
  const N = {
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'C6': 1046.50,
    '_': 0
  };

  // Patrón de 32 pasos (2 compases) de fanfarria heroica
  const patternLead = [
    'C4','_','_','C4', 'G4','_','_','G4', 'C5','_','_','C5', 'E5','_','D5','_',
    'C5','_','_','C5', 'G4','_','A4','_', 'C5','_','_','_', 'G5','_','_','_',
    'A4','_','_','A4', 'C5','_','_','C5', 'F5','_','_','E5', 'D5','_','C5','_',
    'D5','_','_','D5', 'G4','_','_','G4', 'C5','_','_','_', '_','_','_','_'
  ];

  const patternBass = [
    'C3','C3','C3','C3', 'C3','C3','C3','C3', 'G3','G3','G3','G3', 'G3','G3','G3','G3',
    'A3','A3','A3','A3', 'A3','A3','A3','A3', 'F3','F3','F3','F3', 'G3','G3','G3','G3',
    'F3','F3','F3','F3', 'F3','F3','F3','F3', 'C3','C3','C3','C3', 'C3','C3','C3','C3',
    'G3','G3','G3','G3', 'G3','G3','G3','G3', 'C3','C3','C3','C3', 'C3','C3','C3','C3'
  ];

  let step = 0;

  function tick() {
    if (!isMusicPlaying || !audioCtx) return;

    const leadNote = patternLead[step % patternLead.length];
    const bassNote = patternBass[step % patternBass.length];

    // 1. Tocar Lead de Trompeta/Sintetizador Heroico
    if (leadNote !== '_' && N[leadNote]) {
      playHeroLead(N[leadNote], stepTime * 2.2);
    }

    // 2. Tocar Bajo Pulsante
    if (bassNote !== '_' && N[bassNote]) {
      playHeroBass(N[bassNote], stepTime * 1.5);
    }

    // 3. Percusión Superheroica (Kick en 0, 8, 16, 24; Snare en 4, 12, 20, 28)
    const beatInBar = step % 16;
    if (beatInBar === 0 || beatInBar === 8) {
      playHeroKick();
    } else if (beatInBar === 4 || beatInBar === 12) {
      playHeroSnare();
    }

    step++;
    musicTimer = setTimeout(tick, stepTime * 1000);
  }

  tick();
}

function stopSuperheroMusic() {
  if (musicTimer) {
    clearTimeout(musicTimer);
    musicTimer = null;
  }
}

/**
 * Voz Principal: Trompeta/Brass Heroico con doble oscilador
 */
function playHeroLead(freq, dur) {
  try {
    if (!audioCtx || !masterGain) return;
    const now = audioCtx.currentTime;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 1.004, now); // Ligero detune para efecto épico

    // Filtro pasa-bajos con brillo inicial de metal/bronce
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(1000, now + dur);

    // Envolvente de volumen con ataque rápido y sustain
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.28, now + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + dur);
    osc2.stop(now + dur);
  } catch (e) {}
}

/**
 * Voz del Bajo Heroico
 */
function playHeroBass(freq, dur) {
  try {
    if (!audioCtx || !masterGain) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const bassGain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    bassGain.gain.setValueAtTime(0.35, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(bassGain);
    bassGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + dur);
  } catch (e) {}
}

/**
 * Batería / Bombo Heroico
 */
function playHeroKick() {
  try {
    if (!audioCtx || !masterGain) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const kickGain = audioCtx.createGain();

    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

    kickGain.gain.setValueAtTime(0.4, now);
    kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(kickGain);
    kickGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {}
}

/**
 * Redoblante / Snare
 */
function playHeroSnare() {
  try {
    if (!audioCtx || !masterGain) return;
    const now = audioCtx.currentTime;

    // Ruido sintético para el redoblante
    const osc = audioCtx.createOscillator();
    const snareGain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);

    snareGain.gain.setValueAtTime(0.25, now);
    snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(snareGain);
    snareGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {}
}

/* ==========================================================================
   3. EFECTOS INTERACTIVOS ON-CLICK (ONOMATOPEYAS CÓMIC: POW!, BOOM!)
   ========================================================================== */
function initOnomatopoeiaEffects() {
  const container = document.getElementById('onomatopoeiaContainer');
  if (!container) return;

  const comicWords = [
    { text: 'POW!', bg: '#FF3131', color: '#FFDE59' },
    { text: 'BOOM!', bg: '#9D00FF', color: '#FFFFFF' },
    { text: 'ZAP!', bg: '#00C2FF', color: '#FFFFFF' },
    { text: 'BAM!', bg: '#FF8800', color: '#FFFFFF' },
    { text: 'SUPER 14!', bg: '#FFDE59', color: '#FF3131' },
    { text: 'KABOOM!', bg: '#FF3131', color: '#FFFFFF' },
    { text: 'EPIC!', bg: '#00E676', color: '#121212' },
    { text: 'HERO!', bg: '#00C2FF', color: '#FFDE59' }
  ];

  let lastClickTime = 0;

  document.addEventListener('pointerdown', (e) => {
    // Evitar disparos múltiples en corto lapso
    const now = Date.now();
    if (now - lastClickTime < 160) return;
    lastClickTime = now;

    // No generar sobre el botón de música
    if (e.target.closest('#musicContainer') || e.target.closest('#musicToggleBtn')) return;

    spawnComicWord(e.clientX, e.clientY);
    playMiniComicSound();
  });

  function spawnComicWord(x, y) {
    const item = comicWords[Math.floor(Math.random() * comicWords.length)];
    const el = document.createElement('div');
    el.className = 'comic-burst-float';
    el.textContent = item.text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.backgroundColor = item.bg;
    el.style.color = item.color;

    // Rotaciones dinámicas aleatorias
    const rotStart = (Math.random() * 30 - 15) + 'deg';
    const rotMid = (Math.random() * 40 - 20) + 'deg';
    const rotEnd = (Math.random() * 50 - 25) + 'deg';

    el.style.setProperty('--rot-start', rotStart);
    el.style.setProperty('--rot-mid', rotMid);
    el.style.setProperty('--rot-end', rotEnd);

    container.appendChild(el);

    setTimeout(() => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 950);
  }
}

function playMiniComicSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || !masterGain) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freqs = [523.25, 659.25, 783.99, 1046.50];
    const randFreq = freqs[Math.floor(Math.random() * freqs.length)];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(randFreq, now);
    osc.frequency.exponentialRampToValueAtTime(randFreq * 1.6, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {}
}

/* ==========================================================================
   4. FUNCIÓN COMPARTIR INVITACIÓN & COPIAR ENLACE
   ========================================================================== */
function initShareFeature() {
  const shareBtn = document.getElementById('shareInviteBtn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const shareData = {
      title: '⚡ ¡MILENA IS 14! - Super Fiesta de Cumpleaños',
      text: '¡Estás invitado a la fiesta de 14 años de Milena! Temática Cómic de Superhéroes. ¡Ven disfrazado el 22 de Octubre!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard(window.location.href);
      }
    } else {
      copyToClipboard(window.location.href);
    }
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showComicToast('📋 ¡Enlace copiado al portapapeles!');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showComicToast('📋 ¡Enlace copiado al portapapeles!');
  } catch (err) {
    showComicToast('⚡ ¡Comparte este enlace con tus amigos!');
  }
  document.body.removeChild(tempInput);
}

/* ==========================================================================
   5. NOTIFICACIONES TOAST ESTILO CÓMIC
   ========================================================================== */
let toastTimeout = null;

function showComicToast(msg) {
  const toast = document.getElementById('comicToast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

/* ==========================================================================
   6. MICRO-ANIMACIONES Y FEEDBACK HÁPTICO
   ========================================================================== */
function initHapticAndButtonAnimations() {
  const buttons = document.querySelectorAll('.comic-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    });
  });
}
