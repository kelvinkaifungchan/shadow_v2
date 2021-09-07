require('dotenv').config();
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class RecordingService {
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
        try {
            let submission = await s3.upload(params).promise()
            console.log("Uploaded Data", submission)
            console.log("Video upload successful")
            return
        } catch (err) {
            console.log(err)
        }
    }

    async addAudio(fileName, fileData) {
        console.log("Uploading audio to AWS")
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: fileName,
            ContentType: 'video/mp3',
            Body: fileData
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
}

module.exports = RecordingService