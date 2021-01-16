//Based on: https://github.com/Fortyseven/ChannelSurf

var tv = null;

fetch('/getclips', {method: 'GET'})
    .then(function (response) {
        if(response.ok) return response.json();
       throw new Error('Request failed...');
    })
    .then(function (data) {
        console.log("Getting data...");
        var clip_list = data;
        console.log(clip_list);


var TV = function ( video_selector, interstitial_selector ) {

    var _screen = $( video_selector );
    var _interstitial = $( interstitial_selector );
    var _self = this;
    var _next_interstitial = false;
    var _interstitial_start_time;
    var _clip_pos = 0;

    var _clips_shuffled = [];

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
        _screen[0].src = video_src;
    }

    /**
     *
     */
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

    /**
     *
     */
    function playInterstitial() {
        _next_interstitial = false;
        _screen[0].pause();
        _interstitial[0].currentTime = 0;
        _interstitial[0].play();
        _interstitial.show();
        _interstitial_start_time = new Date().getTime();
        loadNextVideo();
    }

    /**
     *
     */
    this.onClipLoaded = function () {
        //Create random number
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var video = document.getElementById('main_video');

        //Set random timestamp between 0 and video duration
        video.addEventListener('loadedmetadata', function() {
            console.log(this.duration);
            this.currentTime = getRandomInt(0, this.duration);
        }, false);
        _interstitial[0].pause();
        _screen.show();
        _interstitial.hide();
        this.resizeVideo( _screen[0] );

        //Pause button
        $(window).keypress(function(e) {
            if (e.which == 32) {
                if(video.paused == true) {
                    video.play();
                }
                else {
                    video.pause();
                }
            }
        });
    }
    

    /**
     * When we're playing an interstitial, this will
     */
    this.onClipFinished = function () {
        if ( _next_interstitial == true ) {
            _screen.hide();
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

    buildPlaylist();
    loadNextVideo();
}

/************************************************************
 * Main
 ************************************************************/
$( document ).ready( function () {
    tv = new TV( "video.screen", "video.interstitial" );
    $( ".screen" ).click( function () {
        tv.onClipFinished();
    } );
} );

})
.catch (function (error) {
    console.log(error);
})
