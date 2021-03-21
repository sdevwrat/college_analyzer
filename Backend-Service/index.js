const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const collegeRouter = require('./Routes/collegeRouter');
const studentRouter = require('./Routes/studentRouter');


const app = express();
const port = process.env.PORT || 5000;

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
    if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
    return res.status(200).json({});
    }
    return next();
});

mongoose.connect("mongodb+srv://devu:qwerty123@cluster0.xidne.mongodb.net/oneshot?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true})
    .then(() =>console.log('MongoDB connected'))
    .catch(err => console.log('failed to connect DB',err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use('/colleges',collegeRouter);
app.use('/students',studentRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '..', 'client', 'build', 'index.html')
      );
    });
  }

app.listen(port, () => {
console.log(`Server running at port ${port}`);
});
  