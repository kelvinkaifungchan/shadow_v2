const express = require("express");


class UploadRouter {
  constructor(uploadService) {
    this.uploadService = uploadService;
  }

  router() {
    let router = express.Router();
    router.post("/video", this.postVideo.bind(this));
    router.post("/audio", this.postAudio.bind(this));
    router.post("/canvas", this.postCanvas.bind(this));
    return router;
  }

  postVideo(req, res) {
    console.log("Requesting creating video recording");
    return this.uploadService
      .addVideo(req.files.file.name, req.files.file.data)
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
    return this.uploadService
      .addAudio(fileName, fileData)
      .then(() => {
        return res.send("post request is done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postCanvas(req, res){
    console.log("Requesting to post canvas data");
    return this.uploadService
        .addCanvas(req.files.file.name, req.files.file.data)
        .then(() => {
            return res.send("Canvas data posted");
        })
        .catch((err) => {
            console.log(err);
        });
}
}

module.exports = UploadRouter;
