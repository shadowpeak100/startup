document.addEventListener('DOMContentLoaded', function() {
    const textFileInput = document.getElementById('textFile');
    const mp3FileInput = document.getElementById('mp3File');
    const titleInput = document.getElementById('songTitle');
    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', function() {
        const rating = [];
        const title = titleInput.value;
        const comments = [];

        if (!title.trim()) {
            alert('Please enter a title.');
            return;
        }

        const formData = new FormData();
        formData.append('textFile', textFileInput.files[0]);
        formData.append('mp3File', mp3FileInput.files[0]);
        formData.append('title', title);
        formData.append('rating', rating)
        formData.append('comments', comments)

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    console.log('Files uploaded successfully.');
                    // You may want to handle success behavior here
                } else {
                    console.error('Failed to upload files.');
                    // You may want to handle error behavior here
                }
            })
            .catch(error => {
                console.error('Error uploading files:', error);
                // You may want to handle error behavior here
            });
    });
});
