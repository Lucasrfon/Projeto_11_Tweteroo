import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send("OK");
});

server.post('/tweets', (req, res) => {
    function findAvatar(object) {
        return object.username === req.body.username;
    }
    tweets.push({...req.body, "avatar": users.find(findAvatar).avatar});
    res.send("OK");
});

server.get('/tweets', (req, res) => {
    res.send(tweets.slice(-10, ));
});

server.listen(5000);