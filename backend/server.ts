// node --no-warnings=ExperimentalWarning --loader ts-node/esm file.ts
import cors from 'cors';
import express from 'express';
import axios from 'axios';

const app = express();

const allowedOrigins = ["http://localhost:3000", "*"]

const options: cors.CorsOptions = {
    origin: allowedOrigins
}

app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Data from Backend" })
})

app.get("/fetch-housing-data/:year", async (req, res) => {
    try {
        const { year } = req.params;
        const response = await axios.get(`http://211.237.50.150:7080/openapi/6de97bd2f04693f272abb104a04c73687caad2061a5cbf20eb6f60dd9c4d6719/xml/Grid_20151214000000000336_1/1/5?SLCTN_YEAR=${year}`);
        // 6de97bd2f04693f272abb104a04c73687caad2061a5cbf20eb6f60dd9c4d6719
        res.json(response.data);
        return res;
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
});

app.listen(5000, () => {
    console.log("Server is now listening on PORT 5000");
})

