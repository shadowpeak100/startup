const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 1313;

app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var apiRouter = express.Router();
app.use(`/api`, apiRouter);
const upload = multer({ storage: storage });

//add routers here:
app.post('/api/upload', upload.fields([{ name: 'textFile' }, { name: 'mp3File' }]), (req, res) => {
    try {
        const { title, rating, comments } = req.body;
        const { textFile, mp3File } = req.files;
        fs.renameSync(textFile[0].path, `uploads/${textFile[0].originalname}`);
        fs.renameSync(mp3File[0].path, `uploads/${mp3File[0].originalname}`);

        console.log('Title:', title);
        console.log('Rating:', rating);
        console.log('Comments:', comments);

        res.send('Files uploaded successfully.');
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});