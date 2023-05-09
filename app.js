const express = require("express");
const app = express();

require("dotenv").config();

const projRoute = require("./api/routes/project");
const eveRoute = require("./api/routes/event");
const empRoute = require("./api/routes/employee");
const userRoute = require("./api/routes/user");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

mongoose.connection.on("error", (err) => {
	console.log("connection failed ");
});

mongoose.connection.on("connected", (connected) => {
	console.log("connected with database....");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/projects", projRoute);
app.use("/event", eveRoute);
app.use("/employees", empRoute);
app.use("/user", userRoute);

app.use((req, res, next) => {
	res.status(404).json({
		error: "bad request",
	});
});

module.exports = app;
