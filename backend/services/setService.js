class Set {
    constructor(knex){
        this.knex = knex
    };

    //Add a set
    async add(title, desc, user){
        const email = await this.knex("user")
        .where("email", user)
        .select("id");

        return this.knex("set")
        .insert({
            setTitle: title,
            setDesc: desc,
            user_id: email[0].id,
            setStatus: true
        })
        .catch((err) => {
            console.log(err)
        })
    };

    //Edit a specific set
    edit(title, desc, index){
        return this.knex("set")
        .where("id", index)
        .update({
            setTitle: title,
            setDesc: desc,
        })
        .catch((err) => {
            console.log(err)
        });
    };

    //Make a specific set inactive
    delete(index){
        return this.knex("set")
        .where("id", index)
        .update({
            setStatus: false,
        })
        .catch((err) => {
            console.log(err)
        });
    };

    //list all details of a specific set
    set(index){
        let setData = {}
        return this.knex("set")
        .join("user", "set.user_id", "user.id")
        .where("set.id", index)
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
            .where("set_id", index)
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
    list(classroomIndex){
        return this.knex("set")
        .join("classroom_set", "set.id", "classroom_set.set_id")
        .join("classroom", "classroom_set.classroom_id", "classroom.id")
        .where({
            classroom_id: classroomIndex,
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
    async user(user){
        const email = await this.knex("user")
        .where({
            email: user,
        })
        .select("id");

        let setData = {}

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
            })
        })
        .then(()=>{
            return this.knex("tag_set")
            .where("set_id", setData.id)
            .join("tag", "tag_id", "tag.id")
            .select("tag.id", "tag.tagBody")
        })
        .then((tags) => {
            setData.tags = tags.map((tag)=>{
                return {
                    id: tag.id,
                    body: tag.body
                };
            });
        })
        .catch((err) => {
            console.log(err)
        });
    };
}
    
module.exports = Set