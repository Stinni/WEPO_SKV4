'use strict';

var audioState = 0;
var bgMusic = document.getElementById('backgroundMusic');
var muteButton = document.getElementById('Mutebtn');

function mute() {
    if (audioState === 0){
        bgMusic.src = 'audio/bat-flapping.wav';
        bgMusic.muted = false;
        bgMusic.volume = 0.5;
        muteButton.src = 'images/playing.png';
        audioState++;
    }
    else if(audioState === 1) {
        bgMusic.src = 'audio/Metallica&TSFSO-NothingElseMatters.mp3';
        audioState++;
    }
    else if(audioState === 2) {
        bgMusic.src = 'audio/KrummiSvafiKlettagja.mp3';
        audioState++;
    }
    else if(audioState === 3) {
        bgMusic.src = 'audio/Krummavisur.mp3';
        audioState++;
    }
    else {
        bgMusic.muted = true;
        muteButton.src = 'images/muted.png';
        audioState = 0;
    }
}

mute();