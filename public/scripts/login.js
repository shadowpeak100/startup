const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('../../dbConfig.json');

const dbName = 'startupDatabase';
const collectionName = 'users';

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/${dbName}`;
const client = new MongoClient(url);

async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}

async function createUser() {
    loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: userName, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem('userName', userName);
        window.location.href = 'newSong.html';
    } else {
        const body = await response.json();
        const modalEl = document.querySelector('#msgModal');
        modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
    }
}

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

async function getUser(username) {
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${username}`);
    if (response.status === 200) {
        return response.json();
    }

    return null;
}


function toggleLoginBox() {
    var loginBox = document.getElementById("loginBox");
    if (loginBox.style.display === "none") {
        loginBox.style.display = "block";
    } else {
        loginBox.style.display = "none";
    }
}

window.onload = function() {
    var userName = localStorage.getItem('userName');

    if (userName) {
        var loginButton = document.getElementById("loginButton");
        if (loginButton) {
            loginButton.textContent = "Welcome, " + userName;
        }
    }
};
