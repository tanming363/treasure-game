import express from "express";
import userRoutes from './routes/users.js';
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({
        extended: true
}));
app.use(cors())

app.use('/users', userRoutes);

app.get('/', (req, res) => {
        res.send("Hello OK")
})

app.listen(PORT, () => {
        console.log(`Server running at PORT ${PORT}`);
})