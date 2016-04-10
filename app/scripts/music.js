'use strict';

var audioState = 0;
var backgroundAudio = document.getElementById('backgroundMusic');
var muteButton = document.getElementById('Mutebtn');

function mute() {
    if (audioState === 0){
        backgroundAudio.src = 'audio/bat-flapping.wav';
        backgroundAudio.muted = false;
        muteButton.src = 'images/playing.png';
        audioState++;
    }
    else if(audioState === 1) {
        backgroundAudio.src = 'audio/Metallica&TSFSO-NothingElseMatters.mp3';
        backgroundAudio.muted = false;
        muteButton.src = 'images/playing.png';
        audioState++;
    }
    else {
        backgroundAudio.muted = true;
        muteButton.src = 'images/muted.png';
        audioState = 0;
    }
}

mute();