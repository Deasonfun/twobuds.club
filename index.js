const express = require('express');
const app = express();

const fs = require('fs');
const clipFolder =  'public/content/video/twobuds/';

var server = app.listen(3000, function() {
    console.log('listening...');
});

app.use(express.static('public'));

var clips = fs.readdir(clipFolder, (err, files) => {
    for (i = 0; i < files.length; i++) {
        clips = clipFolder + files[i];
        console.log(clips);
    }
});
console.log(clips);
app.get('/getclips', (req, res) => {
    console.log("Getting data...")
    res.send(clips);
});