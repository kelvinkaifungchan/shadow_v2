const express = require("express");

class UserRouter {
    constructor(userService) {
        this.userService = userService
    }

    router() {
        let router = express.Router();

        router.post("/", this.post.bind(this))
        router.put("/displayname", this.putDisplayName.bind(this))
        router.put("/email", this.putEmail.bind(this))
        router.put("/password", this.putPassword.bind(this))
        router.delete("/", this.delete.bind(this))

        return router
    }

    //Router to upload user picture
    async post(req, res) {
        console.log("Uploading user picture")
        return this.userService.updatePicture(req.files.file, req.body)
            .then((data) => {
                console.log(data)
                return res.json(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //Router to edit user displayname
    putDisplayName(req, res) {
        console.log("Editing a user's details")
        return this.userService
            .editDisplayName(req.body)
            .then((data) => {
                console.log(data)
                return res.json(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //Router to edit user email
    putEmail(req, res) {
        console.log("Editing a user's details")
        return this.userService
            .editEmail(req.body)
            .then((data) => {
                console.log(data)
                return res.json(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //Router to edit user password
    putPassword(req, res) {
        console.log("Editing a user's details")
        return this.userService
            .editPassword(req.body)
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