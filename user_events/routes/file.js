const express = require('express');
const File = require('../models/file');
const utils = require('../cryptograhpy/utils')
const passport = require('passport');


const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.body.name != null) {
        File.find({user_id: req.user._id, name: req.body.name})
            .then(docs => {
                const response = {
                    file: docs.map(doc => {
                        const decryptedFile = utils.decryptData(doc.file, req.user)
                        const {_id: id, __v, file, user_id, ...rest} = doc.toObject();
                        return {
                            id,
                            file: decryptedFile,
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
    } else {
        return res.status(400).json("No name given");
    }
});

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const file = new File({
            user_id: req.user._id,
            file: utils.encryptData(req.body.file, req.user),
            name: req.body.name
        });
        file
            .save()
            .then(result => {
                const {user_id, file, __v, _id: id, ...rest} = result.toObject();
                res.status(201).json({
                    id,
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