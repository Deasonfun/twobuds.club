const express = require('express');
const app = express();

const fs = require('fs');
const clipFolder = 'public/content/video/twobuds/';

var server = app.listen(3000, function() {
    console.log("listening...");
});

app.use(express.static('public'));

var getClips = fs.readdir(clipFolder, (err, files) => {
    var clips = [];
    //Get each video file and set them to an array
    for (i = 0; i < files.length; i++) {
        var clip = '/content/video/twobuds/' + files[i];
        clips.push(clip);
    }
    console.log(clips);
    //Send video array to website when requested
    app.get('/getclips', (req, res) => {
        console.log("Getting data...")
        res.send(clips);
    });
});