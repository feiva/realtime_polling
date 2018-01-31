const mongoose = require('mongoose');

//map global promises
mongoose.Promise = global.Promise

//mongoose connect
mongoose.connect('mongodb://mrashanti:bbcabc@ds119688.mlab.com:19688/meat_poll')
.then(() => console.log('mongodb connected'))
.catch(err => console.log(err));
