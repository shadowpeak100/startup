const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const dbName = 'startupDatabase';
const collectionName = 'users';

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/${dbName}`;
const client = new MongoClient(url);

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function login() {
    var username = document.getElementById("usernameInput").value;
    localStorage.setItem("userName", username);

    var loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.textContent = "Hello, " + username;
    }
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

function submitData(action) {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if (action === 'login') {
        loginUser(username, password);
    } else if (action === 'register') {
        registerUser(username, password);
    }
}

async function loginUser(username, password) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collectionName);
        const user = await collection.findOne({ username });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        console.log('Login successful');
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close();
    }
}

async function registerUser(username, password) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collectionName);
        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashedPassword,
        };

        await collection.insertOne(newUser);

        console.log('User registered successfully');
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close();
    }
}
