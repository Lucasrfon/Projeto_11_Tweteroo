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
        res.status(201).send("OK");
    }
});

server.post('/tweets', (req, res) => {
    const badUsername = typeof(req.header("User")) !== "string" || req.header("User").trim().length <= 0;;
    const badTweet = typeof(req.body.tweet) !== "string" || req.body.tweet.trim().length <= 0;

    if(badUsername || badTweet) {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        function findAvatar(object) {
            return object.username === req.header("User");
        }
        tweets.push({...req.body, ...users.find(findAvatar)});
        res.status(201).send("OK");
    }
});

server.get("/tweets", (req, res) => {
    let page = parseInt(req.query.page);
    let tweetsStart = page * -10;
    let tweetsEnd = (page -1) * -10;
    if(page > 1) {
        res.send(tweets.slice(tweetsStart, tweetsEnd).reverse());
    }
    else if (page === 1) {
        res.send(tweets.slice(tweetsStart, ).reverse());
    } else {
        res.status(400).send("Informe uma página válida!");
    }
});

server.get('/tweets/:username', (req, res) => {
    const username = req.params.username;
    res.send(tweets.filter((tweet) => {return tweet.username === username}));
})

server.listen(5000);