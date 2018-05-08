const path = require('path');
const friends = require ('../data/friends');

module.exports = function(app){
    app.get('/api/friends', function(req, res) {
        console.log("/api/friends hit");
      res.json(friends);
    });
    app.post('/api/friends', function(req, res){
        const user = req.body;
        console.log("survey.html", user.scores);
            console.log("saving user info...");
        const bestMatch = pairingAlg(user);
        console.log(pairingAlg(user));
        res.json(bestMatch);
    
    });
    }

// A formula to pair users with friends from the friends object by comparing
//their scores
    function pairingAlg(u) {
        let you = u.scores;
        let friendlyScores = [];
        let difference = [];
        let totalDifference = [];

// first populate friendly Scores with the arrays from each friend object
        friends.forEach(function(friend){
            friendlyScores.push(friend.scores);
        })

// Loop through each array in friendlyScores, and subtract
        // the user's array of values from that individual array
        // and push it to the difference array
        friendlyScores.forEach(function(score){
            getDifference(you, score);
        })
    
// create a new array that contains the value of each aray's total sum
        // in difference, creating a single value, "total difference"
        // an indicator of how different the user is from their potential match
        for (let j = 0; j < difference.length; j++){
        x = difference[j].reduce((total, amount) => parseInt(total) + parseInt(amount));
        totalDifference.push(x);
        }
    console.log(totalDifference);

// call indexofMin to determine the index of the smallest value in the total difference array
        //which by the merit of the other looping functions above,
        // will correlate with the index of the friend whose scores
        // when subtracted from the user's scores, returns the lowest value
    let minIndex = indexOfMin(totalDifference);
    return friends[minIndex];



// calculation functions called in the above functions ^
    // find the index of the lowest value in the array
function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }
    let min = arr[0];
    let minIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }
    return minIndex;
};
    // calculate the difference between two arrays
function getDifference(a, b) {
    var x = a.map(function(item, index) {
        return Math.abs(parseInt(item) - parseInt(b[index]));   
})
difference.push(x);
}
    };