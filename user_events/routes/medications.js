const express = require('express');
const Medication = require('../models/medications');
const passport = require('passport');

const router = express.Router();

//get one medications for the user that calls the route
//user attribute comes from the middlware, which reads it from the jwt
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Medication.find({ user_id: req.user._id })
			.then(docs => {
				const response = {
					medications: docs.map(doc => {
						const { _id: id, __v, uniquenessCheck, user_id,  ...rest } = doc.toObject();
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
	}
);


//create a new medication
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const medication = new Medication({
			uniquenessCheck: req.user._id + req.body.title,
			user_id: req.user._id,
			...req.body,
		});
		medication
			.save()
			.then(result => {
				const { user_id, uniquenessCheck,  __v, _id: id, ...rest } = result.toObject();
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


//delete a medication with the given id
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		if (req.body.id != null) {
			Medication.findOneAndDelete(
				{ _id: req.body.id },
				{ useFindAndModify: true },
				function (err) {
					if (err) {
						res.status(400).json(err);
					} else {
						res.status(200).json({msg: 'Successful deletion', id: req.body.id});
					}
				}
			);
		} else {
			res.status(400).json('Could not find attribute _id in body');
		}
	}
);


//update medication with the given id
router.put(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		if (req.body.id != null) {
			const { id, ...rest } = req.body;

			Medication.findOneAndUpdate(
				{ _id: id },
				rest,
				{ new: true, useFindAndModify: true },
				function (err, result) {
					if (err) {
						res.status(400).json(err);
					} else {
						const { __v, user_id, uniquenessCheck, _id: id, ...resp } = result.toObject();
						res.status(200).json({ id, ...resp});
					}
				}
			);
		} else {
			res.status(400).json('Could not find attribute _id in body');
		}
	}
);

module.exports = router;
