document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/files')
        .then(response => response.json())
        .then(files => {
            const savedObjectsContainer = document.getElementById('savedObjectsContainer');
            savedObjectsContainer.innerHTML = ''; // Clear previous content

            files.forEach(file => {
                const songBox = document.createElement('div');
                songBox.classList.add('song-box');

                const playImg = document.createElement('img');
                playImg.src = 'pictures/Play.png';
                playImg.alt = 'A Play Arrow';
                songBox.appendChild(playImg);

                const fileAnchor = document.createElement('a');
                fileAnchor.href = `uploads/${file.id}`; // Assuming files are directly accessible in the 'uploads' folder
                fileAnchor.textContent = file.id;
                songBox.appendChild(fileAnchor);

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
        })
        .catch(error => {
            console.error('Error fetching files:', error);
        });
});
