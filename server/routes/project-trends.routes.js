const express = require('express')
const router = express.Router()

const ProjectTrends = require('../models/ProjectTrends.model')

// router.get('/getAllProjects', (req, res) => {
//     Project.find()
//         .then(allProjects => res.json(allProjects))
//         .catch(err => console.log('Error', err))
// })

// router.get('/getOneProject/:id', (req, res) => {
//     Project.findById(req.params.id)
//         .then(theProject => res.json(theProject))
//         .catch(err => console.log('Error', err))
// })

router.post('/postProjectTrends', (req, res) => {
    ProjectTrends.create(req.body)
        .then(theNewProject => res.json(theNewProject))
        .catch(err => console.log('Error', err))
})

module.exports = router