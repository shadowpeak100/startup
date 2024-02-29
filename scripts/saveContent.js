document.addEventListener('DOMContentLoaded', function() {
    const ratingInput = document.getElementById('rating');
    const textFileInput = document.getElementById('textFile');
    const mp3FileInput = document.getElementById('mp3File');
    const titleInput = document.getElementById('songTitle');
    const commentsInput = document.getElementById('comments');
    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', function() {
        const rating = parseInt(ratingInput.value);
        const title = titleInput.value;
        const comments = commentsInput.value.split('\n');

        if (isNaN(rating) || rating < 0 || rating > 5) {
            alert('Please enter a valid rating between 0 and 5.');
            return;
        }

        if (!title.trim()) {
            alert('Please enter a title.');
            return;
        }

        const existingMusicObjects = JSON.parse(localStorage.getItem('musicObjects')) || [];
        const musicObject = {
            rating: rating,
            textFile: textFileInput.files[0].name,
            mp3File: mp3FileInput.files[0].name,
            title: title,
            comments: comments
        };

        existingMusicObjects.push(musicObject);
        localStorage.setItem('musicObjects', JSON.stringify(existingMusicObjects));
        console.log('Object saved to local storage.');
    });
});