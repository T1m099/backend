const express = require('express');
const Folder = require('../models/folder');
const passport = require('passport');


const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {parent_id,name}=req.body;
    if (name && parent_id) {
        try {
            const folders = await Folder.find({user_id: req.user._id, name,parent_id});
            const returnFolders = folders.map(f => {
                const {user_id, __v, _id: id, ...rest} = f.toObject()
                return {
                    id, ...rest
                }
            })
            return res.status(200).json({folders:returnFolders});
        } catch (error) {
            console.log(err);
            res.status(500).json({
                error,
            });
        }
    } else {
        return res.status(400).json("Invalid folder details");
    }
});

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const folder = new Folder({
            user_id: req.user._id,
            ...req.body
        });
        try {
            const saved = await folder.save()
            const {user_id, file, __v, _id: id, ...rest} = saved.toObject();
            return res.status(201).json({
                id,
                ...rest,
            });
        } catch (error) {
            console.log(err);
            return res.status(500).json({error});
        }
    }
);

module.exports = router;