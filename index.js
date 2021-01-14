const express = require('express');
const app = express();

const fs = require('fs');
const clipFolder =  'public/content/video/twobuds/';

var server = app.listen(3000, function() {
    console.log('listening...');
});

app.use(express.static('public'));

var getClips = fs.readdir(clipFolder, (err, files) => {
    var clips = [];
    for (i = 0; i < files.length; i++) {
        var clip = '/content/video/twobuds/' + files[i];
        //console.log(files);
        clips.push(clip);
    }
    console.log(clips);
    app.get('/getclips', (req, res) => {
        console.log("Getting data...")
        res.send(clips);
    });
});