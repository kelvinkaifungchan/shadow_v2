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
                user_id: userId[0].id,
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
                user_id: userId[0].id,
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
                user_id: userId[0].id,
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
            let flashcardData = {}
            return this.knex("flashcard")
            .where({
                id: cardId,
                flashcardStatus: true,
            })
            .then((flashcard)=>{
                flashcardData.user_id = flashcard.user_id
                flashcardData.id = flashcard.id
                flashcardData.title = flashcard.flashcardTitle
                flashcardData.body = flashcard.flashcardBody
                flashcardData.recording = flashcard.flashcardRecording
            })
            .then(()=>{
                return this.knex("tag_flashcard")
                .where("flashcard_id", cardId)
                .join("tag", "tag_flashcard.tag_id", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                flashcardData.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body,
                    };
                });
            })
        }
        if(type === "quizcard"){
            let quizcardData = {}
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
                quizcardData.id = quizcard.id,
                quizcardData.user_id = quizcard.user_id,
                quizcardData.title = quizcard.quizcardTitle,
                quizcardData.recording = quizcard.quizcardRecording,
                quizcardData.multipleChoice = quizcard.map((mc)=>{
                    return ({
                        body: mc.multipleChoiceBody,
                        answer: mc.multipleChoiceAnswer,
                        time: mc.multipleChoiceTime
                    })
                })
                quizcardData.trueFalse = quizcard.map((tf)=>{
                    return ({
                        body: tf.trueFalseBody,
                        answer: tf.trueFalseAnswer,
                        time: tf.trueFalseTime
                    })
                })
            })
            .then(()=>{
                return this.knex("quizcard")
                .where("quizcard_id", cardId)
                .join("tag", "tag_quizcard", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                quizcardData.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body,
                    };
                });
            })
        }
        if(type === "dictationcard"){
            let dictationcardData = {}
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
                    user_id: dictationcard.user_id,
                    title: dictationcard.dictationcardTitle,
                    recording: dictationcard.dictationcardRecording,
                })
            })
            .then(()=>{
                return this.knex("dictationcard")
                .where("dictationcard_id", cardId)
                .join("tag", "tag_dictationcard", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                dictationcardData.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body,
                    };
                });
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
        .join("set_flashcard", "set.id", "set_flashcard.set_id")
        .join("flashcard", "set_flashcard.flashcard_id", "flashcard.id")
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
        .then(()=>{
            allCard.flashcard.map((flashcard)=>{
                return this.knex("tag_flashcard")
                .where("flashcard_id", flashcard.id)
                .join("tag", "tag_flashcard", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                allCard.flashcard.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body
                    };
                });
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
            //.join("tag_quizcard", "quizcard.id", "tag_quizcard.quizcard_id")
            //.join("tag", "tag_quizcard.tag_id", "tag.id")
            .then((quizcards)=>{
                allCard.quizcard = quizcards.map((quizcard) => {
                    return {
                        id: quizcard.quizcard_id,
                        user_id: quizcard.user_id,
                        title: quizcard.quizcardTitle,
                        //tag: [...{id:quizcard.tag.id, body:quizcard.tag.body}]
                    }
                })
            })
        })
        .then(()=>{
            allCard.quizcard.map((quizcard)=>{
                return this.knex("tag_quizcard")
                .where("quizcard_id", quizcard.id)
                .join("tag", "tag_quizcard", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                allCard.quizcard.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body
                    };
                });
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
                        user_id: dictationcard.user_id,
                        title: dictationcard.dictationcardTitle,
                    }
                })
            })
        })
        .then(()=>{
            allCard.dictationcard.map((dictationcard)=>{
                return this.knex("tag_dictationcard")
                .where("dictationcard_id", dictationcard.id)
                .join("tag", "tag_dictationcard", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                allCard.quizcard.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body
                    };
                });
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
        .where("user_id", email[0].id)
        .select("id", "flashcardTitle")
        .then((flashcards)=>{
            allCard.flashcard = flashcards.map((flashcard)=>{
                return ({
                    id: flashcard.id,
                    user_id: flashcard.user_id,
                    title: flashcard.flashcardTitle
                })
            })
        })
        .then(()=>{
            allCard.flashcard.map((flashcard)=>{
                return this.knex("tag_flashcard")
                .where("flashcard_id", flashcard.id)
                .join("tag", "tag_flashcard", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                allCard.flashcard.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body
                    };
                });
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
        .then(()=>{
            allCard.quizcard.map((quizcard)=>{
                return this.knex("tag_quizcard")
                .where("quizcard_id", quizcard.id)
                .join("tag", "tag_quizcard", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                allCard.quizcard.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body
                    };
                });
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
        .then(()=>{
            allCard.dictationcard.map((dictationcard)=>{
                return this.knex("tag_dictationcard")
                .where("dictationcard_id", dictationcard.id)
                .join("tag", "tag_dictationcard", "tag.id")
                .select("tag.id", "tag.tagBody")
            })
            .then((tags) => {
                allCard.quizcard.tags = tags.map((tag) => {
                    return {
                        id: tag.id,
                        body: tag.body
                    };
                });
            })
        })
        .then(() => {
            return allCard
        })
    }
}