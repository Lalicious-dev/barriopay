import "dotenv/config"; 
import express from 'express';
import cors from 'cors';
import router from './routes/router.js'

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/api", router);


app.listen(PORT, () => {
    console.log(`Servidor en el puerto: ${PORT}`);
})