const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')

const database = require('../Database/Database.js'); 

const router=express.Router()

router.post("/user/login",async (req,resp)=>
{
    let gmail=req.body.gmail;
    let userName=req.body.userName
    let presence=await database.isUserPresent(gmail,"Users");
    if(presence)
    {
        resp.send({
            login:true
        })
    }
    else
    {
        resp.send({
            login:false
        })
    }
})
router.post("/issuer/login",async (req,resp)=>
{
    let gmail=req.body.gmail;
    let userName=req.body.userName
    let presence=await database.isUserPresent(gmail,"Issuers");
    if(presence)
    {
        resp.send({
            login:true
        })
    }
    else
    {
        resp.send({
            login:false
        })
    }
})



module.exports=router