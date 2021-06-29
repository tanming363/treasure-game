import express from 'express';
const router = express.Router();

const users = [];

router.get('/', (req, res) => {
        console.log(users);
        res.send(users);
});
router.post('/', (req, res) => {
        const user = req.body;
        users.push(user);
        console.log(`User [${user.username}] added to the database.`);
});

export default router;