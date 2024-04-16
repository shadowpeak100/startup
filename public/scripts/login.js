const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('../../dbConfig.json');
const {cookies} = require("express/lib/request");

const dbName = 'startupDatabase';
const collectionName = 'users';
const authCookieName = 'auth';

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
        body: JSON.stringify({ userName: userName, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem('userName', userName);
        updateLoginButtonText();
        toggleLoginBox();
        //window.location.href = 'newSong.html';
    } else {
        console.log("failed logging in or creating user")
        //const body = await response.json();
        //const modalEl = document.querySelector('#msgModal');
        //modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        //const msgModal = new bootstrap.Modal(modalEl, {});
        //msgModal.show();
    }
}

function updateLoginButtonText() {
    const loginButton = document.getElementById('loginButton');

    const authToken = getCookie('auth');
    const userName = localStorage.getItem('userName');

    if (authToken && userName) {
        loginButton.textContent = `Sign out: ${userName}`;
        loginButton.onclick = logout;
    } else {
        loginButton.textContent = 'Log In';
        loginButton.onclick = toggleLoginBox;
    }
}

function getCookie(name) {
    const cookieArr = document.cookie.split(';').map(cookie => cookie.trim());

    for (let cookie of cookieArr) {
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.split('=')[1]);
        }
    }

    return null;
}

function logout() {
    localStorage.removeItem('userName');
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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

window.addEventListener('load', updateLoginButtonText);
