class FeedbackService {
    constructor(knex) {
        this.knex = knex
    }

    //Method to add feedback
    async add(body) {
        if (body.type === "flashcard") {
            console.log("Adding feedback to flashcard")
            let submission_id = await this.knex("flashcardSubmission").where({
                id: body.submission
            }).select("id");
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
            .insert({
                user_id: user_id[0].id,
                flashcardSubmission_id: submission_id[0].id,
                flashcardFeedbackBody: body.body,
                flashcardFeedbackTime: body.timestamp,
                flashcardFeedbackStatus: true
            })
            .into("flashcardFeedback");
        }
        else if (body.type === "dictationcard") {
            console.log("Adding feedback to dictationcard")
            let submission_id = await this.knex("dictationSubmission").where({
                id: body.submission
            }).select("id");
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
            .insert({
                user_id: user_id[0].id,
                dictationSubmission_id: submission_id[0].id,
                dictationFeedbackBody: body.body,
                dictationFeedbackStatus: true
            })
            .into("flashcardFeedback");
        }
        else {
            return "card type not recognised"
        }
    }

    //Method to edit feedback
    async delete(body) {
        if (body.type === "flashcard") {
            console.log("Deleting feedback to flashcard")
            return this.knex("flashcardFeedback")
            .where("flashcardFeedback.id", body.feedbackId)
            .update({
                flashcardFeedbackStatus: false
            })
        }
        else if (body.type === "dictationcard") {
            console.log("Deleting feedback to dictationcard")
            return this.knex("dictationFeedback")
            .where("dictationFeedback.id", body.feedbackId)
            .update({
                dictationFeedbackStatus: false
            })
        }
        else {
            return "card type not recognised"
        }
    }

    async list(body) {
        if (body.type === "flashcard") {
            console.log("Listing feedback to flashcard")
            return this.knex("flashcardFeedback")
            .join("user", "flashcardFeedback.user_id", "=", "user.id")
            .join("flashcardSubmission", "flashcardFeedback.flashcardSubmission_id", "=", "flashcardSubmission.id")
            .join("flashcard", "flashcardSubmission.flashcard_id", "=", "flashcard.id")
            .where("flashcard.id", body.cardId)
            .select("user.displayName", "flashcardFeedback.flashcardFeedbackBody", "flashcardFeedback.flashcardFeedbackTime", "flashcardFeedback.flashcardSubmission_id", "flashcardFeedback.id")
            .then((feedbacks) => {
                return feedbacks.map((feedback) => {
                    return ({
                        displayName: feedback.displayName,
                        flashcardSubmissionId: feedback.flashcardSubmission_id,
                        flashcardFeedbackId: feedback.id,
                        flashcardFeedbackBody: feedback.flashcardFeedbackBody,
                        flashcardFeedbackTime: feedback.flashcardFeedbackTime,
                    })
                })
            })
        }
        else if (body.type === "dictationcard") {
            console.log("Deleting feedback to dictationcard")
            return this.knex("dictationFeedback")
            .join("user", "dictationFeedback.user_id", "=", "user.id")
            .join("dictationSubmission", "dictationFeedback.dictationSubmission_id", "=", "dictationSubmission.id")
            .join("dictation", "dictationSubmission.dictation_id", "=", "dictation.id")
            .where("dictation.id", body.cardId)
            .select("user.displayName", "dictationFeedback.dictationFeedbackBody",  "dictationFeedback.dictationSubmission_id", "dictationFeedback.id")
            .then((feedbacks) => {
                return feedbacks.map((feedback) => {
                    return ({
                        displayName: feedback.displayName,
                        dictationSubmissionId: feedback.dictationSubmission_id,
                        dictationFeedbackId: feedback.id,
                        dictationFeedbackBody: feedback.dictationFeedbackBody
                    })
                })
            })
        }
        else {
            return "card type not recognised"
        }
    }
}

module.exports = FeedbackService;