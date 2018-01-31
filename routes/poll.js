const express = require('express');
router = express.Router();

const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '466405',
  key: '2c154010285bd06837d6',
  secret: '19ae856ea5021375caf5',
  cluster: 'us2',
  encrypted: true
});


router.get('/', (req, res) =>{
  res.send('Poll');
});

router.post('/', (req, res) =>{
  pusher.trigger('poll', 'vote', {
    points: 1,
    os: req.body.os
  });

  return res.json({success: true, message: 'Thanks for voting!'});
});


module.exports = router;
