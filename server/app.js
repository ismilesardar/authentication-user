/**
 * Date: 03/06/2023
 * Subject: Auth project
 * Auth: Ismile Satdar
**/

//core module require
const path = require('path');
const {readdirSync} = require('fs');
//third-parity module require
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

//All Thir-pairty modules use middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(morgan('dev'));

//route limiter
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);

//rout middleware
readdirSync('./routes').map(fill => app.use('/api/v1', require(`./routes/${fill}`)));

//undefined router
app.use('*',(req,res) => {
    res.status(404).send('This is Rona Router');
});

//Database connected
mongoose.connect(process.env.DATA_BASE)
        .then((value) =>{
            console.log('Database Connected');
        })
        .catch((err) => {
            console.log(err);
        });

//module exports
module.exports = app;  
