const express = require('express');
const File = require('../models/file');
const utils = require('../cryptograhpy/utils')
const passport = require('passport');


const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.body.id != null) {
        console.log("Bis hier her gehts");
        File.findById(req.body.id, function (err, fileObject) {
            if(!err){
                const {_id: id, __v, file, user_id, ...rest} = fileObject.toObject();
                const decryptedFile = utils.decryptData(file, req.user)
                res.status(200).json({
                    id,
                    file: decryptedFile,
                    ...rest,
                });
            }
            else{
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            }
        })
    } else {
        //return res.status(400).json("No name given");
        File.find({user_id: req.user._id})
            .then(docs => {
                const response = {
                    fileMetaData: docs.map(doc => {
                        const {_id: id, timestamp, ...rest} = doc.toObject();
                        return {
                            id,
                            timestamp
                        };
                    }),
                };
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            })
    }
});

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const file = new File({
            user_id: req.user._id,
            timestamp: req.body.timestamp,
            file: utils.encryptData(req.body.file, req.user),
            name: req.body.name
        });
        file
            .save()
            .then(result => {
                const {user_id, __v, _id: id, ...rest} = result.toObject();
                const file = utils.decryptData(result.file ,req.user)
                res.status(201).json({
                    id,
                    file,
                    ...rest,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(409).json('Entity already exists');
            });
    }
);

module.exports = router;