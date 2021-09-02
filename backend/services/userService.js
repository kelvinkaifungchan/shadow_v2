require('dotenv').config();
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class UserService {
    constructor(knex) {
        this.knex = knex
    }

    //Method to update a users details
    edit(id, displayName, email) {
        ("updating details of a user")
        return this.knex("user")
        .where({
            id: id
        })
        .update({
            displayName: displayName,
            email: email,
        })
    }

    //Method to update user picture
    async updatePicture(picture, email) {
        console.log("Uploading user picture to AWS")
        let fileName = `user/${user_id}/picture.jpeg`
        let fileData = picture.data
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: fileName,
            ContentType: 'image/jpeg',
            Body: fileData
        };
        try {
            let data = await s3.upload(params).promise()
            await this.knex("user")
            .where({
                email: email
            })
            .update({
                picture: data.Location
            })
            return
        } catch (err){
            console.log(err)
        }
    }

    //Method to delete a user
    delete(email) {
        return this.knex("user")
            .where({
                email: email
            }).update({
                userStatus: false
            })
    }

    //Method to return a users details
    user(email) {
        console.log("returning data of a user")
        return this.knex("user")
            .where({
                email: email
            })
            .then((user) => {
                return ({
                    id: user[0].id,
                    displayName: user[0].displayName,
                    email: user[0].email,
                    picture: user[0].picture
                });
            })
    }
}

module.exports = UserService;