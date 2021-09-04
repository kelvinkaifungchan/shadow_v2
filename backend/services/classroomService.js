class ClassroomService {
  constructor(knex) {
    this.knex = knex;
  }

  //Method to add classroom
  add(body) {
    console.log("Adding Classroom");
    return this.knex("user")
      .where({
        email: body.email,
      })
      .then((email) => {
        return this.knex
          .insert({
            user_id: email[0].id,
            classroomTitle: body.title,
            classroomDesc: body.desc,
            classroomStatus: true
          })
          .into("classroom");
      });
  }

  //Method to edit classroom
  edit(body) {
    console.log("Editing a classroom");
    return this.knex("classroom").where("id", body.classroomId).update({
      classroomTitle: body.title,
      classroomDesc: body.desc,
    });
  }

  //Method to delete classroom
  delete(body) {
    console.log("Deleting a classroom");
    return this.knex("classroom").where("id", body.classroomId).update({
      classroomStatus: false,
    });
  }

  //Method to list all data of a specific classroom
  classroom(body) {
    console.log("Listing data of a specific classroom");
    let data = {};
    return this.knex("classroom")
      .select(
        "classroom.id",
        "classroom.classroomTitle",
        "classroom.classroomDesc"
      )
      .where("id", body.classroomId)
      .then((classroom) => {
          data.id = classroom[0].id
          data.title = classroom[0].classroomTitle
          data.description = classroom[0].classroomDesc
      })
      .then(() => {
        return this.knex("tag_classroom")
          .where("classroom_id", body.classroomId)
          .innerjoin("tag", "tag_classroom.tag_id", "tag.id")
          .select("tag.tagBody", "tag.id")
      })
      .then((tags) => {
        data.tags = tags.map((tag) => {
          return {
            id: tag.id,
            body: tag.body,
          };
        });
      })
      .then(() => {
        return this.knex("classroom_user")
          .where("classroom_id", body.classroomId)
          .innerjoin("user", "classroom_user.user_id", "user.id")
          .select("user.id", "user.email", "user.displayName")
      })
      .then((shared) => {
        return (data.shared = shared.map((user) => {
          return {
            id: user.id,
            email: user.email,
            displayName: user.displayName
          };
        }));
      })
      .then(() => {
        return data
      })
  }

  //Method to list all classrooms of a user
  async list (body) {
    console.log("Listing all classrooms of a user");
    let user_id = await this.knex("user").where({
      email: body.email
  }).select("id");
    return this.knex("classroom")
    .innerjoin("classroom_user", "classroom.id", "classroom_user.classroo_id")
    .where("classroom.classroomStatus", true)
    .andWhere(function () {
      this.where("classroom.user_id", "=", user_id).orWhere("classroom_user.user_id", user_id)
    })
    .select("classroom.id")
    .then((classrooms) => {
      return classrooms.map((classroom) => {
        let data = {};
        return this.knex("classroom")
          .select(
            "classroom.id",
            "classroom.classroomTitle",
            "classroom.classroomDesc"
          )
          .where("id", classroom.id)
          .then((classroom) => {
              data.id = classroom[0].id
              data.title = classroom[0].classroomTitle
              data.description = classroom[0].classroomDesc
          })
          .then(() => {
            return this.knex("tag_classroom")
              .where("classroom_id", index)
              .innerjoin("tag", "tag_classroom.tag_id", "tag.id")
              .select("tag.tagBody", "tag.id")
          })
          .then((tags) => {
            data.tags = tags.map((tag) => {
              return {
                id: tag.id,
                body: tag.body,
              };
            });
          })
          .then(() => {
            return this.knex("classroom_user")
              .where("classroom_id", index)
              .innerjoin("user", "classroom_user.user_id", "user.id")
              .select("user.id", "user.email", "user.displayName")
          })
          .then((shared) => {
            return (data.shared = shared.map((user) => {
              return {
                id: user.id,
                email: user.email,
                displayName: user.displayName
              };
            }));
          })
          .then(() => {
            return data
          })
      })
    })
  }
}

module.exports = ClassroomService;
