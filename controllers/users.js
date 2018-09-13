require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');
const router = express.Router();

// Daily CRUD
router.get('/daily/:id',function(req,res){
  db.Daily.find({userId: req.params.id})
    .then(dailys => {
      res.send({ dailyList: dailys});
    }).catch(error => {
      console.log(error);
      res.status(400).send('Bad request for dailies');
    });
});

router.post('/daily',function(req,res){
  db.Daily.create({ 
    userId : req.body.userId,
    name: req.body.name, 
    completed: JSON.parse(req.body.completed), 
    color:req.body.color, 
    userId: req.body.userId})
    .then(createdDaily => { res.send(createdDaily);})
    .catch(error => {
      console.log(error);
      res.status(400).send('Unable to create new daily');
    });
});

router.put('/daily/:id', function(req, res) {
  console.log(req.body);
  db.Daily.findByIdAndUpdate(req.params.id, {$set:{name:req.body.name, completed:JSON.parse(req.body.completed),color:req.body.color}}, function(err, result){
        if(err){
            console.log(err);
            res.status(400).send('unable to update');
        } else {
          console.log(result);
          res.send(result);
        }
    });
});

router.delete('/daily/:id', function (req,res){
  db.Daily.findByIdAndRemove(req.params.id,(error, deleted) => {
    if(error){
      console.log(error);
      res.status(400).send('Unable to delete');
    }
    else {
      res.send(deleted);
    }
  });
});

// Task CRUD
router.get('/task',function(req,res){
  db.Task.find({userId: req.params.id})
    .then(tasks => {
      res.send({ taskList: tasks});
    }).catch(error => {
      console.log(error);
      res.status(400).send('Bad request for tasks');
    });
});

router.post('/task',function(req,res){
  db.Task.create(req.body)
    .then(createdTask => { res.send(createdTask);})
    .catch(error => {
      console.log(error);
      res.status(400).send('Unable to create new task');
    });
});

router.put('/task/:id', function(req, res) {
  req.body.completed = JSON.parse(req.body.completed);
  db.Task.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err, result){
        if(err){
            console.log(err);
            res.status(400).send('unable to update');
        } else {
          res.send(result);
        }
    });
});

router.delete('/task/:id', function (req,res){
  db.Task.findByIdAndRemove(req.params.id,(error, deleted) => {
    if(error){
      console.log(error);
      res.status(400).send('Unable to delete');
    }
    else {
      res.send(deleted);
    }
  });
});

module.exports = router;
