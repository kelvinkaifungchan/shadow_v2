class BridgeService {
    constructor(knex) {
        this.knex = knex
    }

    //Add bridge
    async add(body) {
        console.log("adding bridge", body)
        if (body.type === "classroom_set") {
                console.log('body.type === set')
                const share = await this.knex("classroom_set").where({
                    classroom_id: body.classroomId,
                    set_id: body.setId
                })
                if (share.length > 0) {
                    return "already shared"
                } else {
                    return this.knex
                        .insert({
                            classroom_id: body.classroomId,
                            set_id: body.setId
                        })
                        .into("classroom_set")
                        .returning('set_id')
                }
        }
        if (body.type === "set_flashcard") {
            const share = await this.knex("set_flashcard").where({
                set_id: body.setId,
                flashcard_id: body.flashcardId
            })
            if (share.length > 0) {
                return "already shared"
            } else {
                return this.knex
                    .insert({
                        set_id: body.setId,
                        flashcard_id: body.flashcardId
                    })
                    .into("set_flashcard")
            }
        }
        if (body.type === "set_quizcard") {
            console.log('in set_quiz body', body)
            const share = await this.knex("set_quizcard").where({
                set_id: body.setId,
                quizcard_id: body.quizcardId
            })
            if (share.length > 0) {
                return "already shared"
            } else {
                return this.knex
                    .insert({
                        set_id: body.setId,
                        quizcard_id: body.quizcardId
                    })
                    .into("set_quizcard")
                    .returning("quizcard_id")
            }
        }
        if (body.type === "set_dictationcard") {
            const share = await this.knex("set_dictationcard").where({
                set_id: body.setId,
                dictationcard_id: body.dictationcardId
            })
            if (share.length > 0) {
                return "already shared"
            } else {
                return this.knex
                    .insert({
                        set_id: body.setId,
                        dictationcard_id: body.dictationcardId
                    })
                    .into("set_dictationcard")
            }
        }
        else {
            return "bridge type not recognised"
        }

        
    }

    //Delete user permission to set
    delete(body) {
        console.log("removing classroom sharing with user")
        if (body.type === "classroom_set") {
            return this.knex("classroom_set")
            .where("classroom_set.classroom_id", body.classroomId)
            .where("classroom_set.set_id", body.setId)
            .del()
        }
        if (body.type === "set_flashcard") {
            return this.knex("set_flashcard")
            .where("set_flashcard.set_id", body.setId)
            .where("set_flashcard.flashcard_id", body.flashcardId)
            .del()
        }
        if (body.type === "set_quizcard") {
            return this.knex("set_quizcard")
            .where("set_quizcard.set_id", body.setId)
            .where("set_quizcard.quizcard_id", body.quizcardId)
            .del()
        }
        if (body.type === "set_dictationcard") {
            return this.knex("set_dictationcard")
            .where("set_dictationcard.set_id", body.setId)
            .where("set_dictationcard.dictationcard_id", body.dictationcardId)
            .del()
        }
        else {
            return "bridge relationship not found"
        }
    }
}

module.exports = BridgeService;