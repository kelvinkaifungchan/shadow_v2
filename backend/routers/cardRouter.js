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
        router.post("/delete", this.delete.bind(this))
        router.post("/submission", this.postSubmission.bind(this))
        router.delete("/submission", this.deleteSubmission.bind(this))
        router.post("/submission/feedback", this.postFeedback.bind(this))
        router.post("/submission/delfeedback", this.deleteFeedback.bind(this))

        return router
    }

    post(req, res) {
        console.log("Requesting adding a card")
        return this.cardService
            .add(req.body)
            .then((data) => {
                console.log('returning data',data)
                return res.json(data)
            })
            .catch((err) => {
                console.log(err)
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
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }

    postSubmission(req, res) {
        console.log("Requesting adding a submission")

        let body = req.body;
        return this.submissionService
            .add(body)
            .then((data) => {
                if(body.type === "flashcard"){body.flashcardSubmissionId = data[0]} ;
                if(body.type === "dictation"){body.dictationSubmissionId = data[0]};
                if(body.type === "quizcard"){body.quizcardSubmissionId = data[0]};
            })
            .then(() => {
                return this.submissionService
                .submission(body)
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
        let body = req.body;
        return this.feedbackService
            .add(body)
            .then((data) => {
                if(body.type === "flashcard"){body.flashcardFeedbackId = data[0]};
                if(body.type === "dictation"){body.dictationFeedbackId = data[0]};
            })
            .then(() =>{
                return this.feedbackService
                .feedback(body)
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
            .then((data) => {
                return res.json(data)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    }
}

module.exports = CardRouter;