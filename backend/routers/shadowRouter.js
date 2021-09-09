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
        router.post("/", this.post.bind(this))
        return router;
    }

    //Router to get all data for a user
    post (req, res) {
        console.log("Requesting getting all data for a user")
        let data = {}
        return this.userService
        .user(req.body)
        .then((user) => {
            console.log("user",user);
            return data.user = user
        })
        .then(() => {
            console.log('tagsvc.search')
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
            console.log("clsrm from router",classrooms);
            return data.classrooms = classrooms
        })
        .then(() => {
            console.log('setsvc.user')
            return this.setService
            .user(req.body)
        })
        .then((sets) => {
            console.log('setsvc.user done')
            return data.sets = sets
        })
        .then(() => {
            console.log('cardsvc.user')
            return this.cardService
            .user(req.body)
        })
        .then((cards) => {
            console.log('cardsvc.user done')
            return data.cards = cards
        })
        .then(() => {
            return res.json(data)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        })
    }
}


module.exports = ShadowRouter;

