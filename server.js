const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const upload = multer();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', upload.none(), (req, res) => {
    const { method, initial_position, disk_requests, max_disk } = req.body;

    const pythonProcess = spawn('python3', ['main.py', method, initial_position, disk_requests, max_disk || ""]);

    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        const [total_head_movement, imgBase64] = output.split('SPLIT_HERE');

        res.json({
            total_head_movement: total_head_movement.trim(),
            imgBase64: imgBase64.trim()
        });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
