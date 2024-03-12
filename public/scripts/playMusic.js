var africaPlayButton = document.getElementById('africa');
africaPlayButton.addEventListener('click', function() {
    var audio = new Audio('music/StepperAfrica.mp3');
    audio.play();
});

var ariaMathPlayButton = document.getElementById('ariaMath');
ariaMathPlayButton.addEventListener('click', function() {
    var audio = new Audio('music/StepperAriaMath.mp3');
    audio.play();
});

var firefliesPlayButton = document.getElementById('fireflies');
firefliesPlayButton.addEventListener('click', function() {
    var audio = new Audio('music/StepperFireflies.mp3');
    audio.play();
});

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', function() {
        const songTitle = encodeURIComponent('Title of the Song'); // Get the title of the song
        window.location.href = `/download/${songTitle}`;
    });
});