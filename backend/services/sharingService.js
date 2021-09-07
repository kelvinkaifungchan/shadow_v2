class SharingService {
    constructor(knex) {
        this.knex = knex
    }

    //Add users to set
    async add(body) {
        console.log("sharing classroom with a user")
        let user_id = await this.knex("user").where({
            email: body.email
        }).select("id");
        const share = await this.knex("classroom_user").where({
            classroom_id: body.classroomId,
            sharedUser_id: user_id[0].id
        })
        const owner = await this.knex("classroom").where({
            user_id: user_id[0].id,
            id: body.classroomId
        })
        if (share.length > 0) {
            return "already shared"
        } else if (owner.length > 0) {
            return
        } else {
            return this.knex
                .insert({
                    classroom_id: body.classroomId,
                    sharedUser_id: user_id[0].id
                })
                .into("classroom_user")
        }
    }

    //Delete user permission to set
    async delete(body) {
        console.log("removing classroom sharing with user")
        let user_id = await this.knex("user").where({
            email: body.email
        }).select("id");
        return this.knex("classroom_user")
            .where("classroom_user.classroom_id", body.classroomId)
            .where("classroom_user.sharedUser_id", user_id[0].id)
            .del()
    }
}

module.exports = SharingService;