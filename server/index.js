const express = require('express');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const saltRounds = 10;
let db = undefined;

const app = express();
app.use(cors());


const mongoURI = "mongodb://localhost:27017/MevnFileUploader";
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
MongoClient.connect(mongoURI, (err, d) => {
    if (err) throw err;
    else db = d.db();
    console.log('Connected to the database');
})
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
    res.json({
        files: req.files
    });
});

app.post('/signup', multer().none(), async (req, res) => {
    const resp = await db.collection('users').findOne({
        email: req.body.email
    });
    if (resp) {
        res.send({
            err: 'A user with this email already exists.'
        });
        return;
    }
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        hash_password: hash,
    };
    try {
        const resp = await db.collection('users').insertOne(newUser);
        res.send(resp);
    } catch (err) {
        throw err;
    }
});

app.post('/login', multer().none(), async (req, res) => {
    const resp = await db.collection('users').findOne({
        email: req.body.email
    });
    if (resp) {
        const rightPass = await bcrypt.compare(req.body.password, resp.hash_password);
        if (rightPass) res.send({
            _id: resp._id,
            name: resp.name,
            email: resp.email
        });
        else res.send({
            err: 'Incorrect password.'
        });
    } else {
        res.send({
            err: 'There aren\'t any users, registered with the given information.'
        });
    }
});


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

app.get("/download/:filename", (req, res) => {
    const file = gfs
        .find({
            filename: typeof req.params.filename === 'string' ? req.params.filename : ''
        })
        .toArray((err, files) => {
            if (err) return res.status(400).send(err);
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            }
            const file = files[0];
            res.set('Content-Type', file.contentType);
            res.set('Content-Disposition', 'attachment;');

            gfs.openDownloadStreamByName(req.params.filename).pipe(res)
        });
});


app.listen(port, () => console.log(`Example app listening on ${port} port!`))