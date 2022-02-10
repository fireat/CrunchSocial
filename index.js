const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const socketio = require("socket.io-client")("https://localhost:6021");

socketio.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
const port = process.env.PORT || 6021;

app.get('/', function(req, res) {
    res.render('index');
})

const server = app.listen(port, function() {
    console.log(`Server running on port ${port}`);
})

const io = socket(server,{
    cors: {
            origin: "http://localhost",
            methods: ["GET", "POST"],
            credentials: true,
            transports: ['websocket', 'polling'],
    },
    allowEIO3: true
    })
require('./utils/socket')(io);

app.post('/room', function(req, res) {
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`);
})

app.get('/room', function(req, res) {
    res.render('room');
})

