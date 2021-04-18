const express = require('express');
const File = require('../models/file');
const utils = require('../cryptograhpy/utils');
const passport = require('passport');

const router = express.Router();



//get the with the id given in the body
//this is a post-request, because the get request normally has no body and we wanted to give the id in the body instead of a URL-parameter
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
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

module.exports = router;
