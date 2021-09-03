class TagService{
    constructor(knex){
        this.knex = knex;
    }
    
    //Add tag
    async add(body){
        console.log("Checking if tag exists")
        const tag = await this.knex("tag").where({
            body: body.tagId
        })
        if (tag.length > 0) {
            if(body.type == "set"){
                console.log("Tag exists, adding to set")
                let tag_id = await this.knex("tag").where({
                    body: body.tagId
                }).select("id");
                // let set_id = await this.knex("set").where({
                //     id: body.location
                // }).select("id");
                const query = await this.knex
                    .insert({
                        set_id: body.location,
                        tag_id: tag_id[0].id
                    })
                    .into("tag_set")
                return query
            }
            else if(body.type == "classroom"){
                console.log("Tag exists, adding to classroom")
                let tag_id = await this.knex("tag").where({
                    body: body.tagId
                }).select("id");           
                const query = await this.knex
                    .insert({
                        classroom_id: body.location,
                        tag_id: tag_id[0].id
                    })
                    .into("tag_classroom")
                return query
            }
            // else if(body.type == "flashcard"){
            //     console.log("Tag exists, adding to flashcard")
            //     let tag_id = await this.knex("tag").where({
            //         body: body.tagId
            //     }).select("id");
            //     const query = await this.knex
            //         .insert({
            //             flashcard_id: body.location,
            //             tag_id: tag_id[0].id
            //         })
            //         .into("tag_flashcard")
            //     return query
            // }
            // else if(body.type == "quizcard"){
            //     console.log("Tag exists, adding to quizcard")
            //     let tag_id = await this.knex("tag").where({
            //         body: body.tagId
            //     }).select("id");
            //     const query = await this.knex
            //         .insert({
            //             quizcard_id: body.location,
            //             tag_id: tag_id[0].id
            //         })
            //         .into("tag_quizcard")
            //     return query
            // }
        }
        else {
            console.log("Tag does not exist, adding to set")
            return this.knex
                .insert({
                    body: body
                })
                .into("tag")
                .then(async () => {
                    if(body.type == "set"){
                        console.log("Tag exists, adding to set")
                        let tag_id = await this.knex("tag").where({
                            body: body.tagId
                        }).select("id");
                        const query = await this.knex
                            .insert({
                                set_id: body.location,
                                tag_id: tag_id[0].id
                            })
                            .into("tag_set")
                        return query
                    }
                    else if(body.type == "classroom"){
                        console.log("Tag exists, adding to classroom")
                        let tag_id = await this.knex("tag").where({
                            body: body.tagId
                        }).select("id");
                        const query = await this.knex
                            .insert({
                                classroom_id: body.location,
                                tag_id: tag_id[0].id
                            })
                            .into("tag_classroom")
                        return query
                    }
                    // else if(body.type == "flashcard"){
                    //     console.log("Tag exists, adding to flashcard")
                    //     let tag_id = await this.knex("tag").where({
                    //         body: body.tagId
                    //     }).select("id");
                    //     const query = await this.knex
                    //         .insert({
                    //             flashcard_id: body.location,
                    //             tag_id: tag_id[0].id
                    //         })
                    //         .into("tag_flashcard")
                    //     return query
                    // }
                    // else if(body.type == "quizcard"){
                    //     console.log("Tag exists, adding to quizcard")
                    //     let tag_id = await this.knex("tag").where({
                    //         body: body.tagId
                    //     }).select("id");
                    //     const query = await this.knex
                    //         .insert({
                    //             quizcard_id: body.location,
                    //             tag_id: tag_id[0].id
                    //         })
                    //         .into("tag_quizcard")
                    //     return query
                    // }
            })

        }
    }

    //Delete tag
    delete(body){
        console.log("Removing tag")
        if(body.type == "set"){
            return this.knex("tag_set")
                .where("tag_set.tag_id", body.tagId)
                .where("tag_set.set_id", body.location)
                .del()
        }
        else if(body.type == "classroom"){
            return this.knex("tag_classroom")
                .where("tag_classroom.tag_id", body.tagId)
                .where("tag_classroom.classroom_id", body.location)
                .del()
        }
        // else if(body.type == "flashcard"){
        //     return this.knex("tag_flashcard")
        //         .where("tag_flashcard.tag_id", body.tagId)
        //         .where("tag_flashcard.flashcard_id", body.location)
        //         .del()
        // }
        // else if(body.type == "quizcard"){
        //     return this.knex("tag_quizcard")
        //         .where("tag_quizcard.tag_id", body.tagId)
        //         .where("tag_quizcard.quizcard_id", body.location)
        //         .del()
        // }
    }

    //List out all the tags a user has
    async search(body){
        console.log("Listing tags")
        let user_id = await this.knex("user").where({
            email: body.email
        }).select("id");

        //This query returns all the tags (in the form of an array) of the user has in his/her classrooms
        var queryClassroom = this.knex("classroom_user")
        .join("tag_classroom", "classroom_user.classroom_id", "=", "tag_classroom.classroom_id")
        .join("tag", "tag_classroom.tag_id", "=", "tag.id")
        .where("class_user.sharedUser_id", user_id[0].id)
        .select("tag.id", "tag.body")
        .then((tags) => {
            return tags.map((tag) => {
                return({
                    tagId: tag.id,
                    tagBody: tag.body
                })
            })

        })

        //This query returns all the tags (in form of an array) of the user has in his/her sets
        var querySet = this.knex("classroom_user")
        .join("classroom_set", "classroom_user.classroom_id", "=", "classroom_set.classroom_id")
        .join("tag_set", "classroom_set.set_id", "=", "tag_set.set_id")
        .join("tag", "tag_set.tag_id", "=", "tag.id")
        .select("tag.id", "tag.body")
        .then((tags) => {
            return tags.map((tag) => {
                return({
                    tagId: tag.id,
                    tagBody: tag.body
                })
            })
        })

        //concatenate the two arrays above to return all the tags of the user
        var tags = queryClassroom.concat(querySet);
        return tags;

        
    }

}

module.exports = TagService;