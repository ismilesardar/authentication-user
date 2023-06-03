/**
 * Date: 03/06/2023
 * Subject: Auth project
 * Auth: Ismile Satdar
**/

//third-parity module require
const express = require('express');
const authCont = require('../controller/auth');
const { isSigning, isAdmin } = require('../middleware/auth');
const router = express.Router();

//test router
router.get('/',(req,res)=>{
    console.log('This is testing Route');
    res.status(200).send('This is testing Route');
});

//register Router
router.post('/register',authCont.register);
router.post('/login',authCont.login);
router.get('/auth-check',isSigning,(req,res)=>{
    res.status(200).json({ok: true});
});
router.get('/admin-check',isSigning,isAdmin,(req,res)=>{
    res.status(200).json({ok: true});
});


//module exports
module.exports = router;