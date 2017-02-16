//Set up variables to link the keys.js file ad get the twitter accesss keys
var keys = require('./keys.js');
var twitterKeys = keys.mykeys;

var fs = require("fs");

//Set up variables for what is required to run app
var prompt = require("prompt");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

prompt.message = "Type one of the following: my-tweets, spotify-this-song, movie-this, or do-what-it-says";
console.log(prompt.message);
prompt.start();
//Set up variables to capture input from user
// var command = process.argv[2];
// var value = process.argv[3];
// var dataText = process.argv[4];
var command = "spotify-this-song";
var value = "hello";
// var dataText = process.argv[4];

// variable for the information needed for twitter
var params = {
    "screen_name": "B Mitchell",
    "count": 5
}

//Twitter
if (command === "my-tweets") {
    var twit = new twitter(twitterKeys);

    twit.get('statuses/user_timeline', params, function gotData(err, data, response) {
        if (!err) {
            console.log(data);
            var tweet = data;
            for (var i = 0; i < tweet.length; i++) {
                console.log(tweet[i].text);
                console.log(tweet[i].created_at);
            }
        } else {
            // log err
            console.log(err);
        }
    });
    // outputText();

}
//Spotify
if (command === "spotify-this-song") {
    if (value) {
        spotify.search({
            type: "track",
            query: value,

        }, function(err, data) {
            console.log(data);

            //printing out detailed info for song
            for (var i = 0; i < value.length; i++) {
                console.log(data.tracks.items[i].name);
                console.log(data.tracks.items[i].album.href);
                console.log(data.tracks.items[i].album.name);
                console.log(data.tracks.items[i].preview_url);


            }
        });
    } else {
        spotify.search({
            type: "track",
            query: "the sign",

        }, function(err, data) {
            console.log(data);
            var data = data.track.items;
            console.log(data[0].name);
            console.log(data[0].album.href);
            console.log(data[0].album.name);
            console.log(data[0].preview_url);


        });
    }


    //outputText();
}
//Movie info
if (command === "movie-this") {
    if (value) {
        request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&r=json", function(err, response, body) {

            console.log(body);
        });
    } else {
        request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true", function(err, response, body) {
            console.log(body);
        });

    }

    // outputText();
}



//Do what it says section using random.txt file

if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(err, data) {

        console.log(data);
    });
    // outputText();
}

//function outputText() {
//  fs.appendFile("log.txt", "Command" + command + "Song Title: " + value + "\nSong information: " + dataText);
