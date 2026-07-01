import express from 'express';
const app = express();

const router = express.Router();

const PORT = 3000;
const host = 'http://localhost'
app.listen(PORT, () => {
    console.log(`server running at ${host}:${PORT}`)
})