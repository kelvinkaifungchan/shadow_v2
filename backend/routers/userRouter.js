const express = require("express");

class UserRouter {
    constructor(userService) {
        this.userService = userService
    }

    router() {
        let router = express.Router();

        router.post("/", this.post.bind(this))
        router.put("/", this.put.bind(this))
        router.delete("/", this.delete.bind(this))


        return router
    }
    
    //Router to upload user picture
    async post(req,res){
        console.log("Uploading user picture")
        return this.userService.updatePicture(req.files.icon, req.body)
        .then(() => {
            return this.userService
            .user(req.body)
        })
        .then((data) => {
            console.log(data)
            return res.json(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    //Router to edit user details
    put(req,res) {
        console.log("Editing a user's details")
        return this.userService
        .edit(req.body)
        .then(() => {
            return this.userService
            .user(req.body)
        })
        .then((data) => {
            console.log(data)
            return res.json(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    //Router to delete a user
    delete(req, res) {
        console.log("Deleting a user")
        return this.userService
            .delete(req.body)
            .then(() => {
                return this.userService
                .user(req.body)
            })
            .then((data) => {
                console.log(data)
                return res.json(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


module.exports = UserRouter;