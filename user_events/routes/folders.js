const express = require('express');
const Folder = require('../models/folder');
const passport = require('passport');

const router = express.Router();

//get all folders for the user calling the route
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const folders = await Folder.find({ user_id: req.user._id });
			const returnFolders = folders.map(f => {
				const { user_id, __v, _id: id, ...rest } = f.toObject();
				return {
					id,
					...rest,
				};
			});
			return res.status(200).json({ folders: returnFolders });
		} catch (error) {
			console.log(err);
			res.status(500).json({
				error,
			});
		}
	}
);


//create new folder
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const folder = new Folder({
			user_id: req.user._id,
			...req.body,
		});
		try {
			const saved = await folder.save();
			const { user_id, file, __v, _id: id, ...rest } = saved.toObject();
			return res.status(201).json({
				id,
				...rest,
			});
		} catch (error) {
			console.log(err);
			return res.status(500).json({ error });
		}
	}
);


//delete folder with given id
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		if (req.body.id != null) {
			Folder.findOneAndDelete(
				{ _id: req.body.id },
				{ useFindAndModify: true },
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
			res.status(400).json('Could not find attribute id in body');
		}
	}
);

module.exports = router;
