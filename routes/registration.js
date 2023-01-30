import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import registry from '../scripts/studentRegistration.js';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();


router.get("/registration", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'registration.html'));
})

router.post("/registration", async (req, res) => {
    try{
        const data = await req.body;

        registry(data);

        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'html', 'success-message.html'));
    } catch(error) {
        console.error(error);
        res.status(400).sendFile(path.join(__dirname, '..', 'public', 'html', 'error-message.html'));
    }
})

router.post("/download", async (req, res) => {
    
    try {
        res.status(200).sendFile(path.join(__dirname, '..', 'temp', 'document.html'))
        setTimeout(() => {
            fs.unlink(path.join(__dirname, '..', 'temp', 'document.html'))
        }, 1000);
    } catch (error) {
        console.log("Error: ", error);
    }
})

export default router;