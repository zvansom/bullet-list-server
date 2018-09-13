require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');
const router = express.Router();

// Daily CRUD
router.get('/daily',function(req,res){
  db.Daily.find({userId: req.params.id})
    .then(dailys => {
      res.send({ dailyList: dailys});
    }).catch(error => {
      console.log(error);
      res.status(400).send('Bad request for dailies');
    });
});

router.post('/daily',function(req,res){
  db.Daily.create(req.body)
    .then(createdDaily => { res.send(createdDaily) })
    .catch(error => {
      console.log(error);
      res.status(400).send('Unable to create new daily');
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
    .then(createdTask => { res.send(createdTask) })
    .catch(error => {
      console.log(error);
      res.status(400).send('Unable to create new task');
    });
});
