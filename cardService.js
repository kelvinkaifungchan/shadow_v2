class Card {
    constructor(knex){
        this.knex = knex
    }

    //add a card of flashcard, quizcard, dictation card
    async add(body, setId){
        if(body.type === "flashcard"){
            return this.knex("flashcard")
            .insert({
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
                id: cardId
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
            .where({
                id: cardId
            })
            .then((quizcard)=>{
                return ({
                    id: quizcard.id,
                    title: quizcard.quizcardTitle,
                    recording: quizcard.quizcardRecording,
                })
            })
        }
        if(type === "dictationcard"){
            return this.knex("dictationcard")
            .where({
                id: cardId
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
        return this.knex("set")
    }
}