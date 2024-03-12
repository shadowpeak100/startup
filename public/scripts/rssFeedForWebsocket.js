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

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.allmusic.com/rss/newsletter')
        .then(response => response.text())
        .then(xml => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');

            const feedContainer = document.getElementById('rss-feed');
            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const description = item.querySelector('description').textContent;
                const pubDate = item.querySelector('dc\\:date').textContent;

                const feedItem = document.createElement('div');
                feedItem.innerHTML = `
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <p>Published Date: ${pubDate}</p>
                `;
                feedContainer.appendChild(feedItem);
            });
        })
        .catch(error => console.error('Error fetching RSS feed:', error));
});