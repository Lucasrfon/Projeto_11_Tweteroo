import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post('/sign-up', (req, res) => {
    const badUsername = typeof(req.body.username) !== "string" || req.body.username.trim().length <= 0;
    const badAvatar = typeof(req.body.avatar) !== "string" || req.body.avatar.slice(0, 8) !== "https://";
    
    if(badUsername || badAvatar) {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        users.push(req.body);
        res.send("OK");
    }
});

server.post('/tweets', (req, res) => {
    const badUsername = typeof(req.body.username) !== "string" || req.body.username.trim().length <= 0;;
    const badTweet = typeof(req.body.tweet) !== "string" || req.body.tweet.trim().length <= 0;

    if(badUsername || badTweet) {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        function findAvatar(object) {
            return object.username === req.body.username;
        }
        tweets.push({...req.body, "avatar": users.find(findAvatar).avatar});
        res.send("OK");
    }
});

server.get('/tweets', (req, res) => {
    res.send(tweets.slice(-10, ));
});

server.listen(5000);