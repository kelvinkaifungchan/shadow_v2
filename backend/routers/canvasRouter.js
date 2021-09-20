const express = require("express");

class CanvasRouter{
    constructor(canvasService){
        this.canvasService = canvasService;
    }

    router(){
        let router = express.Router();
        router.post("/", this.postCanvas.bind(this));
        return router;
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


module.exports = CanvasRouter;