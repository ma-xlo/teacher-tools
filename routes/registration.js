import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

router.get("/registration", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'registration.html'));
})

router.post("/registration", async (req, res) => {
    const data = await req.body;
    console.log(data);
    res.status(200).send("Registrado com sucesso!");
})

export default router;