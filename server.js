const express = require('express');
const app = express();
port = 3080;

const users = [];

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(process.cwd() + "/frontend/dist/treasure-game/"));

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/frontend/dist/treasure-game/index.html")
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
