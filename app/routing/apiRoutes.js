
const friends = require("../data/friends.js");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();



module.exports = function(app){
    // Displays all current tables as a JSON object
app.get("/api/friends", function (req, res) {
    return res.json(friends);
});
// Post function for friends
app.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    userinfoJSON = req.body;

    console.log(userinfoJSON);

    let totalDifference = [];

    // UserScores = userinfoJSON.scores

    //push score dif into totalDifference
    function getSum(total, num) {
        return total + num;
    }
    //loops through friends array
    for (i = 0; i < friends.length; i++) {

        //grabs the users scores
        const yourScores = userinfoJSON.scores;

        //grabs the current friends scores as an array
        const friendScores = friends[i].scores;



    
      //stores the difference of user and friend scores in an array
      var scoreDifArray = yourScores.map(function(item, index) {
        // In this case item correspond to currentValue of array a, 
        // using index to get value from array b
        return item - friendScores[index];
      })
    



        // //stores the difference of user and friend scores in an array
        //  let scoreDifArray = yourScores.diff(friendScores); 

         //turns each items in the array into an absolute value
         for (x = 0; x < scoreDifArray.length; x++) {
            scoreDifArray[x] = Math.abs(scoreDifArray[x]); 
         }

        //add up the value of the array of the difference in scores
         let scoreDif = scoreDif.reduce(getSum);


            //pushes to an array
        totalDifference.push(scoreDif);

  

         var indexOfMin = function indexOfMin(arr) {
            if (arr.length === 0) {
                return -1;
            }
        
            var min = arr[0];
            var minIndex = 0;
        
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] < min) {
                    minIndex = i;
                    min = arr[i];
                }
            }
        
            return minIndex;
        }

        indexOfMin(totalDifference);
    
        res.json(friends[minIndex]);
        //display the item in friends that coorsponds with minIndex


    }

    //add up scoredif array

    //takes user scores, , and compares to each item in friends array
    // does this by for looping through each item and getting the difference in numbers

    //for loop through
    //push each difference to an array and add them up
    
    // if (tables.length > 4) {

    //     //push userinfoJSON to reserverations
    //     reservations.push(userinfoJSON);
    //     res.json(userinfoJSON);
        
        
    // } else {
    //     //push userinfoJSON to tables
    //     tables.push(userinfoJSON);
    //     res.json(userinfoJSON);
    // }

});

}

