require("dotenv").config();

//FS
const fs = require("fs");

//Express
const express = require("express");
const app = express();

//Setup Database
const knexConfig = require("./knexfile").development
const knex = require("knex")(knexConfig)

// Services
const ClassroomService = require("./services/classroomService")
const classroomService = new ClassroomService(knex)
const FeedbackService = require("./services/feedbackService")
const feedbackService = new FeedbackService(knex)
const UserService = require("./services/userService")
const userService = new UserService(knex)
const RecordingService = require("./services/recordingService")
const recordingService = new RecordingService(knex)

//Setup Server
app.listen(8080, () => {
  console.log("app listening on port 8080");
});