const express = require('express');

const Students = require('../Models/Student')

const studentRouter = express.Router();

studentRouter.route('/')
    .get((req,res) => {
        Students.find(req.query)
        .then((students) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            if(students === null)
             res.json('No student Found');
            res.json(students);
        },(err) => res.status(400).json(err.message))
        .catch((err) => res.status(500).json(err.message));
    })

    .post((req, res) => {
        Students.create(req.body)
        .then((college) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(college);
        },(err) => res.status(400).json(err.message))
        .catch((err) => res.status(500).json(err.message));
    })

    .delete((req, res) => {
        Students.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },(err) => console.log(err))
        .catch((err) =>console.log(err));
    })

module.exports = studentRouter;