require("dotenv").config();

//FS
const fs = require("fs");

//Express
const express = require("express");
const app = express();

//Setup Database
const knexConfig = require("./knexfile").development
const knex = require("knex")(knexConfig)
const authClass = require("./auth")(knex);

// Set up JWT
const config = require("./config");
const jwt = require("jwt-simple");
const cors = require("cors");

// Authenticate requests
app.use(cors());
app.use(authClass.initialize());
app.use(express.json());
app.use(express.urlencoded());
const users = require("./users");


app.post("/api/login", async function (req, res) {
  console.log(req.body);
  if (req.body.email && req.body.password) {
      console.log(req.body.email, req.body.password);
      var email = req.body.email;
      var password = req.body.password;
      var user = users.find((u) => {
          return u.email === email && u.password === password;
      });
      if (user) {
          var payload = {
              id: user.id,
          };
          var token = jwt.encode(payload, config.jwtSecret);
          res.json({
              token: token,
          });
      } else {
          res.sendStatus(401);
      }
  } else {
      res.sendStatus(401);
  }
})

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
const UserRouter = require("./routers/userRouter");
app.use("/api/user", new UserRouter(userService).router());

//Setup Server
app.listen(8080, () => {
  console.log("app listening on port 8080");
});