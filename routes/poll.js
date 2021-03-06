const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '466405',
  key: '2c154010285bd06837d6',
  secret: '19ae856ea5021375caf5',
  cluster: 'us2',
  encrypted: true
});


router.get('/', (req, res) =>{
  Vote.find().then(votes => res.json({success:true,
  votes: votes}));
});

router.post('/', (req, res) =>{
const newVote = {
  meat: req.body.meat,
  points: 1
}

new Vote(newVote).save().then(vote => {
  pusher.trigger('poll', 'vote', {
    points: parseInt(vote.points),
    meat: vote.meat
  });

  return res.json({success: true, message: 'Thanks for voting!'});
  });
});


module.exports = router;
