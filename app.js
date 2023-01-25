import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import bodyParser from 'body-parser';
import generator from './routes/generator.js';
import registration from './routes/registration.js'

const app = express();
const port = process.env.PORT || 3000;

// Section to define the local path to the __dirname variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json()); //Handles JSON requests
app.use(bodyParser.urlencoded({ extended: true })); //Handles normal post requests

app.use(express.static(path.join(__dirname, 'public')));
app.use(generator);
app.use(registration);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
})


app.listen(port, () => {
    console.log(`🏆 Server running on http://localhost:${port}/home`);
});