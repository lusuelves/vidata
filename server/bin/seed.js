require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('../models/Project.model')

mongoose.connect(`mongodb://localhost/Vidata`, { useNewUrlParser: true })

const projects = [
    {
        title: 'Test',
        description: 'Testing',
        imageUrl: '../images/trump.png',
        public: true,
        topic: 'test',
        author: 'id'
    }
]

Project.create(projects, (err) => {
        if (err) { throw (err) }
      console.log(`Created ${projects.length} projects`)
      mongoose.connection.close()
    })