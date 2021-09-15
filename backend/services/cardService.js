class Card {
    constructor(knex){
        this.knex = knex
    }

    //add a card of flashcard, quizcard, dictation card
    async add(body){
        const userId = await this.knex("user")
        .where("email", body.email)
        .select("id")

        if(body.type === "flashcard"){
            return this.knex("flashcard")
            .insert({
                user_id: userId[0].id,
                flashcardTitle: body.flashcardTitle,
                flashcardBody: body.flashcardBody,
                flashcardRecording: body.flashcardRecording,
                flashcardStatus: true,
            })
            .returning("id")
            .catch((err) => {
                console.log(err)
            });
        }
        if(body.type === "quizcard"){
            return this.knex("quizcard")
            .insert({
                user_id: userId[0].id,
                quizcardTitle: body.quizcardTitle,
                quizcardRecording: body.quizcardRecording,
                quizcardStatus: true,
            })
            .returning("id")
            .then((quizcardId)=>{
                if(body.multipleChoice != null){
                    return body.multipleChoice.map((mcData)=>{
                        return this.knex("multipleChoice")
                        .insert({
                            quizcard_id: quizcardId,
                            multipleChoiceBody: mcData.multipleChoiceBody,
                            multipleChoiceAnswer: mcData.multipleChoiceAnswer,
                            multipleChoiceA: mcData.a,
                            multipleChoiceB: mcData.b,
                            multipleChoiceC: mcData.c,
                            multipleChoiceD: mcData.d,
                            multipleChoiceTime: mcData.multipleChoiceTime,
                            multipleChoiceStatus: true,
                        })
                        .returning("id")
                    })
                }

                if(body.trueFalse != null){
                    body.trueFalse.map((tfData)=>{
                        return this.knex(trueFalse)
                        .insert({
                            quizcard_id: quizcardId,
                            trueFalseBody: tfData.trueFalseBody,
                            trueFalseAnswer: tfData.trueFalseAnswer,
                            trueFalseTime: tfData.trueFalseTime,
                            trueFalseStatus: true,
                        })
                        .returning("id")
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(body.type === "dictationcard"){
            return this.knex("dictationcard")
            .insert({
                user_id: userId[0].id,
                dictationcardTitle: body.dictationcardTitle,
                dictationcardRecording: body.dictationcardRecording,
                dictationcardStatus: true,
            })
            .returning("id")
            .then((dicId) => {
                if(body.dictation != null){
                    return body.dictation.map((dicData)=>{
                        return this.knex("dictation")
                        .insert({
                            user_id: userId[0].id,
                            dictationcard_id: dicId,
                            dictationBody: dicData.dictationBody,
                            dictationRecording: dicData.dictationRecording,
                            dictationStatus: true
                        })
                        .returning("id")
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            });
        }
    };

     //edit a card of flashcard, quizcard, dictation card
    edit(body){
        if(body.type === "flashcard"){
            return this.knex("flashcard")
            .where({
                id: body.cardId,
            })
            .update({
                flashcardTitle: body.flashcardTitle,
                flashcardBody: body.flashcardBody,
                flashcardRecording: body.flashcardRecording,
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(body.type === "quizcard"){
            return this.knex("quizcard")
            .where({
                id: body.cardId,
            })
            .update({
                quizcardTitle: body.quizcardTitle,
                quizcardRecording: body.quizcardRecording,
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(body.type === "dictationcard"){
            return this.knex("dictationcard")
            .where({
                id: body.cardId,
            })
            .update({
                dictationcardTitle: body.dictationcardTitle,
                dictationcardRecording: body.dictationcardRecording,
            })
            .catch((err) => {
                console.log(err)
            });
        }
    };

     //delete a card of flashcard, quizcard, dictation card
    delete(body){
        if(body.type === "flashcard"){
            return this.knex("flashcard")
            .where({
                id: body.cardId
            })
            .update({
                flashcardStatus: false
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(body.type === "quizcard"){
            return this.knex("quizcard")
            .where({
                id: body.cardId
            })
            .update({
                quizcardStatus: false
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(body.type === "dictationcard"){
            return this.knex("dictationcard")
            .where({
                id: body.cardId
            })
            .update({
                dictationcardStatus: false
            })
            .catch((err) => {
                console.log(err)
            });
        }
    };

 //list details of a card of flashcard, quizcard, dictation card
    card(body){
        if(body.type === "flashcard"){
            let flashcardData = {}
            return this.knex("flashcard")
            .where({
                id: body.cardId,
                flashcardStatus: true,
            })
            .then((flashcard)=>{
                flashcardData.user_id = flashcard[0].user_id
                flashcardData.id = flashcard[0].id
                flashcardData.title = flashcard[0].flashcardTitle
                flashcardData.body = flashcard[0].flashcardBody
                flashcardData.recording = flashcard[0].flashcardRecording
            })
            .then(() => {
                return flashcardData
            })
            .catch((err) => {
                console.log(err)
            })
        }
        if(body.type === "quizcard"){
            let quizcardData = {}
            return this.knex("quizcard")
            .join("multipleChoice", "quizcard.id", "multipleChoice.quizcard_id")
            .join("trueFalse", "quizcard.id", "trueFalse.quizcard_id")
            .where({
                id: body.cardId,
                quizcardStatus: true,
                multipleChoiceStatus: true
            })
            .orWhere({
                id: body.cardId,
                quizcardStatus: true,
                trueFalseStatus: true
            })
            .select("quizcard.id", "quizcard.user_id", "quizcard.quizcardTitle", "quizcard.quizcardRecording", "multipleChoice.multipleChoiceBody", "multipleChoice.multipleChoiceAnswer", "multipleChoice.multipleChoiceTime", "trueFalse.trueFalseBody", "trueFalse.trueFalseAnswer", "trueFalse.trueFalseTime")
            .then((quizcard)=>{
                quizcardData.id = quizcard[0].id,
                quizcardData.user_id = quizcard[0].user_id,
                quizcardData.title = quizcard[0].quizcardTitle,
                quizcardData.recording = quizcard[0].quizcardRecording,
                quizcardData.multipleChoice = quizcard[0].map((mc)=>{
                    return ({
                        body: mc.multipleChoiceBody,
                        answer: mc.multipleChoiceAnswer,
                        time: mc.multipleChoiceTime
                    })
                })
                quizcardData.trueFalse = quizcard[0].map((tf)=>{
                    return ({
                        body: tf.trueFalseBody,
                        answer: tf.trueFalseAnswer,
                        time: tf.trueFalseTime
                    })
                })
            })
            .then(() => {
                return quizcardData
            })
            .catch((err) => {
                console.log(err)
            })
        }
        if(body.type === "dictationcard"){
            let dictationcardData = {}
            return this.knex("dictationcard")
            .join("dictation", "dictationcard.id", "dictation.dictationcard_id")
            .where({
                id: body.cardId,
                dictationcardStatus: true,
                dictationStatus: true
            })
            .select("dictationcard.id", "dictationcard.user_id", "dictationcard.dictationcardTitle", "dictationcard.dictationcardRecording")
            .then((dictationcard)=>{
                return ({
                    id: dictationcard[0].id,
                    user_id: dictationcard[0].user_id,
                    title: dictationcard[0].dictationcardTitle,
                    recording: dictationcard[0].dictationcardRecording,
                })
            })
            .then(() => {
                return dictationcardData
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

     //list all cards of a set
    list(body){
        //master cache
        let allCard = {}

        //query for flashcard
        return this.knex("set")
        // .where({
        //     id: body.setId,
        //     set_status: true,
        // })
        .where("set.id", body.setId)
        .andWhere("set.setStatus", true)
        .join("set_flashcard", "set.id", "set_flashcard.set_id")
        .join("flashcard", "set_flashcard.flashcard_id", "flashcard.id")
        .select("set_flashcard.flashcard_id", "flashcard.user_id", "flashcard.flashcardTitle", "flashcard.flashcardBody")
        .then((flashcards)=>{
            allCard.flashcard = flashcards.map((flashcard) => {
                return {
                    id: flashcard.flashcard_id,
                    user_id: flashcard.user_id,
                    title: flashcard.flashcardTitle,
                    body: flashcard.flashcardBody
                }
            })
        })
        
        //query for quizcard
        .then(() => {
            return this.knex("set")
            // .where({
            //     id: body.setId,
            //     set_status: true,
            // })
            .where("set.id", body.setId)
            .andWhere("set.setStatus", true)
            .join("set_quizcard", "set.id", "set_quizcard.set_id")
            .join("quizcard", "set_quizcard.quizcard_id", "quizcard.id")
            .select("set_quizcard.quizcard_id", "quizcard.user_id", "quizcard.quizcardTitle")
            .then((quizcards)=>{
                allCard.quizcard = quizcards.map((quizcard) => {
                    return {
                        id: quizcard.quizcard_id,
                        user_id: quizcard.user_id,
                        title: quizcard.quizcardTitle,
                    }
                })
            })
        })
        

        //query for dictationcard
        .then(() => {
            return this.knex("set")
            // .where({
            //     id: body.setId,
            //     set_status: true,
            // })
            .where("set.id", body.setId)
            .andWhere("set.setStatus", true)
            .join("set_dictationcard", "set.id", "set_dictationcard.set_id")
            .join("dictationcard", "set_dictationcard.dictationcard_id", "dictationcard.id")
            .select("set_dictationcard.dictationcard_id", "dictationcard.user_id", "dictationcard.dictationcardTitle")
            .then((dictationcards)=>{
                allCard.dictationcard = dictationcards.map((dictationcard) => {
                    return {
                        id: dictationcard.dictationcard_id,
                        user_id: dictationcard.user_id,
                        title: dictationcard.dictationcardTitle,
                    }
                })
            })
        })
        
        .then(()=>{
            return this.knex("tag_set")
            .where("set_id", body.setId)
            .join("tag", "tag_set.tag_id", "tag.id")
            .select("tag.tagBody", "tag.id")
            .then((tags) => {
                allCard.tags = tags.map((tag)=>{
                    return {
                        id: tag.id,
                        tagBody:tag.tagBody
                    };
                });
            });
        })
        .then(() => {
            return allCard
        })
        .catch((err) => {
            console.log(err)
        })
    }

    async user(body){
        const email = await this.knex("user")
        .where({
            email: body.email
        })
        .select("id")

        let allCard = {}

        return this.knex("flashcard")
        .where("flashcard.user_id", email[0].id)
        .where("flashcardStatus", true)
        .select("flashcard.id")
        .then(async(fcId)=>{
            allCard.flashcard = await Promise.all(fcId.map((id)=>{
                let data = {}
                return this.knex("flashcard")
                .where("flashcard.id", id.id)
                .select("id", "flashcardTitle","flashcardBody", "flashcardRecording")
                .then((fcdata)=>{
                    data.id = fcdata[0].id
                    data.flashcardTitle = fcdata[0].flashcardTitle
                    data.flashcardBody = fcdata[0].flashcardBody
                    data.flashcardRecording = fcdata[0].flashcardRecording
                })
                .then(()=>{
                    return this.knex("flashcardSubmission")
                    .join("user", "flashcardSubmission.user_id", "user.id")
                    .where("flashcardSubmission.flashcard_id", id.id)
                    .where("flashcardSubmission.flashcardSubmissionStatus", true)
                    .select("user.displayName", "user.picture", "flashcardSubmission.id", "flashcardSubmission.user_id", "flashcardSubmission.flashcardSubmissionRecording")
                })
                .then((subs)=>{
                    data.submission = subs.map((fuck) =>{
                        return {
                            displayName: fuck.displayName,
                            picture: fuck.picture,
                            id: fuck.id,
                            user_id:fuck.user_id,
                            flashcardSubmissionRecording: fuck.flashcardSubmissionRecording
                        }
                    })
                })
                .then(async()=>{
                    data.submission.feedback = await Promise.all(data.submission.map((sub)=>{
                        let feedback = {}
                        return this.knex("flashcardFeedback")
                        .join("user", "flashcardFeedback.user_id", "user.id")
                        .where("flashcardSubmission_id", sub.id)
                        .where("flashcardFeedbackStatus", true)
                        .select("user.displayName", "user.picture", "flashcardFeedback.user_id", "flashcardFeedback.flashcardFeedbackBody", "flashcardFeedback.flashcardFeedbackTime")
                        .then((fcfb)=>{
                            sub.feedback = fcfb.map((fcfbs)=>{
                                return {
                                    user_id: fcfbs.user_id,
                                    picture: fcfbs.picture,
                                    displayName: fcfbs.displayName,
                                    flashcardFeedbackBody: fcfbs.flashcardFeedbackBody,
                                    flashcardFeedbackTime: fcfbs.flashcardFeedbackTime,
                                }
                            })
                        })
                        .then(()=>{
                            return feedback
                        })
                    }))
                })
                .then(()=>{
                    return data
                })
            }))
            return allCard.flashcard
        })
        .then(() => {
            return this.knex("quizcard")
            .where("user_id", email[0].id)
            .where("quizcardStatus", true)
            .select("id", "user_id", "quizcardTitle")
            .then(async(qcId)=>{
                allCard.quizcard = await Promise.all(qcId.map((id)=>{
                    let data = {}
                    return this.knex("quizcard")
                    .where("quizcard.id", id.id)
                    .select("id", "quizcardTitle", "quizcardRecording")
                    .then((qcdata)=>{
                        data.id = qcdata[0].id
                        data.quizcardTitle = qcdata[0].quizcardTitle
                        data.quizcardRecording = qcdata[0].quizcardRecording
                    })
                    .then(()=>{
                        return this.knex("multipleChoice")
                        .where("quizcard_id", id.id)
                        .where("multipleChoiceStatus", true)
                    })
                    .then((mcs)=>{
                        data.multipleChoice = mcs.map((mc) =>{
                            return {
                                id: mc.id,
                                multipleChoiceBody: mc.multipleChoiceBody,
                                multipleChoiceA: mc.multipleChoiceA,
                                multipleChoiceB: mc.multipleChoiceB,
                                multipleChoiceC: mc.multipleChoiceC,
                                multipleChoiceD: mc.multipleChoiceD,
                                multipleChoiceAnswer: mc.multipleChoiceAnswer,
                                multipleChoiceTime: mc.multipleChoiceTime
                            }
                        })
                    })
                    .then(async()=>{
                        data.multipleChoice.submission = await Promise.all(data.multipleChoice.map((sub)=>{
                            let submission = {}
                            return this.knex("multipleChoiceSubmission")
                            .where("multipleChoice_id", sub.id)
                            .where("multipleChoiceStatus", true)
                            .then((mcSub)=>{
                                sub.submission = mcSub.map((mcSubs)=>{
                                    return {
                                        user_id: mcSubs.user_id,
                                        multipleChoiceSubmission: mcSubs.multipleChoiceSubmission,
                                        multipleChoiceMarking: mcSubs.multipleChoiceMarking
                                    }
                                })
                            })
                            .then(()=>{
                                return submission
                            })
                        }))
                    })
                    .then(()=>{
                        return this.knex("trueFalse")
                        .where("quizcard_id", id.id)
                        .where("trueFalseStatus", true)
                    })
                    .then((tfs)=>{
                        data.trueFalse = tfs.map((tf) =>{
                            return {
                                id: tf.id,
                                trueFalseBody: tf.trueFalseBody,
                                trueFalseAnswer: tf.trueFalseAnswer,
                                trueFalseTime: tf.trueFalseTime
                            }
                        })
                    })
                    .then(async()=>{
                        data.trueFalse.submission = await Promise.all(data.trueFalse.map((sub)=>{
                            let submission = {}
                            return this.knex("trueFalseSubmission")
                            .where("trueFalse_id", sub.id)
                            .where("trueFalseSubmissionStatus", true)
                            .then((tfSub)=>{
                                sub.submission = tfSub.map((tfSubs)=>{
                                    return {
                                        user_id: tfSubs.user_id,
                                        trueFalseSubmission: tfSubs.trueFalseSubmission,
                                        trueFalseMarking: tfSubs.trueFalseMarking
                                    }
                                })
                            })
                            .then(()=>{
                                return submission
                            })
                        }))
                    })
                    .then(()=>{
                        return data
                    })
                }))
                return allCard.quizcard
            })
        })
        .then(() => {
            return this.knex("dictationcard")
            .where("dictationcard.user_id", email[0].id)
            .where("dictationcardStatus", true)
            .select("dictationcard.id", "dictationcard.dictationcardTitle")
            .then(async (dictationcards)=>{
                allCard.dictationcard = await Promise.all(dictationcards.map((id)=>{
                    let data = {}
                    return this.knex("dictation")
                    .where("dictationcard_id", id.id)
                    .where("dictationStatus", true)
                    .select("id", "dictationBody", "dictationRecording")
                    .then((dcdata)=>{
                        console.log(dcdata, '<<<<<<<<<<<<,dcdata')
                        data.id = id.id
                        data.dictationcardTitle = id.dictationcardTitle
                        data.dictationBody = dcdata[0].dictationBody
                        data.dictationRecording = dcdata[0].dictationRecording
                    })
                    .then(()=>{
                        return this.knex("dictationSubmission")
                        .where("dictation_id", data.id)
                        .where("dictationSubmissionStatus", true)
                    })
                    .then((subs)=>{
                        data.submission = subs.map((sub) =>{
                            return {
                                id: sub.id,
                                user_id:sub.user_id,
                                dictationSubmissionPath: sub.dictationSubmissionPath
                            }
                        })
                    })
                    .then(async()=>{
                        data.submission.feedback = await Promise.all(data.submission.map((sub)=>{
                            let feedback = {}
                            return this.knex("dictationFeedback")
                            .where("dictationSubmission_id", sub.id)
                            .where("dictationFeedbackStatus", true)
                            .then((fcfb)=>{
                                sub.feedback = fcfb.map((fcfbs)=>{
                                    return {
                                        user_id: fcfbs.user_id,
                                        dictationFeedbackBody: fcfbs.dictationFeedbackBody,
                                    }
                                })
                            })
                            .then(()=>{
                                return feedback
                            })
                        }))
                    })
                    .then(()=>{
                        return data
                    })
                }))
                return allCard.dictationcard
            })
        })
        .then(() => {
            return allCard
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}



module.exports = Card