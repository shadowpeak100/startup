class App {
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
                this.displayMsg('player', msg.from, `New song: ${msg.value.title} just added, check it out!`);
            } else if (msg.type === 'GameStartEvent') {
                this.displayMsg('player', msg.from, `started a new game`);
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
        const chatText = document.querySelector('#player-messages');
        chatText.innerHTML =
            `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` +
            chatText.innerHTML;
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
