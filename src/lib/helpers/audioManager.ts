let backgroundTracks = [
  '/whispers-of-ancient-pines.mp3',
  '/whispers-of-the-ancient-pines-stocktune.mp3',
  '/whispers-of-the-yangtze-stocktune.mp3'
];

let battleTrack = '/bloodcry-clemens-ruh.mp3';

let bgAudio: HTMLAudioElement | null = null;
let battleAudio: HTMLAudioElement | null = null;
let currentTrackIndex = 0;

export function playBackgroundLoop() {
  if (bgAudio) return; // Already playing
  bgAudio = new Audio(backgroundTracks[currentTrackIndex]);
  bgAudio.loop = false;
  bgAudio.volume = 0.4;
  bgAudio.play().catch(err => console.warn('Autoplay blocked until user interaction:', err));
  bgAudio.onended = () => {
    currentTrackIndex = (currentTrackIndex + 1) % backgroundTracks.length;
    bgAudio = null;
    playBackgroundLoop();
  };
}

export function stopBackgroundLoop() {
  if (bgAudio) {
    bgAudio.pause();
    bgAudio = null;
  }
}

export function playBattleTrack() {
  stopBackgroundLoop();
  if (battleAudio) return;
  battleAudio = new Audio(battleTrack);
  battleAudio.loop = true;
  battleAudio.volume = 0.6;
  battleAudio.play().catch(err => console.warn('Autoplay blocked until user interaction:', err));
}

export function stopBattleTrack() {
  if (battleAudio) {
    battleAudio.pause();
    battleAudio = null;
    playBackgroundLoop();
  }
}
