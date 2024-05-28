import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(
    express.static(path.resolve(path.dirname(
        fileURLToPath(import.meta.url),
    ), 'dist'), { index: false }),
);

app.use('*', async (_, res) => {
    try {
        const html = fs.readFileSync('./dist/index.html', 'utf-8');
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
        res.status(500).end(error);
    }
});

app.listen(port, () => {
    // console.log(`http://localhost:${port}`);
});
