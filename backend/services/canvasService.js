require('dotenv').config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class CanvasService{
    constructor(knex){
        this.knex = knex
    }

    async addCanvas(fileName, fileData){
        console.log("Uploading Canvas data to AWS")

        const params = {
            Bucket: process.env.AWS_CANVAS_BUCKET,
            Key: fileName,
            ContentType: 'image/png',
            Body: fileData
        };

        console.log("PARAMS", params)

        try{
            let submission = await s3.upload(params).promise()
            console.log("Uploaded Data", submission)
            console.log("Canvas upload successful")
        } catch (err) {
            console.log(err)
        }


    }



}

module.exports = CanvasService