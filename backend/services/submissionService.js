class SubmissionService {
    constructor(knex){
        this.knex = knex;
    }

    //Method to add submission
    async add(body){
        if (body.type === "flashcard"){
            console.log("Adding submission to flashcard");
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
            .insert({
                user_id: user_id[0].id ,
                flashcard_id: body.flashcardId,
                flashcardSubmissionRecording: body.flashcardSubmissionRecording,
                flashcardSubmissionStatus: true
            })
            .into("flashcardSubmission")
            .returning("id");
        } 
        else if (body.type === "dictation"){
            console.log("Adding submission to dictation");
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
            .insert({
                user_id: user_id[0].id,
                dictation_id: body.dictationId,
                dictationSubmissionPath: body.dictationSubmissionPath,
                dictationSubmissionStatus: true
            })
            .into("dictationSubmission")
            .returning("id");
        }
        else if (body.type === "multipleChoice"){
            console.log("Adding submission to multipleChoice");
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
            .insert({
                user_id: user_id[0].id,
                multipleChoice_id: body.multipleChoiceId,
                multipleChoiceSubmission: body.multipleChoiceSubmission,
                multipleChoiceMarking: body.multipleChoiceMarking,
                multipleChoiceStatus: true
            })
            .into("multipleChoiceSubmission")
            .returning("id");
        }
        else if (body.type === "trueFalse") {
            console.log ("Adding submission to trueFalse")
            let user_id = await this.knex("user").where({
                email: body.email
            }).select("id");
            return this.knex
            .insert({
                user_id: user_id[0].id,
                trueFalse_id: body.trueFalseId,
                trueFalseSubmission: body.trueFalseSubmission,
                trueFalseMarking: body.trueFalseMarking,
                trueFalseSubmissionStatus: true
            })
            .into("trueFalseSubmission")
            .returning("id");
        }
        else {
            return "card type not recognized";
        }
    }

    //Method to delete submission
    async delete(body){
        if (body.type === "flashcard"){
            console.log("Deleting submission from flashcard");
            return this.knex("flashcardSubmission")
            .where("flashcardSubmission.id", body.flashcardSubmissionId)
            .update({
                flashcardSubmissionStatus: false
            });
        
        } 
        else if (body.type === "dictation"){
            console.log("Deleting submission from dictation");
            return this.knex("dictationSubmission")
            .where("dictationSubmission.id", body.dictationSubmissionId)
            .update({
                dictationcardSubmissionStatus: false
            });
        }
        else if (body.type === "multipleChoice"){
            console.log("Deleting submission from multipleChoice");
            return this.knex("multipleChoiceSubmission")
            .where("multipleChoiceSubmission.id", body.multipleChoiceSubmissionId)
            .update({
                multipleChoiceSubmissionStatus: false
            });
        }
        else if (body.type === "trueFalse") {
            console.log("Deleting submission from trueFalse");
            return this.knex("trueFalseSubmission")
            .where("trueFalseSubmission.id", body.trueFalseSubmissionId)
            .update({
                trueFalseSubmissionStatus: false
            });
        }
        else {
            return "card type not recognized";
        }

    }

    //Method to list details of a submission
    async submission(body){
        if (body.type === "flashcard"){
            console.log("Listing details of flashcardSubmission");
            return this.knex("flashcardSubmission")
            .join("user", "flashcardSubmission.user_id", "=", "user.id")
            .where("flashcardSubmission.id", body.flashcardSubmissionId)
            .select("user.displayName", "flashcardSubmission.flashcard_id", "flashcardSubmission.id", "flashcardSubmission.flashcardSubmissionRecording")
            .then((submission) => {
                    return ({
                        displayName: submission[0].displayName,
                        flashcardId: submission[0].flashcard_id,
                        flashcardSubmissionId: submission[0].id,
                        flashcardSubmissionRecording: submission[0].flashcardSubmissionRecording
                    });
            })
        
        } 
        else if (body.type === "dictation"){
            console.log("Listing details of dictationSubmission");
            return this.knex("dictationSubmission")
            .join("user", "dictationSubmission.user_id", "=", "user.id")
            .where("dictationSubmission.id", body.dictationSubmissionId)
            .select("user.displayName", "dictationSubmission.dictation_id", "dictationSubmission.id", "dictationSubmission.dictationSubmissionPath")
            .then((submission) => {
                    return ({
                        displayName: submission[0].displayName,
                        dictationId: submission[0].dictation_id,
                        dictationSubmissionId: submission[0].id,
                        dictationSubmissionPath: submission[0].dictationSubmissionPath
                    });
                
            })
        
        } 
        
        else if (body.type === "multipleChoice"){
            console.log("Listing details of multipleChoiceSubmission");
            return this.knex("multipleChoiceSubmission")
            .join("user", "multipleChoiceSubmission.user_id", "=", "user.id")
            .where("multipleChoiceSubmission.id", body.multipleChoiceSubmissionId)
            .select("user.displayName", "multipleChoiceSubmission.multipleChoice_id", "multipleChoiceSubmission.id", "multipleChoiceSubmission.multipleChoiceSubmission", "multipleChoiceSubmission.multipleChoiceMarking")
            .then((submission) => {
                    return ({
                        displayName: submission[0].displayName,
                        multipleChoiceId: submission[0].multipleChoice_id,
                        multipleChoiceSubmissionId: submission[0].id,
                        multipleChoiceSubmission: submission[0].multipleChoiceSubmission,
                        multipleChoiceSubmissionMarking: submission[0].multipleChoiceMarking
                    });
            })
        }
        else if (body.type === "trueFalse") {
            console.log("Listing details of trueFalseSubmission");
            return this.knex("trueFalseSubmission")
            .join("user", "trueFalseSubmission.user_id", "=", "user.id")
            .where("trueFalseSubmission.id", body.trueFalseSubmissionId)
            .select("user.displayName", "trueFalseSubmission.trueFalse_id", "trueFalseSubmission.id", "trueFalseSubmission.trueFalseSubmission", "trueFalseSubmission.trueFalseMarking")
            .then((submission) => {
                    return ({
                        displayName: submission[0].displayName,
                        trueFalseId: submission[0].trueFalse_id,
                        trueFalseSubmissionId: submission[0].id,
                        trueFalseSubmission: submission[0].trueFalseSubmission,
                        trueFalseSubmissionMarking: submission[0].trueFalseMarking
                    });
            })
        }
        else {
            return "card type not recognized";
        }

    
    }

    //Method to list all submissions of a card
    async list(body){
        if (body.type === "flashcard"){
            console.log("Listing all submissions of flashcard");
            return this.knex("flashcardSubmission")
            .join("user", "flashcardSubmission.user_id", "=", "user.id")
            .join("flashcard", "flashcard.id", "=", "flashcardSubmission.flashcard_id")
            .where("flashcard.id", body.flashcardId)
            .andWhere("flashcardSubmission.flashcardSubmissionStatus", true)
            .select("user.displayName", "user.picture", "flashcardSubmission.flashcard_id", "flashcardSubmission.id", "flashcardSubmission.flashcardSubmissionRecording")
            .then((submissions) => {
                return submissions.map((submission) => {
                    return ({
                        picture: submission.picture,
                        displayName: submission.displayName,
                        flashcardId: submission.flashcard_id,
                        flashcardSubmissionId: submission.id,
                        flashcardSubmissionRecording: submission.flashcardSubmissionRecording
                    });
                })
            })
        
        } 
        else if (body.type === "dictation"){
            console.log("Listing all submissions of dictation");
            return this.knex("dictationSubmission")
            .join("user", "dictationSubmission.user_id", "=", "user.id")
            .join("dictation", "dictation.id", "=", "dictationSubmission.dictation_id")
            .where("dictation.id", body.dictationId)
            .andWhere("dictationSubmission.dictationSubmissionStatus", true)
            .select("user.displayName", "user.picture", "dictationSubmission.dictation_id", "dictationSubmission.id", "dictationSubmission.dictationSubmissionPath")
            .then((submissions) => {
                return submissions.map((submission) => {
                    return ({
                        picture: submission.picture,
                        displayName: submission.displayName,
                        dictationId: submission.dictation_id,
                        dictationSubmissionId: submission.id,
                        dictationSubmissionPath: submission.dictationSubmissionPath
                    });
                })
            })
        
        } 
        
        else if (body.type === "multipleChoice"){
            console.log("Listing all submissions of multipleChoice");
            return this.knex("multipleChoiceSubmission")
            .join("user", "multipleChoiceSubmission.user_id", "=", "user.id")
            .join("multipleChoice", "multipleChoice.id", "=", "multipleChoiceSubmission.multipleChoice_id")
            .where("multipleChoice.id", body.multipleChoiceId)
            .andWhere("multipleChoiceSubmission.multipleChoiceSubmissionStatus", true)
            .select("user.displayName", "user.picture", "multipleChoiceSubmission.multipleChoice_id", "multipleChoiceSubmission.id", "multipleChoiceSubmission.multipleChoiceSubmission", "multipleChoiceSubmission.multipleChoiceMarking")
            .then((submissions) => {
                return submissions.map((submission) => {
                    return ({
                        picture: submission.picture,
                        displayName: submission.displayName,
                        multipleChoiceId: submission.multipleChoice_id,
                        multipleChoiceSubmissionId: submission.id,
                        multipleChoiceSubmission: submission.multipleChoiceSubmission,
                        multipleChoiceSubmissionMarking: submission.multipleChoiceMarking
                    });
                })
            })
        }
        else if (body.type === "trueFalse") {
            console.log("Listing all submissions of trueFalse");
            return this.knex("trueFalseSubmission")
            .join("user", "trueFalseSubmission.user_id", "=", "user.id")
            .join("trueFalse", "trueFalse.id", "=", "trueFalseSubmission.trueFalse_id")
            .where("trueFalse.id", body.trueFalseId)
            .andWhere("trueFalseSubmission.trueFalseSubmissionStatus", true)
            .select("user.displayName", "user.picture", "trueFalseSubmission.trueFalse_id", "trueFalseSubmission.id", "trueFalseSubmission.trueFalseSubmission", "trueFalseSubmission.trueFalseMarking")
            .then((submissions) => {
                return submissions.map((submission) => {
                    return ({
                        picture: submission.picture,
                        displayName: submission.displayName,
                        trueFalseId: submission.trueFalse_id,
                        trueFalseSubmissionId: submission.id,
                        trueFalseSubmission: submission.trueFalseSubmission,
                        trueFalseSubmissionMarking: submission.trueFalseMarking
                    });
                })
            })
        }
        else {
            return "card type not recognized";
        }


    }
}




module.exports = SubmissionService;