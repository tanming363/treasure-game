const express = require('express');
const app = express();
port = 3080;
const cors = require('cors')

const users = [];

app.use(express.json());
app.use(express.urlencoded({
        extended: true
}));

app.use(cors());
app.get('/', (req, res) => {
        res.json(users);
});

app.post('/', (req, res) => {
        const user = req.body.user;
        users.push(user);
        res.json("user addedd");
});

app.listen(port, () => {
        console.log(`Server listening on the port::${port}`);
});
