const express = require("express");


class BridgeRouter {
    constructor(bridgeService) {
        this.bridgeService = bridgeService
    }

    router() {
        let router = express.Router();
        router.post("/", this.post.bind(this))
        router.post("/delete", this.delete.bind(this))
        return router
    }

    post(req, res) {
        console.log("Requesting adding bridge")
        return this.bridgeService
        .add(req.body)
        .then((data) => {
            return res.json(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    delete(req, res) {
        console.log("Requesting removing bridge")
        return this.bridgeService
        .delete(req.body)
        .then((data) => {
            console.log(data)
            return res.json(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

module.exports = BridgeRouter;