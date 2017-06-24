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
                    message: "Type in your movie or enter nothing",
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
            for (i = 0; i < tweets.length && i < 19; i++) {
                var twitterData = tweets[i].text
                console.log(twitterData);
                fs.appendFile("log.txt", tweets[i].text + "\n", function(err) {});
            }
            fs.appendFile("log.txt", "----------" + "\n", function(err) {});

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
        fs.appendFile("log.txt", track.artists[0].name + "\n", function(err) {});
        fs.appendFile("log.txt", track.name + "\n", function(err) {});
        fs.appendFile("log.txt", track.preview_url + "\n", function(err) {});
        fs.appendFile("log.txt", track.album.name + "\n", function(err) {});
        fs.appendFile("log.txt", "----------------------" + "\n", function(err) {});
    });

}

function runMovie(movie) {
    // Then run a request to the OMDB API with the movie specified
    var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece"
    request(movieURL, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            if (movie === "") {
                console.log("If you havent watched Mr. Nobody you should:http://www.imdb.com/title/tt0485947/");
                console.log("Its on netflix!");

            } else {

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
                fs.appendFile("log.txt", JSON.parse(body).Title + "\n", function(err) {});
                fs.appendFile("log.txt", JSON.parse(body).Year + "\n", function(err) {});
                fs.appendFile("log.txt", JSON.parse(body).imdbRating + "\n", function(err) {});
                fs.appendFile("log.txt", JSON.parse(body).Country + "\n", function(err) {});
                fs.appendFile("log.txt", JSON.parse(body).Language + "\n", function(err) {});
                fs.appendFile("log.txt", JSON.parse(body).Plot + "\n", function(err) {});
                fs.appendFile("log.txt", JSON.parse(body).Actors + "\n", function(err) {});
                fs.appendFile("log.txt", JSON.parse(body).Website + "\n", function(err) {});
                fs.appendFile("log.txt", "--------------" + "\n", function(err) {});
            }
        }
    });

}

function runDo() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        console.log(data);

        var dataArr = data.split(",");

        runSpot(dataArr[1]);

    });
}
