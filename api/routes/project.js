const express = require("express");
const router = express.Router();
const Project = require("../model/project");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");

//display details from database on screen

router.get("/", auth, (req, res, next) => {
	// res.status(200).json({

	//     msg:'this is project get request'
	Project.find()
		.then((result) => {
			res.status(200).json({
				projectData: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

//save data from UI to db

router.post("/", (req, res, next) => {
	// console.log(req.body);
	const project = new Project({
		_id: new mongoose.Types.ObjectId(),
		projId: req.body.projId,
		projName: req.body.projName,
		priority: req.body.priority,
		description: req.body.description,
		strtDate: req.body.strtDate,
		endDate: req.body.endDate,
		sprntNo: req.body.sprntNo,
		projManager: req.body.projManager,
		projLead: req.body.projLead,
	});
	project
		.save()
		.then((result) => {
			console.log(result);
			res.status(200).json({
				project: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

//retrieve a particular record using id

router.get("/:id", (req, res, next) => {
	console.log(req.params.id);
	Project.findById(req.params.id)
		.then((result) => {
			res.status(200).json({
				project: result,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

//delete a specific id

router.delete("/:id", (req, res, next) => {
	Project.deleteOne({ _id: req.params.id })
		.then((result) => {
			res.status(200).json({
				message: "product deleted",
				result: result,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
});

//put request :updating value

router.put("/:id", (req, res, next) => {
	console.log(req.params.id);
	Project.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				projId: req.body.projId,
				projName: req.body.projName,
				priority: req.body.priority,
				description: req.body.description,
				strtDate: req.body.strtDate,
				endDate: req.body.endDate,
				sprntNo: req.body.sprntNo,
				projManager: req.body.projManager,
				projLead: req.body.projLead,
			},
		}
	)
		.then((result) => {
			res.status(200).json({
				updated_product: result,
			});
		})

		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
});

module.exports = router;
