/**
 * ⚡ MILENA IS 14! - JAVASCRIPT LOGIC & AUDIO SYNTHESIZER
 * Features:
 * - Real-time Countdown Timer (22 Oct 2026 16:00)
 * - Superhero Web Audio Synthesizer & Music Player
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
let isMusicPlaying = false;
let musicInterval = null;
let musicStep = 0;

function initSuperheroAudio() {
  const musicBtn = document.getElementById('musicToggleBtn');
  const musicTooltip = document.getElementById('musicStatusText');
  const speakerIcon = document.getElementById('speakerIcon');

  if (!musicBtn) return;

  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar disparar onomatopeya en el botón
    toggleMusic();
  });

  function toggleMusic() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (isMusicPlaying) {
      stopSuperheroAnthem();
      isMusicPlaying = false;
      musicBtn.classList.remove('is-playing');
      if (speakerIcon) speakerIcon.textContent = '🔈';
      if (musicTooltip) musicTooltip.textContent = '🔇 En pausa - Tocar para música';
      showComicToast('🔇 Música pausada');
    } else {
      startSuperheroAnthem();
      isMusicPlaying = true;
      musicBtn.classList.add('is-playing');
      if (speakerIcon) speakerIcon.textContent = '📢';
      if (musicTooltip) musicTooltip.textContent = '🔊 ¡Música Superheroica!';
      showComicToast('⚡ ¡Música Heroica Activada!');
    }
  }
}

/**
 * Generador de Fanfarria y Tema Musical de Superhéroes con Web Audio API
 */
function startSuperheroAnthem() {
  if (!audioCtx) return;

  const notes = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00,
    'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25,
    'G5': 783.99, 'REST': 0
  };

  // Melodía heroica y épica estilo cómic
  const melody = [
    { note: 'C4', dur: 0.25, type: 'brass' },
    { note: 'E4', dur: 0.25, type: 'brass' },
    { note: 'G4', dur: 0.35, type: 'brass' },
    { note: 'C5', dur: 0.6,  type: 'lead' },
    
    { note: 'G4', dur: 0.25, type: 'brass' },
    { note: 'A4', dur: 0.25, type: 'brass' },
    { note: 'C5', dur: 0.35, type: 'lead' },
    { note: 'D5', dur: 0.6,  type: 'lead' },

    { note: 'E5', dur: 0.4,  type: 'lead' },
    { note: 'D5', dur: 0.2,  type: 'lead' },
    { note: 'C5', dur: 0.4,  type: 'lead' },
    { note: 'G4', dur: 0.3,  type: 'brass' },

    { note: 'A4', dur: 0.25, type: 'brass' },
    { note: 'C5', dur: 0.3,  type: 'lead' },
    { note: 'G5', dur: 0.8,  type: 'lead' },
    { note: 'REST', dur: 0.2, type: 'rest' }
  ];

  musicStep = 0;

  function playNextNote() {
    if (!isMusicPlaying || !audioCtx) return;

    const item = melody[musicStep % melody.length];
    musicStep++;

    if (item.note !== 'REST' && notes[item.note]) {
      playHeroTone(notes[item.note], item.dur, item.type);
    }

    // Acompañamiento rítmico (beat)
    if (musicStep % 2 === 0) {
      playHeroDrum();
    }

    const nextDelay = (item.dur * 1000) * 0.85;
    musicInterval = setTimeout(playNextNote, nextDelay);
  }

  playNextNote();
}

function stopSuperheroAnthem() {
  if (musicInterval) {
    clearTimeout(musicInterval);
    musicInterval = null;
  }
}

function playHeroTone(freq, duration, type) {
  try {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = (type === 'lead') ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Envolvente de sonido tipo trompeta/sintetizador de cómic
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Silencioso en caso de bloqueo de audio
  }
}

function playHeroDrum() {
  try {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.frequency.setValueAtTime(120, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
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
    // Evitar spam masivo
    const now = Date.now();
    if (now - lastClickTime < 180) return;
    lastClickTime = now;

    // No generar sobre ciertos botones si ya tienen acción propia
    const targetTag = e.target.tagName.toLowerCase();
    if (e.target.closest('#musicToggleBtn')) return;

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
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const freqs = [523.25, 659.25, 783.99, 1046.50];
    const randFreq = freqs[Math.floor(Math.random() * freqs.length)];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(randFreq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(randFreq * 1.5, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
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
        // Usuario canceló o no soportado
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
