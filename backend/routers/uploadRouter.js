const express = require("express");


class UploadRouter {
  constructor(uploadService) {
    this.uploadService = uplaoadService;
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
    return this.recordingService
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
    return this.recordingService
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
    console.log(req.files)
    return this.canvasService
        .addCanvas(req.files.img.name, req.files.img.data)
        .then(() => {
            return res.send("Canvas data posted");
        })
        .catch((err) => {
            console.log(err);
        });

}
}

module.exports = UploadRouter;
