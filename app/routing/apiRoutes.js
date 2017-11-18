// var path = require('path');
// var express = require('express');
var friends = require ('../data/friends');

module.exports = function (app){

//API JSON of all friends
app.get("/api/friends", function(req, res) {
  return res.json(friends)
});

//creates an empty Array that will be populated with data from the matched friend
  var match = {
    name: "",
    photo: "",
    friendDifference: 1000
  };

app.post("/api/new", function(req, res) {
  console.log(req.body);
  var userData = req.body;
  console.log(userData);
  res.json(userData);
  friends.push(userData);
  var userAnswers = userData.answers;
  console.log(userAnswers);
  var hateLevel = 0;

  //Loop through friends object and compare
  for (var i = 0; i < friends.length; i++) {
    hateLevel = 0;
    //Loop through the answers of each friend
    for (var j = 0; j < friends[i].answers[j]; j++) {
      //calculating the difference between each answer and sum them into totalDifference
      hateLevel += Math.abs(parseInt(userAnswers[j]) - parseInt(friends[i].answers[j]));
      //Find best friend match
      if (hateLevel <= match.friendDifference) {
        match.name = friends[i].name;
        match.photo = friends[i].photo;
        match.friendDifference = hateLevel;
      }
    }
  }
  //Pushing new friend to friends API
  res.json(match);
  });

}
