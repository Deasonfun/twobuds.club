const express = require('express');
var https = require('https');
var http = require('http');
const app = express();

const fs = require('fs');
const clipFolder =  'public/content/video/twobuds/';

http.createServer(app).listen(80);
https.createServer(app).listen(443);

app.use(express.static('public'));

var getClips = fs.readdir(clipFolder, (err, files) => {
    var clips = [];
    for (i = 0; i < files.length; i++) {
        var clip = '/content/video/twobuds/' + files[i];
        clips.push(clip);
    }
    console.log(clips);
    app.get('/getclips', (req, res) => {
        console.log("Getting data...")
        res.send(clips);
    });
});