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
    tweets.push(req.body);
    res.send("OK");
});

server.listen(5000);