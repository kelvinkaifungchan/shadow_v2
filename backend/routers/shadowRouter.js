const express = require ('express')

class ShadowRouter {
    constructor(userService, tagService, classroomService, setService, cardService) {
        this.userService = userService
        this.tagService = tagService
        this.classroomService = classroomService
        this.setService = setService
        this.cardService = cardService
    }

    router () {
        let router = express.Router()
        router.get("/", this.get.bind(this))
        return router;
    }

    //Router to get all data for a user
    get (req, res) {
        console.log("Requesting getting all data for a user")
        let data = {}
        return this.userService
        .user(req.body)
        .then((user) => {
            return data.user = user
        })
        .then(() => {
            return this.tagService
            .search(req.body)
        })
        .then((tags) => {
            return data.tags = tags
        })
        .then(() => {
            return this.classroomService
            .list(req.body)
        })
        .then((classrooms) => {
            return data.classrooms = classrooms
        })
        .then(() => {
            return this.setService
            .user(req.body)
        })
        .then((sets) => {
            return data.sets = sets
        })
        .then(() => {
            return this.cardService
            .user(req.body)
        })
        .then((cards) => {
            return data.cards = cards
        })
        .then(() => {
            return res.json(data)
        })
        .catch((err) => {
            return res.status(500).json(err)
        })
    }
}


module.exports = ShadowRouter;

