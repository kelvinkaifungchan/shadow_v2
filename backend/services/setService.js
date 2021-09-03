class Set {
    constructor(knex){
        this.knex = knex
    };

    //Add a set title, desc according to user
    async add(body){
        const email = await this.knex("user")
        .where("email", body.email)
        .select("id");

        return this.knex("set")
        .insert({
            setTitle: body.title,
            setDesc: body.desc,
            user_id: email[0].id,
            setStatus: true
        })
        .catch((err) => {
            console.log(err)
        })
    };

    //Edit a specific set title, desc, accord to index
    edit(body){
        return this.knex("set")
        .where("id", body.setId)
        .update({
            setTitle: body.title,
            setDesc: body.desc,
        })
        .catch((err) => {
            console.log(err)
        });
    };

    //Make a specific set inactive
    delete(body){
        return this.knex("set")
        .where("id", body.setId)
        .update({
            setStatus: false,
        })
        .catch((err) => {
            console.log(err)
        });
    };

    //list all details of a specific set
    set(body){
        let setData = {}
        return this.knex("set")
        .join("user", "set.user_id", "user.id")
        .where("set.id", body.setId)
        .where("set.setStatus", true)
        .select("set.id", "set.setTitle", "set.setDesc", "user.displayName")
        .then((set) => {
            setData.id = set[0].id,
            setData.title = set[0].setTitle,
            setData.description = set[0].setDesc,
            setData.owner = set[0].displayName
        })
        .then(()=>{
            return this.knex("tag_set")
            .where("set_id", body.setId)
            .join("tag", "tag_set.tag_id", "tag.id")
            .select("tag.tagBody", "tag.id")
            .then((tags) => {
                setData.tags = tags.map((tag)=>{
                    return {
                        id: tag.id,
                        body:tag.body
                    };
                });
            })
            .then(()=>{
                return setData
            })
        })
        .catch((err) => {
            console.log(err)
        });
    };

    //list all sets of a classroom
    list(body){
        return this.knex("set")
        .join("classroom_set", "set.id", "classroom_set.set_id")
        .join("classroom", "classroom_set.classroom_id", "classroom.id")
        .where({
            classroom_id: body.classroomId,
            classroomStatus: true
        })
        .select("set.id", "set.setTitle", "set.setDesc")
        .then((sets)=>{
            return sets.map((set) => {
                return ({
                    id: set.id,
                    title: set.setTitle,
                    description: set.setDesc,
                });
            });
        })
        .catch((err) => {
            console.log(err)
        });
    };

    //list all set a user has access to
    async user(body){
        const email = await this.knex("user")
        .where({
            email: body.email,
        })
        .select("id");

        let setData = {};

        return this.knex("set")
        .where({
            user_id: email[0].id,
            setStatus: true
        })
        .then((sets)=>{
            return sets.map((set) => {
                setData.id = set.id
                setData.title = set.setTitle
                setData.description = set.setDesc
                setData.tags = function () {
                    return this.knex("tag_set")
                    .where("set_id", set.id)
                    .join("tag", "tag_id", "tag.id")
                    .select("tag.id", "tag.tagBody")
                    .then((tags) => {
                        return tags.map((tag)=>{
                            return {
                                id: tag.id,
                                body: tag.body
                            };
                        });
                    })
                }
            })
        })

        .catch((err) => {
            console.log(err)
        });
    };
}
    
module.exports = Set