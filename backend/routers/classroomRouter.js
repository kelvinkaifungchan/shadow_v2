const express = require("express");

class ClassroomRouter {
    constructor(classroomService){
        this.classroomService = classroomService;
    }
    router(){
        let router = express.Router();

        router.post("/", this.post.bind(this));
        router.put("/", this.put.bind(this));
        router.post("/delete", this.delete.bind(this));

        return router
    }

    post(req, res){
        console.log("Post request to create a classroom ", req.body);
        return this.classroomService.add(req.body)
        .then((data) => {
            res.json(data)} )
        .catch((err) => {
            return res.status(500).json(err);
        });
    }

    put(req, res){
        console.log("Put request to edit a classroom",req.body);
        return this.classroomService
        .edit(req.body)
        .then(() => {
            return this.classroomService
            .list(req.body)
         })
        .then((data) => {
            console.log("data in edit router", data);
            res.json(data)
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
    }
    
    delete(req, res){
        console.log("Delete request to delete a classroom",req.body);

        return this.classroomService.delete(req.body)
        .then((data)=>{
            res.json(data)
        })
        .catch((err) => {
            return res.status(500).json(err);
        })


    }

}

module.exports = ClassroomRouter;