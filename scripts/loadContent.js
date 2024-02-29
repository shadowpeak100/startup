document.addEventListener('DOMContentLoaded', function() {
    loadSavedObjects();
    console.log("loaded objects!")
});

function loadSavedObjects() {
    const savedObjectsContainer = document.getElementById('savedObjectsContainer');
    savedObjectsContainer.innerHTML = '';
    const savedObjects = JSON.parse(localStorage.getItem('musicObjects')) || [];

    try {
    savedObjects.forEach((musicObject) => {
        const songBox = document.createElement('div');
        songBox.classList.add('song-box');

        const imgElement = document.createElement('img');
        imgElement.src = 'pictures/Play.png';
        imgElement.alt = 'A Play Arrow';
        songBox.appendChild(imgElement);

        const titleAnchor = document.createElement('a');
        titleAnchor.href = 'individualSong.html'; // Replace with actual link
        titleAnchor.textContent = musicObject.title;
        songBox.appendChild(titleAnchor);

        const starRatingDiv = document.createElement('div');
        starRatingDiv.classList.add('star-rating');
        for (let i = 1; i <= 5; i++) {
            const starSpan = document.createElement('span');
            starSpan.classList.add('star');
            starSpan.dataset.value = i;
            starSpan.innerHTML = '&#9733;';
            starRatingDiv.appendChild(starSpan);
        }
        songBox.appendChild(starRatingDiv);

        const downloadImg = document.createElement('img');
        downloadImg.src = 'pictures/Download.png';
        downloadImg.alt = 'Download Symbol';
        songBox.appendChild(downloadImg);

        savedObjectsContainer.appendChild(songBox);
    });
} catch (error) {
    console.error('Error iterating over savedObjects:', error);
}
}