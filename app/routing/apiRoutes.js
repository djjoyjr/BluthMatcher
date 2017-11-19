//Dependencies
var friends = require ('../data/friends');

module.exports = function (app){

  //API JSON of all friends
  app.get("/api/friends", function(req, res) {
    return res.json(friends)
  });

  //this creates a new friend when upon completion of the survey
  app.post("/api/new", function(req, res) {

    //creates an empty Array that will be populated with data from the matched friend
      var match = {
        name: "",
        photo: "",
        friendDifference: 1000
      };

    var userData = req.body;
    var userAnswers = userData.answers;
    var hateLevel = 0;

    //These loops compare the new user's answers to existing users' answers and matches the new user with thier matching Bluth
    //The first loop iterating over i goes through each item in the friends.js array.
    for (var i = 0; i < friends.length; i++) {
      hateLevel = 0;
      //This loop compares the numerical value of each individual survey answer with the answers of each existing Bluth
      for (var j = 0; j < friends[i].answers[j]; j++) {
        //This calculates the difference between each answer and sum them into totalDifference
        hateLevel += Math.abs(parseInt(userAnswers[j]) - parseInt(friends[i].answers[j]));
        console.log("your hatred of" + friends[i].name + " is " + hateLevel);
        }
        //Find best friend match
    if (hateLevel <= match.friendDifference) {
      match.name = friends[i].name;
      match.photo = friends[i].photo;
      match.friendDifference = hateLevel;
      }
    }
    //Pushing new friend to friends API
    friends.push(userData);
    res.json(match);
    });

}
