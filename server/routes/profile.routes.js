const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const uploader = require('../configs/cloudinary.config');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    if (!req.file) {
        console.log('problemo')
        next(new Error('No file uploaded!'));
        return;
    }
    console.log('hola')
    console.log(req.user)

    
    User.findByIdAndUpdate(req.user._id, {$set:{profilePic: req.file.secure_url}}  )
    .then(x => {
        console.log(x, "SOY EL LOG")
        res.json(x)})
    .catch(err => console.log(err))
    //res.json({ secure_url: req.file.secure_url })
})

module.exports = router;