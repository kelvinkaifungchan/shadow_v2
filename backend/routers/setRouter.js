const express = require("express");

class SetRouter {
    constructor(setService) {
        this.setService = setService
    }

    router() {
        let router = express.Router();
        router.post("/", this.post.bind(this))
        router.put("/", this.put.bind(this))
        router.post("/delete", this.delete.bind(this))

        return router
    }

    post(req, res) {
        console.log("Requesting adding set")
        return this.setService
            .add(req.body)
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    put(req, res) {
        console.log("Requesting editing set")
        return this.setService
            .edit(req.body)
            .then(() => {
                return this.setService
                .set(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    delete(req, res) {
        console.log("Requesting deleting set")
        return this.setService
            .delete(req.body)
            .then((data) => {
                 res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }
}

module.exports = SetRouter;
