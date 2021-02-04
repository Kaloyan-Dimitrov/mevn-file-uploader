const express = require('express');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');

const app = express();
app.use(cors());


const mongoURI = "mongodb://localhost:27017/MevnFileUploader";
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let gfs;
conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({
    storage: storage
});


const port = 8081 || process.env.PORT;

app.post('/upload', upload.array('file'), (req, res) => {
    console.log('recieved files');
    console.log(req.files)
    res.json({ files: req.files });
})

app.get('/all-files', (req, res) => {
    gfs.find().toArray((err, files) => {
        // check if files
        if (!files) {
            return res.json({
                files: null
            });
        } else {
            const f = files
                .map(file => ({
                    ...file,
                    "isImage": new RegExp("image/(png|jpeg)").test(file.contentType)
                }))
                .sort((a, b) => {
                    return (
                        new Date(b["uploadDate"]).getTime() -
                        new Date(a["uploadDate"]).getTime()
                    );
                });

            return res.json({
                files: f
            });
        }
    });
});

app.listen(port, () => console.log(`Example app listening on ${port} port!`))