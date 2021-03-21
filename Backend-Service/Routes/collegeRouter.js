const express = require('express');

const Colleges = require('../Models/College')

const collegeRouter = express.Router();

collegeRouter.route('/')
    .get((req,res) => {
        Colleges.find(req.query)
        .then((colleges) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            if(colleges === null)
             res.json('No college Found');
            res.json(colleges);
        },(err) => res.status(400).json(err.message))
        .catch((err) => res.status(500).json(err.message));
    })

    .post((req, res) => {
        Colleges.create(req.body)
        .then((college) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(college);
        },(err) => res.status(400).json(err.message))
        .catch((err) => res.status(500).json(err.message));
    })

    .delete((req, res) => {
        Colleges.remove(req.query)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },(err) => console.log(err))
        .catch((err) =>console.log(err));
    })

collegeRouter.route('/:collegeId')
    .get((req,res,next) => {
       Colleges.findById(req.params.collegeId)
        .then((college) => {
            Colleges.find(
                {'courses': college.courses }
            )
            .then((resp) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            })
        },(err) => next(err))
        .catch((err) =>next(err));
    })

module.exports = collegeRouter;