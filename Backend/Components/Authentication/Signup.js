const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')

const database = require('../Database/Database.js'); 

const router=express.Router()

router.post("/user/signup",async (req,resp)=>
{
    let gmail=req.body.gmail;
    let userName=req.body.userName
    let check=req.body.check
    if(check)
    {
        let presence=await database.isUserPresent(gmail,"Users");
        if(!presence)
        {
            resp.send({
                signup:true
            })

        }
        else
        {
            resp.send({
                signup:false
            })
        }
        
    }
    else
    {
        await database.insertInDatabase(gmail,userName,"Users");
        
               resp.send({
                signup:true
            })
        

    }
})


router.post("/issuer/signup",async (req,resp)=>
{
    let gmail=req.body.gmail;
    let userName=req.body.userName
    let check=req.body.check
    if(check)
    {
        let presence=await database.isUserPresent(gmail,"Issuers");
        if(!presence)
        {
            resp.send({
                signup:true
            })

        }
        else
        {
            resp.send({
                signup:false
            })
        }
        
    }
    else
    {
        
            await database.insertInDatabase(gmail,userName,"Issuers");
            resp.send({
                signup:true
            })
        
        

    }
})

module.exports=router