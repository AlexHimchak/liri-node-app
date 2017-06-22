var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var inquirer = require("inquirer");
var selection = '';

inquirer
    .prompt([

        {
            type: "list",
            message: "Pick a command",
            choices: ["my_tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "dk"
        },
    ])
    .then(function(inquirerResponse) {

        selection = inquirerResponse.dk;
        console.log(selection);
        if (selection === "movie-this") {
            inquirer
                .prompt([{
                    type: "input",
                    message: "Type in your movie",
                    name: "username"
                }, ])
                .then(function(inquirerResponse) {
                    runMovie(inquirerResponse.username);

                });
        };
        if (selection === "spotify-this-song") {
            inquirer
                .prompt([{
                    type: "input",
                    message: "Type in your song",
                    name: "username"
                }, ])
                .then(function(inquirerResponse) {
                    runSpot(inquirerResponse.username);

                });
        };
        if (selection === "my_tweets") {
            runTwitter();
        };
        if (selection === "do-what-it-says") {
            runDo();
        };
    });

function runTwitter() {

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = { screen_name: 'piratecheese36' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var twitterData = tweets[0].text
            console.log(twitterData);
        }
    });
}

function runSpot(song) {

    var spotify = new Spotify({
        id: keys.spotifyKeys.clientID,
        secret: keys.spotifyKeys.consumer_secret
    });

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var track = data.tracks.items[0];
        console.log(track.artists[0].name);
        console.log(track.name);
        console.log(track.preview_url);
        console.log(track.album.name);
    });

}

function runMovie(movie) {
    // Then run a request to the OMDB API with the movie specified
    var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece"
    request(movieURL, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors/Actress's: " + JSON.parse(body).Actors);
            console.log("Tomato Url: " + JSON.parse(body).Website);
        }
    });

}

function runDo(){
	fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  runSpot(dataArr[1]);

});
}
