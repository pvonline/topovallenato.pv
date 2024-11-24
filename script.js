
/* ------ Inicio Reloj Digital ------*/

const $tiempo = document.querySelector('.tiempo'),
$fecha = document.querySelector('.fecha');

function digitalClock(){
    let f = new Date(),
    dia = f.getDate(),
    mes = f.getMonth() + 1,
    anio = f.getFullYear(),
    diaSemana = f.getDay();

    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2)

    let timeString = f.toLocaleTimeString();
    $tiempo.innerHTML = timeString;

    let semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    let showSemana = (semana[diaSemana]);
    $fecha.innerHTML = `${showSemana}  ${dia}-${mes}-${anio}`
}
setInterval(() => {
    digitalClock()
}, 1000);
/* ------ Final Reloj Digital -------*/




/*----- inicio Reproductor webSim.AI -------*/

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audio = new Audio();
audio.crossOrigin = "anonymous";
audio.src = 'https://stream.zeno.fm/v5ecixm4fvduv';

const playButton = document.getElementById('playButton');
const volumeSlider = document.getElementById('volumeSlider');

// Set initial volume
audio.volume = volumeSlider.value / 100;

// Volume slider event listener
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

// Explicitly set autoplay and preload
audio.autoplay = true;
audio.preload = "auto";

// Enhanced play attempt function with more robust error handling
const attemptPlay = async () => {
    try {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
        
        // Force unmute
        audio.muted = false;
        
        // Set volume before playing
        audio.volume = volumeSlider.value / 100;
        
        const playPromise = await audio.play();
        playButton.innerHTML = '<span class="pause-icon"></span>';
        console.log('Playback started successfully');
        
        return playPromise;
    } catch (error) {
        console.error('Playback failed:', error);
        playButton.innerHTML = '<span class="play-icon"></span>';
        // Retry after a short delay
        setTimeout(attemptPlay, 1000);
    }
};

// Immediate autoplay attempt when page loads
window.addEventListener('load', () => {
    console.log('Page loaded, attempting autoplay...');
    attemptPlay();
});

// Play/Pause button functionality
playButton.addEventListener('click', () => {
    if (audio.paused) {
        attemptPlay();
    } else {
        audio.pause();
        playButton.innerHTML = '<span class="play-icon"></span>';
    }
});

// Add multiple event listeners to handle autoplay
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, attempting autoplay...');
    attemptPlay();
});

// Try to play on any user interaction
const tryPlayOnInteraction = async () => {
    if (audio.paused) {
        await attemptPlay();
        // Only remove listeners after successful playback
        if (!audio.paused) {
            document.removeEventListener('click', tryPlayOnInteraction);
            document.removeEventListener('touchstart', tryPlayOnInteraction);
        }
    }
};

document.addEventListener('click', tryPlayOnInteraction);
document.addEventListener('touchstart', tryPlayOnInteraction);

// Add visibility change handler
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && audio.paused) {
        attemptPlay();
    }
});

// Add connection recovery
window.addEventListener('online', () => {
    if (audio.paused) {
        attemptPlay();
    }
});

// Enhanced error recovery
audio.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    setTimeout(() => {
        audio.src = 'https://stream.zeno.fm/v5ecixm4fvduv';
        audio.load();
        attemptPlay();
    }, 1000);
});

audio.addEventListener('stalled', () => {
    console.log('Stream stalled, attempting recovery...');
    audio.load();
    attemptPlay();
});

audio.addEventListener('waiting', () => {
    console.log('Stream buffering...');
});

// More frequent periodic check to ensure playback
setInterval(() => {
    if (audio.paused && audioContext.state !== 'suspended') {
        console.log('Periodic check: Attempting to resume playback');
        attemptPlay();
    }
}, 3000);

// Additional handler for mobile devices
document.addEventListener('touchend', () => {
    if (audio.paused) {
        attemptPlay();
    }
}, { once: true });

// Force play attempt after a short delay
setTimeout(attemptPlay, 500);
/*----- final Reproductor webSim.AI -------*/

