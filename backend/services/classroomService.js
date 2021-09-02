class ClassroomService {
  constructor(knex) {
    this.knex = knex;
  }

  //Method to add classroom
  add(title, desc, user) {
    console.log("Adding Classroom");
    return this.knex("user")
      .where({
        email: user,
      })
      .then((email) => {
        return this.knex
          .insert({
            user_id: email[0].id,
            title: title,
            description: desc,
          })
          .into("classroom");
      });
  }

  //Method to edit classroom
  edit(title, desc, index) {
    console.log("Editing a classroom");
    return this.knex("classroom").where("id", index).update({
      title: title,
      description: desc,
    });
  }

  //Method to delete classroom
  delete(index) {
    console.log("Deleting a classroom");
    return this.knex("classroom").where("id", index).update({
      classroomStatus: false,
    });
  }

  //Method to list all data of a specific classroom
  classroom(index) {
    console.log("Listing data of a specific classroom")
    let data = {}
    return this.knex("classroom")
    .select("classroom.id", "classroom.classroomTitle", "classroom.classroomDesc")
    .where("id", index)
    .then((classroom) => {
        return ({
            id: classroom[0].id,
            title: classroom[0].classroomTitle,
            description: classroom[0].classroomDesc
        })
    })
    .then(() => {
        return this.knex("tag_classroom")
        .where("classroom_id", index)
        .innerjoin("")
    })
  }

  //Method to list all classrooms of a user
  list(user) {
    console.log("Listing all classrooms of a user")
  }
}

module.exports = ClassroomService;
