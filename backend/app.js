require("dotenv").config();

//Express
const express = require("express");
const app = express();
//Setup Database
require("dotenv").config();
const knexConfig = require("./knexfile").development
const knex = require("knex")(knexConfig)
const authClass = require("./auth/auth")(knex);

// Set up JWT
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Authenticate requests
app.use(cors());
app.use(authClass.initialize());
app.use(express.json());
app.use(express.urlencoded());

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
const AuthRouter = require("./routers/authRouter");
app.use("/api/auth", new AuthRouter(knex).router());
const BridgeRouter = require("./routers/bridgeRouter");
app.use("/api/bridge", new BridgeRouter(bridgeService).router());
const CardRouter = require("./routers/cardRouter");
app.use("/api/card", new CardRouter(cardService, submissionService, feedbackService).router());
const ClassroomRouter = require("./routers/classroomRouter");
app.use("/api/classroom", new ClassroomRouter(classroomService).router());
const RecordingRouter = require("./routers/recordingRouter");
app.use("/api/recording", new RecordingRouter(recordingService).router());
const SetRouter = require("./routers/setRouter");
app.use("/api/set", new SetRouter(setService).router());
const ShadowRouter = require("./routers/shadowRouter");
app.use("/api/shadow", new ShadowRouter(userService, tagService, classroomService, setService, cardService).router());
const SharingRouter = require("./routers/sharingRouter");
app.use("/api/sharing", new SharingRouter(sharingService).router());
const tagRouter = require("./routers/tagRouter");
app.use("/api/tag", new tagRouter(tagService).router());
const UserRouter = require("./routers/userRouter");
app.use("/api/user", new UserRouter(userService).router());

//Setup Server
app.listen(8080, () => {
  console.log("app listening on port 8080");
});