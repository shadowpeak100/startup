document.addEventListener('DOMContentLoaded', function() {
    app = new App();
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
                    // Send WebSocket message
                    app.broadcastEvent("NewSongUploaded", "NewSongUploaded", {title: titleInput.value})
                    // const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
                    // const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
                    //
                    // socket.onopen = () => {
                    //     const newSongMsg = {
                    //         type: 'NewSongUploaded',
                    //         title: title
                    //     };
                    //     socket.send(JSON.stringify(newSongMsg));
                    //     socket.close();
                    // };
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

class App {
    socket;
    constructor() {
        this.configureWebSocket();
        this.bindEventListeners();
    }

    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
            this.displayMsg('system', 'websocket', 'connected');
        };
        this.socket.onclose = (event) => {
            this.displayMsg('system', 'websocket', 'disconnected');
        };

        this.socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            if (msg.type === 'NewSongUploaded') {
                this.displayMsg('user', msg.from, `New song: ${msg.value.title} just added, check it out!`);
            }
        };
    }

    bindEventListeners() {
        const saveButton = document.getElementById('saveButton');
        saveButton.addEventListener('click', () => this.handleUpload());
    }

    handleUpload() {
        const textFileInput = document.getElementById('textFile');
        const mp3FileInput = document.getElementById('mp3File');
        const titleInput = document.getElementById('songTitle');

        const title = titleInput.value;

        if (!title.trim()) {
            alert('Please enter a title.');
            return;
        }

        const formData = new FormData();
        formData.append('textFile', textFileInput.files[0]);
        formData.append('mp3File', mp3FileInput.files[0]);
        formData.append('title', title);

        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Files uploaded successfully.');
                } else {
                    console.error('Failed to upload files.');
                }
            })
            .catch((error) => {
                console.error('Error uploading files:', error);
            });
    }

    displayMsg(cls, from, msg) {
        const uploadedMessages = document.querySelector('#player-messages');
        uploadedMessages.innerHTML =
            `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` +
            uploadedMessages.innerHTML;
    }

    broadcastEvent(from, type, value) {
        const event = {
            from: from,
            type: type,
            value: value,
        };
        this.socket.send(JSON.stringify(event));
    }
}

new App();
