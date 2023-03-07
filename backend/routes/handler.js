const express = require('express');
const { TodoList } = require('../models/Schemas.js');
const router = express.Router();
const Schemas = require('../models/Schemas.js');


router.get('/todoes', async (req, res) => {
        const todoesDB = Schemas.TodoList;

    // this code will get all tweets
    //const userTweets = await tweets.find({}, (err, tweetData) => {

    // this code will get all tweets and join the user table
    const todoes = await todoesDB.find({});
    console.log("get /todoes");
    console.log(todoes);
    const todoesString = JSON.stringify(todoes)
    res.set('json');
    res.send(todoesString);
    res.end();
    //console.log(todoesString);

});

router.post('/todoes', (req, res) => {
    const rubric = req.body;
    const todo = rubric.todoes[rubric.todoes.length-1];

    TodoList.findOne({rubric: rubric.rubric}, function(err, foundList) {
        foundList.todoes.push(todo);
        foundList.save();
      });
    
});

router.post('/deleteTodo', (req, res) => {
    console.log(req.body);
    const {rubric, task} = req.body;
    console.log(rubric + "/" + task);
    TodoList.findOne({rubric: rubric}, function(err, foundList) {
        const newTodoes = foundList.todoes.filter(todo => {
            return todo.task !== task;
        })
        foundList.todoes = newTodoes;
        foundList.save();
        console.log(foundList);
    })
});

router.post('/rubric', (req, res) => {
    const rubric = req.body;
    
    const newRubric = new TodoList( {rubric: rubric.rubric, todoes: []});
    newRubric.save();
});

router.post('/deleteRubric', (req, res) => {
    const id = req.body.id;

    TodoList.findByIdAndRemove(id, function(err){
        if (!err) {
          console.log("Delete successful");
        };
      });
})

router.get('/tweets', async (req, res) => {
    const tweets = Schemas.Tweets;

    // this code will get all tweets
    //const userTweets = await tweets.find({}, (err, tweetData) => {

    // this code will get all tweets and join the user table
    const userTweets = await tweets.find({}).populate("user").exec((err, tweetData) => {
        if (err) throw err;
        if (tweetData) {
            res.end(JSON.stringify(tweetData));
        } else {
            res.end();
        }
    });
});

/*
router.post('/addTodo', async (req, res) => {
    const userTweet = req.body.tweetInput;
    const user = Schemas.Users;
    const userId = await user.findOne({username:'eaglefang'}).exec();

    const newTweet = new Schemas.Tweets({
        tweet: userTweet,
        user: userId._id
    });

    try {
        await newTweet.save( (err, newTweetResults) => {
            if (err) res.end('Error Saving.');
            res.redirect('/tweets');
            res.end();
        });
    } catch(err) {
        console.log(err);
        res.redirect('/tweets');
        res.end();
    }
});
*/

/*

// Uncomment to add a new user document to our users table
// To use this, run the backend server, then go to URL: localhost:4000/addUser

router.get('/addUser', async (req, res) => {
    const user = {username: 'eaglefang', fullname: 'Sensei Johnny'};
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save( async(err, newUserResult) => {
            console.log('New user created!');
            res.end('New user created!');
        });
    } catch(err) {
        console.log(err);
        res.end('User not added!');
    }
});
*/

module.exports = router;