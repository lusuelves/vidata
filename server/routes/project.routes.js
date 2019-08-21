require("dotenv").config()
const express = require('express')
const router = express.Router()
var Twitter = require('twitter')
 
const Project = require('../models/Project.model')
const ProjectTrends = require('../models/ProjectTrends.model')

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  // access_token_key: process.env.access_token_key,
  // access_token_secret: process.env.access_token_secret
  bearer_token: process.env.bearer_token
})

router.get('/getAllProjects', (req, res) => {
    ProjectTrends.find()
        .then(allProjects => res.json(allProjects))
        .catch(err => console.log('Error', err))
})

router.get('/getOneProject/:id', (req, res) => {
    ProjectTrends.findById(req.params.id)
        .then(theProject => res.json(theProject))
        .catch(err => console.log('Error', err))
})

router.post('/postProject', (req, res) => {
    Project.create(req.body)
        .then(theNewProject => {
            console.log(theNewProject)
            res.json(theNewProject)})
        .catch(err => console.log('Error', err))
})

router.post('/postProject/Trends', (req, res) => {
    ProjectTrends.create(req.body)
        // .then(theNewProject => res.json(theNewProject))
        .then(x => client.get('trends/place.json', {id: req.body.place})
                .then(tweets => {
                    let results = []
                    tweets[0].trends.forEach(elm => {
                        elm = [elm.name, elm.tweet_volume]
                        results.push(elm)
                    })
                    ProjectTrends.findOneAndUpdate({title: req.body.title}, {$set: {trendsArray: results }}, {new:true})
                    .then(x=>{
                         res.json(x)
                    })
                  //console.log(tweets[0].locations)
                }))
        .catch(err => console.log('Error', err))
})

router.post('/updatePost/Trends', (req,res)=>{
    ProjectTrends.findOneAndUpdate({title: req.body.title}, {$set: {trendsArray: req.body.trendsArray }}, {new:true})
                    .then(x=>{
                        console.log('hola' + x)
                         res.json(x)
                    })
})

module.exports = router