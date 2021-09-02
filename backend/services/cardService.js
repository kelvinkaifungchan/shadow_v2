class Card {
    constructor(knex){
        this.knex = knex
    }

    //add a card of flashcard, quizcard, dictation card
    async add(body, user){
        const userId = await this.knex("user")
        .where("email", user)
        .select("id")

        if(body.type === "flashcard"){
            return this.knex("flashcard")
            .insert({
                user_id: userId,
                flashcardTitle: body.flashcardTitle,
                flashcardBody: body.flashcardBody,
                flashcardRecording: body.flashcardRecording,
                flashcardStatus: true,
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(body.type === "quizcard"){
            return this.knex("quizcard")
            .insert({
                user_id: userId,
                quizcardTitle: body.quizcardTitle,
                quizcardRecording: body.quizcardRecording,
                quizcardStatus: true,
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(body.type === "dictationcard"){
            return this.knex("dictationcard")
            .insert({
                user_id: userId,
                dictationcardTitle: body.dictationcardTitle,
                dictationcardRecording: body.dictationcardRecording,
                dictationcardStatus: true,
            })
            .catch((err) => {
                console.log(err)
            });
        }
    };

    edit(body, cardId){
        if(body.type === "flashcard"){
            return this.knex("flashcard")
            .where({
                id: cardId,
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
                id: cardId,
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
                id: cardId,
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

    delete(type, cardId){
        if(type === "flashcard"){
            return this.knex("flashcard")
            .where({
                id: cardId
            })
            .update({
                flashcardStatus: false
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(type === "quizcard"){
            return this.knex("quizcard")
            .where({
                id: cardId
            })
            .update({
                quizcardStatus: false
            })
            .catch((err) => {
                console.log(err)
            });
        }
        if(type === "dictationcard"){
            return this.knex("dictationcard")
            .where({
                id: cardId
            })
            .update({
                dictationcardStatus: false
            })
            .catch((err) => {
                console.log(err)
            });
        }
    };

    card(type, cardId){
        if(type === "flashcard"){
            return this.knex("flashcard")
            .where({
                id: cardId,
                flashcardStatus: true,
            })
            .then((flashcard)=>{
                return ({
                    id: flashcard.id,
                    title: flashcard.flashcardTitle,
                    body: flashcard.flashcardBody,
                    recording: flashcard.flashcardRecording,
                })
            })
        }
        if(type === "quizcard"){
            return this.knex("quizcard")
            .join("multipleChoice", "quizcard.id", "multipleChoice.quizcard_id")
            .join("trueFalse", "quzicard.id", "trueFalse.quzicard_id")
            .where({
                id: cardId,
                quizcardStatus: true,
                multipleChoiceStatus: true
            })
            .orWhere({
                id: cardId,
                quizcardStatus: true,
                trueFalseStatus: true
            })
            .then((quizcard)=>{
                return ({
                    id: quizcard.id,
                    title: quizcard.quizcardTitle,
                    recording: quizcard.quizcardRecording,
                    mcBody: quizcard.multipleChoiceBody,
                    tfBody: quizcard.trueFalseBody,
                    mcAnswer: quizcard.multipleChoiceAnswer,
                    tfAnswer: quizcard.trueFalseAnswer,
                    mcTime: quizcard.multipleChoiceTime,
                    tfTime: quizcard.trueFalseTime,
                })
            })
        }
        if(type === "dictationcard"){
            return this.knex("dictationcard")
            .join("dictation", "dicataioncard.id", "dictation.dictationcard_id")
            .where({
                id: cardId,
                dictationcardStatus: true,
                dictationStatus: true
            })
            .then((dictationcard)=>{
                return ({
                    id: dictationcard.id,
                    title: dictationcard.dictationcardTitle,
                    recording: dictationcard.dictationcardRecording,
                })
            })
        }
    }

    list(setId){
        //master cache
        let allCard = {}

        //query for flashcard
        return this.knex("set")
        .where({
            id: setId,
            set_status: true,
        })
        .join("set_flsahcard", "set.id", "set_flashcard.set_id")
        .join("flashcard", "set_flashcard.flashcard_id", "flashcard.id")
        .then((flashcards)=>{
            allCard.flashcard = flashcards.map((flashcard) => {
                return {
                    id: flashcard.flashcard_id,
                    title: flashcard.flashcardTitle,
                    body: flashcard.flashcardBody
                }
            })
        })

        //query for quizcard
        .then(() => {
            return this.knex("set")
            .where({
                id: setId,
                set_status: true,
            })
            .join("set_quizcard", "set.id", "set_quizcard.set_id")
            .join("quizcard", "set_quizcard.quizcard_id", "quizcard.id")
            .then((quizcards)=>{
                allCard.quizcard = quizcards.map((quizcard) => {
                    return {
                        id: quizcard.quizcard_id,
                        title: quizcard.quizcardTitle,
                    }
                })
            })
        })

        //query for dictationcard
        .then(() => {
            return this.knex("set")
            .where({
                id: setId,
                set_status: true,
            })
            .join("set_dictationcard", "set.id", "set_dictationcard.set_id")
            .join("dictationcard", "set_dictationcard.dictationcard_id", "dictationcard.id")
            .then((dictationcards)=>{
                allCard.dictationcard = dictationcards.map((dictationcard) => {
                    return {
                        id: dictationcard.dictationcard_id,
                        title: dictationcard.dictationcardTitle,
                    }
                })
            })
        })
        .then(() => {
            return allCard
        })
    }

    user(user){
        const email = await this.knex("user")
        .where({
            email: user
        })
        .select("id")

        let allCard = {}

        return this.knex("flashcard")
        .where("user_id", email)
        .select("id", "flashcardTitle")
        .then((flashcards)=>{
            allCard.flashcard = flashcards.map((flashcard)=>{
                return ({
                    id: flashcard.id,
                    title: flashcard.flashcardTitle
                })
            })
        })
        .then(() => {
            return this.knex("quizcard")
            .where("user_id", email)
            .select("id", "quizcardTitle")
            .then((quizcards)=>{
                allCard.quizcard = quizcards.map((quizcard)=>{
                    return ({
                        id: quizcard.id,
                        title: quizcard.quizcardTitle
                    })
                })
            })
        })
        .then(() => {
            return this.knex("dictationcard")
            .where("user_id", email)
            .select("id", "dictationcardTitle")
            .then((dictationcards)=>{
                allCard.dictationcard = dictationcards.map((dictationcard)=>{
                    return ({
                        id: dictationcard.id,
                        title: dictationcard.dictationcardTitle
                    })
                })
            })
        })
        .then(() => {
            return allCard
        })
    }
}