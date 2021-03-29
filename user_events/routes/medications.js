const express = require('express');
const Medication = require('../models/medications');
const passport = require('passport');

const router = express.Router();

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Medication.find({ user_id: req.user._id })
			.then(docs => {
				const response = {
					medications: docs.map(doc => {
						const { _id: id, __v, ...rest } = doc.toObject();
						return {
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
				const { user_id, __v, _id: id, ...rest } = result.toObject();
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

router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		if (req.body._id != null) {
			Medication.findOneAndDelete(
				{ _id: req.body.id },
				{ useFindAndModify: true },
				function (err) {
					if (err) {
						res.status(400).json(err);
					} else {
						res.status(200).json('Successful deletion');
					}
				}
			);
		} else {
			res.status(400).json('Could not find attribute _id in body');
		}
	}
);

router.put(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		if (req.body.id != null) {
			const { id, ...rest } = req.body;
			const medication = new Medication({
				...rest,
			});

			Medication.findOneAndUpdate(
				{ _id: id },
				medication,
				{ new: true, useFindAndModify: true },
				function (err, result) {
					if (err) {
						res.status(400).json(err);
					} else {
						const { __v, user_id, _id: id, ...res } = result;
						res.status(200).json({ id, ...res });
					}
				}
			);
		} else {
			res.status(400).json('Could not find attribute _id in body');
		}
	}
);

module.exports = router;
