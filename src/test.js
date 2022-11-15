const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

// const mysqlConObj = require('config/mysql'); // #2
const { request } = require('express');
// const db = mysqlConObj.init();

app.use(cors());

dotenv.config();

const multer = require("multer");

app.post('/', upload.single('img'), (req, res, next) => {
    res.status(200).send({
        message: "Ok",
        fileInfo: req.file
    })
});

module.exports = app;
