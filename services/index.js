const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const axios = require('axios');
const WebSocket = require('ws');
const {peerProxy} = require("./peerProxy");
const DB = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 1313;

app.use(express.json());
app.use(express.static('public'));

const broadcast = (message) => {
    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

//multer file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

//routers
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//login related features
// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.username, req.body.password);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:username', async (req, res) => {
    const user = await DB.getUser(req.params.username);
    if (user) {
        const token = req?.cookies.token;
        res.send({ username: user.username, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ msg: 'Unknown' });
});
//end login related features


app.post('/api/upload', upload.fields([{ name: 'textFile' }, { name: 'mp3File' }]), (req, res) => {
    try {
        const { title, rating, comments } = req.body;
        const { textFile, mp3File } = req.files;
        fs.renameSync(textFile[0].path, `uploads/${textFile[0].originalname}`);
        fs.renameSync(mp3File[0].path, `uploads/${mp3File[0].originalname}`);

        console.log('Title:', title);
        console.log('Rating:', rating);
        console.log('Comments:', comments);

        res.status(200).send('Files uploaded successfully.');
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Error uploading files: ' + error.message);
    }
});

//handle showing the uploaded files
app.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing file:', err);
            res.status(404).send('File not found');
        } else {
            // Stream the file to the response
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        }
    });
});

app.get('/api/files', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            res.status(500).send('Internal server error');
        } else {
            res.json(files);
        }
    });
});

app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(uploadsFolder, fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(404).send('File not found.');
        }
    });
});

app.get('/uploads/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join("uploads", fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(404).send('File not found.');
        }
    });
});

//third party call
app.get('/chuck-norris-joke', async (req, res) => {
    try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');

        const joke = response.data.value;

        res.json({ joke });
    } catch (error) {
        console.error('Error fetching Chuck Norris joke:', error);
        res.status(500).json({ error: 'An error occurred while fetching Chuck Norris joke' });
    }
});


module.exports = router;

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService)

//
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const uuid = require('uuid');
//
// const app = express();
// app.use(cookieParser());
//
// app.get('/cookie', (req, res) => {
//     const token = uuid.v4();
//     res.cookie('token', token, {
//         secure: true,
//         httpOnly: true,
//         sameSite: 'strict',
//     });
//
//     res.send({ token: token });
// });
//
// app.get('*', (req, res) => {
//     const token = req?.cookies.token;
//     res.send({ token: token });
// });
//
// app.listen(3000, () => {
//     console.log('listening 3000');
// });
