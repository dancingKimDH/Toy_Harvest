import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = ["http://localhost:3000"]

const options: cors.CorsOptions = {
    origin: allowedOrigins
}

app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(5000, () => {
    console.log("Server is now listening on PORT 5000");
})

