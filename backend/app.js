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
const BridgeService = require("./services/bridgeService")
const bridgeService = new BridgeService(knex)
const CardService = require("./services/cardService")
const cardService = new CardService(knex)
const ClassroomService = require("./services/classroomService")
const classroomService = new ClassroomService(knex)
const FeedbackService = require("./services/feedbackService")
const feedbackService = new FeedbackService(knex)
const RecordingService = require("./services/recordingService")
const recordingService = new RecordingService(knex)
const SetService = require("./services/setService")
const setService = new SetService(knex)
const SharingService = require("./services/sharingService")
const sharingService = new SharingService(knex)
const SubmissionService = require("./services/submissionService")
const submissionService = new SubmissionService(knex)
const TagService = require("./services/tagService")
const tagService = new TagService(knex)
const UserService = require("./services/userService")
const userService = new UserService(knex)

//Routers
const BridgeRouter = require("./router/bridgeRouter");
app.use("/api/bridge", new BridgeRouter(bridgeService).router());
const UserRouter = require("./router/userRouter");
app.use("/api/user", new UserRouter(userService).router());

//Setup Server
app.listen(8080, () => {
  console.log("app listening on port 8080");
});