const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const apiRouter = require('./routes/index')
const mongoose = require('mongoose');

// Database connection
mongoose.Promise = global.Promise;
const url = 'mongodb+srv://dfonseca2021:nJPGGV2HE3hYfaMp@tasks.vxwgo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(url, options)
.then(() => console.log('Database sucessfully connected!'))
.catch(err => console.log(err));
    
// Middleware
const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', function (req, res) {
    res.send('Server')
});
app.use('/api', apiRouter);

// PORT
app.set('PORT', process.env.PORT || 5000);
app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
})

// 404 Error 
app.use((req, res, next) => {
 next(createError(404)); 
}); 
app.use(function (err, req, res, next) { 
    console.error(err.message); 
    if (!err.statusCode) err.statusCode = 500; 
    res.status(err.statusCode).send(err.message); 
});
