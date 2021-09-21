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
        console.log("req.body",req.body);
        console.log("Requesting getting all data for a user")
        if(req.body.email!==undefined){
            let data = {}
            return this.userService
            .user(req.body)
            .then((user) => {
                console.log("ShadowRouter user.user")
                return data.user = user
            })
            .then(() => {
                return this.tagService
                .search(req.body)
            })
            .then((tags) => {
                console.log("ShadowRouter tag.search")
                return data.tags = tags
            })
            .then(() => {
                return this.classroomService
                .list(req.body)
            })
            .then((classrooms) => {
                console.log("ShadowRouter classroom.list")
                return data.classrooms = classrooms
            })
            .then(() => {
                return this.setService
                .user(req.body)
            })
            .then((sets) => {
                console.log("ShadowRouter set.user")
                return data.sets = sets
            })
            .then(() => {
                return this.cardService
                .user(req.body)
            })
            .then((cards) => {
                console.log("ShadowRouter card.user")
                return data.cards = cards
            })
            .then(() => {
                console.log("Data in shadow router")
                return res.json(data)
            })
            .catch((err) => {
                console.log('shadow route err', err);
                return res.status(500).json(err)
            })
        } else {
            return 
        }
    }
}


module.exports = ShadowRouter;

