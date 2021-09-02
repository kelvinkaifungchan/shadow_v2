const ClassroomService = require("../classroomService")
const knex = require("knex")({
  client: 'postgresql',
  connection: {
    database: 'shadowtest',
    user: 'postgres',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  }
})

describe("Classroom service tests", () => {

    test("Listing for user with no classrooms", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
          .list("test@test.com")
          .then((data) => {expect(data).toEqual([])})
          .catch((err) => {
            console.log(err)
          })
      })

      test("Listing details of a classroom that has not been made", () => {
          const classroomService = new ClassroomService(knex)
          return classroomService
          .classroom(1)
          .then((data) => {expect(data).toEqual([])})
          .catch((err) => {
              console.log(err)
          })
      })
    
    test("Adding classroom for user", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
        .add("Test Classroom", "This classroom has been added during the test", "test@test.com")
        .then(() => {
            return classroomService
            .list("test@test.com")
        })
        .then((data) => {
            expect(data).toEqual([
                {
                    id: 1,
                    title: "Test Classroom",
                    description: "This classroom has been added during the test",
                    tags: [],
                    shared: []
                }
            ])}
        )
    })

    test("Editing a classroom for a user", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
        .edit("Edited Classroom", "This description has been edited", 1)
        .list("test@test.com")
        .then((data) => {
            expect(data).toEqual([
                {
                    id: 1,
                    title: "Edited Classroom",
                    description: "This description has been edited",
                    tags: [],
                    shared: []
                }
            ])}
        )
    })

    test("Listing details of a specific classroom", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
        .classroom(1)
        .then((data) => {
            expect(data).toEqual({
                id: 1,
                title: "Edited Classroom",
                description: "This description has been edited",
                tags: [],
                shared: []
            })
        })
    })

    test ("Deleting a classroom", () => {
        const classroomService = new ClassroomService(knex)
        return classroomService
        .delete(1)
        .list("test@test.com")
        .then((data) => {
            expect(data).toEqual([])
        })
    })

})