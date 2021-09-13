const express = require("express");

class CardRouter {
    constructor(cardService, submissionService, feedbackService) {
        this.cardService = cardService
        this.submissionService = submissionService
        this.feedbackService = feedbackService
    }

    router() {
        let router = express.Router();

        router.post("/", this.post.bind(this))
        router.put("/", this.put.bind(this))
        router.delete("/", this.delete.bind(this))
        router.post("/submission", this.postSubmission.bind(this))
        router.delete("/submission", this.deleteSubmission.bind(this))
        router.post("/submission/feedback", this.postFeedback.bind(this))
        router.delete("/submission/feedback", this.deleteFeedback.bind(this))

        return router
    }

    post(req, res) {
        console.log("Requesting adding a card")
        return this.cardService
            .add(req.body)
            .then(() => {
                return this.cardService
                .card(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    put(req, res) {
        console.log("Requesting editing a card")
        return this.cardService
            .edit(req.body)
            .then(() => {
                return this.cardService
                .card(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    delete(req, res) {
        console.log("Requesting deleting card")
        return this.cardService
            .delete(req.body)
            .then(() => {
                return this.cardService
                .card(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    postSubmission(req, res) {
        console.log("Requesting adding a submission")
        return this.submissionService
            .add(req.body)
            .then(() => {
                return this.submissionService
                .submission(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    deleteSubmission(req, res) {
        console.log("Requesting deleting a submission")
        return this.submissionService
            .delete(req.body)
            .then(() => {
                return this.submissionService
                .submission(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    postFeedback(req, res) {
        console.log("Requesting adding a feedback")
        return this.feedbackService
            .add(req.body)
            .then(() => {
                return this.feedbackService
                .feedback(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    deleteFeedback(req, res) {
        console.log("Requesting deleting a feedback")
        return this.feedbackService
            .delete(req.body)
            .then(() => {
                return this.feedbackService
                .feedback(req.body)
            })
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }
}

module.exports = CardRouter;