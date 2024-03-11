const socketUrl = 'ws://your-websocket-server-url';
const socket = new WebSocket(socketUrl);
socket.addEventListener('open', function (event) {
    console.log('WebSocket connection established.');
    socket.send('fetch-rss-feed');
});

socket.addEventListener('message', function (event) {
    console.log('Received message from server:', event.data);
    const rssFeedData = JSON.parse(event.data);
    displayRSSFeed(rssFeedData);
});

socket.addEventListener('close', function (event) {
    console.log('WebSocket connection closed.');
});

function displayRSSFeed(rssFeedData) {
    const rssFeedContainer = document.getElementById('rssFeed');
    rssFeedContainer.innerHTML = '';
    rssFeedData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.title; // You can display other properties as needed
        rssFeedContainer.appendChild(listItem);
    });
}