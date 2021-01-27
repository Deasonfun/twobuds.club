//Based on: https://github.com/Fortyseven/ChannelSurf

var tv = null;

//Get videos from server
fetch('/getclips', {method: 'GET'})
    .then(function (response) {
        if(response.ok) return response.json();
       throw new Error('Request failed...');
    })
    .then(function (data) {
        console.log("Getting data...");
        var clip_list = data;
        console.log(clip_list);


var TV = function ( play_button, video_selector, interstitial_selector ) {

    var _screen = $( video_selector );
    var _interstitial = $( interstitial_selector );
    var _play_button = $( play_button );
    var _self = this;
    var _next_interstitial = false;
    var _interstitial_start_time;
    var _clip_pos = 0;

    var playButton = document.getElementById('playButton');
    console.log(_play_button);

    var video = document.getElementById('main_video');
    var currentTime = 0;
    var endtime = 0;

    //Build playlist and play video when you click the play button
    playButton.addEventListener('click', function() {
        _play_button.hide();
        buildPlaylist();
        playInterstitial();
    });

    /**
     *
     * Based on:
     * HTML5 video stretch
     * http://coding.vdhdesign.co.nz/?p=29
     * The video tag usually enforces the aspect ratio, but... CSS transforms to the rescue!
     *
     * @constructor
     */
    this.resizeVideo = function ( element ) {
        //console.log( video_selector );
    }

    /**
     *
     * @param video_src
     */

    

    function playVideo( video_src ) {
        console.log(video_src);
        _screen[0].src = video_src;
    }

    function loadNextVideo() {
        if ( (new Date().getTime() - _interstitial_start_time) < 750 ) {
            setTimeout( loadNextVideo, 100 );
            return;
        }

        var clip_num = Math.round( Math.random() * (clip_list.length - 1) );

        _clip_pos++;
    
        playVideo( clip_list[ _clip_pos % clip_list.length ] );;
        _next_interstitial = true;
        _self.resizeVideo( _interstitial[0] );
    }

    function playInterstitial() {
        _screen[0].pause();
        _screen.hide();
        _next_interstitial = false;
        _interstitial[0].currentTime = 0;
        _play_button.hide();
        _interstitial.show();
        //_interstitial[0].load();
        _interstitial[0].play();
        _interstitial_start_time = new Date().getTime();
        loadNextVideo();
    }

    //Run when the video plays
    this.onClipLoaded = function () {
        //Create random number
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //Set random timestamp between 0 and video duration
        video.addEventListener('loadedmetadata', function() {
            console.log(this.duration);
            this.currentTime = getRandomInt(0, this.duration);
        }, false);

        //Pause button doesn't work right now because it doesn't stop the count up to the end
        //of the clip...prob gonna fix later :)
        /*$(window).keypress(function(e) {
            if (e.which == 32) {
                if(video.paused == true) {
                    video.play();
                }
                else {
                    video.pause();
                }
            }
        });*/

        currentTime = video.currentTime;
        endtime = currentTime + getRandomInt(10, 20);
        //Loop that checks video time and compares it to set entime
        function checkTime() {
            //When video time reaches end of clip reset clip time, play transition
            if (currentTime >= endtime) {
                currentTime = 0;
                endtime = 0;
                playInterstitial();
            } else {
                currentTime++;
                //Loop
                setTimeout(checkTime, 2000);
            }
        }
        
        console.log('hey');
        _interstitial[0].pause();
        _screen.show();
        _interstitial.hide();
        this.resizeVideo( _screen[0] );

        //Start loop
        checkTime();
    }
    

    //Play transition after clip has finished
    this.onClipFinished = function () {
        if ( _next_interstitial == true ) {
            playInterstitial();
        }
        else {
            loadNextVideo();
        }

    };

    /**
     * Shuffle an array
     * http://stackoverflow.com/a/6274381/14615
     * @param o
     * @returns {*}
     */
    function shuffle( o ) {
        for ( var j, x, i = o.length; i; j = Math.floor( Math.random() * i ), x = o[--i], o[i] = o[j], o[j] = x ) {
            ;
        }
        return o;
    }

    function buildPlaylist() {
        shuffle( clip_list );
    }

    console.log(playButton);
    _interstitial.hide();
    _screen.hide();
}

/************************************************************
 * Main
 ************************************************************/
$( document ).ready( function () {
    tv = new TV( ".play_button", "video.screen", "video.interstitial" );
    $( ".screen" ).click( function () {
        tv.onClipFinished();
    } );
} );

})
.catch (function (error) {
    console.log(error);
})
