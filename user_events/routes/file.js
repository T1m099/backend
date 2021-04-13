const express = require('express');
const File = require('../models/file');
const utils = require('../cryptograhpy/utils');
const passport = require('passport');

const router = express.Router();


//get all files for the user calling the route
router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        //return res.status(400).json("No name given");
        File.find({user_id: req.user._id})
            .then(docs => {
                const response = {
                    fileMetaData: docs.map(doc => {
                        const {_id: id, file, ...rest} = doc.toObject();
                        return {
                            id,
                            ...rest,
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
            });
    });


//get the with the id given in the body
//this is a post-request, because the get request normally has no body and we wanted to give the id in the body instead of a URL-parameter
router.post('/download', passport.authenticate('jwt', {session: false}), (req, res) => {
    try {
        File.findById(req.body.id, function (err, fileObject) {
            if (!err) {
                const {
                    _id: id,
                    __v,
                    file,
                    user_id,
                    ...rest
                } = fileObject.toObject();
                const decryptedFile = utils.decryptData(file, req.user);
                res.status(200).json({
                    id,
                    file: decryptedFile,
                    ...rest,
                });
            } else {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            error: err, msg: "id not found in body"
        });
    }
});


//upload a new file
router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {file, ...rest} = req.body;
        const newFile = new File({
            user_id: req.user._id,
            file: utils.encryptData(file, req.user),
            ...rest
        });
        newFile.save()
            .then(result => {
                const {user_id, __v, _id: id, ...rest} = result.toObject();
                res.status(201).json({
                    id,
                    ...rest,
                    file
                });
            })
            .catch(err => {
                console.log(err);
                res.status(409).json('Entity already exists');
            });
    }
);


//delete the file with the given id
router.delete(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        if (req.body.id != null) {
            File.findOneAndDelete(
                {_id: req.body.id},
                {useFindAndModify: true},
                function (err) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(200).json({
                            msg: 'Successful deletion',
                            id: req.body.id,
                        });
                    }
                }
            );
        } else {
            res.status(400).json('Could not find attribute _id in body');
        }
    }
);

module.exports = router;
