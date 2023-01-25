import express from 'express';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genFile from '../public/js/calendar-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
let name, date, frequency, fileName;

router.post("/generate", (req, res) => {

    ({name, date, frequency} = req.body);
    fileName = `${name.toLowerCase()}-class-calendar.txt`;

    genFile(name, date, frequency, fileName);

    console.log(req.body);

    res.redirect('/download');
});

router.get("/calendar-generator", (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'calendar-generator.html'));
})
    

router.get('/download', (req, res) => {
    const file = `${path.join(__dirname, '..', fileName)}`;
    res.download(file, error => {
        if(error)
            console.log('Error');
        fs.unlink(path.join(__dirname, '..', fileName));

    });
});



export default router;