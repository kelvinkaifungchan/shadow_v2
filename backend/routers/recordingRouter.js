const express = require("express");

class RecordingRouter {
  constructor(recordingService) {
    this.recordingService = recordingService;
  }

  router() {
    let router = express.Router();
    router.post("/video", this.postVideo.bind(this));
    router.post("/audio", this.postAudio.bind(this));
    return router;
  }

  postVideo(req, res) {
    console.log("Requesting creating video recording");
    let recording = req.files.file;
    let fileName = recording.name;
    let fileData = recording.data;
    return this.recordingService
      .addVideo(fileName, fileData)
      .then(() => {
        return res.send("post request is done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postAudio(req, res) {
    console.log("Requesting creating audio recording");
    let recording = req.files.file;
    let fileName = recording.name;
    let fileData = recording.data;
    return this.recordingService
      .addAudio(fileName, fileData)
      .then(() => {
        return res.send("post request is done");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = RecordingRouter;
