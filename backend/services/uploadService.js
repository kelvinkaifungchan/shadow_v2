require('dotenv').config();
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class UploadService {
    constructor(knex) {
        this.knex = knex
    }

    async addVideo(fileName, fileData) {
        console.log("Uploading video to AWS")
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: fileName,
            ContentType: 'video/mp4',
            Body: fileData
        };
        console.log("LET ME KNOW PARAMS",params);
        try {
            let submission = await s3.upload(params).promise()
            console.log("Uploaded Data", submission)
            console.log("Video upload successful")
            return
        } catch (err) {
            console.log(err)
        }
    }

    async addAudio(body) {
        console.log("Uploading audio to AWS")
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: body.fileName,
            ContentType: 'video/mp3',
            Body: body.fileData
        };
        try {
            let submission = await s3.upload(params).promise()
            console.log("Uploaded Data", submission)
            console.log("Audio upload successful")
            return
        } catch (err) {
            console.log(err)
        }
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

module.exports = UploadService