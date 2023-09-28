const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')

const database = require('./Database.js'); 

const router=express.Router()

router.get("/user/allentries",async (req,resp)=>
{
    let mydata=await database.fetchAllFromDatabase("Users");
    resp.send(mydata)
})

router.get("/issuer/allentries",async (req,resp)=>
{
    let mydata=await database.fetchAllFromDatabase("Issuers");
    resp.send(mydata)
})


router.post("/user/deleteallentries",async (req,resp)=>
{
    try
    {

        let password=req.body.password;
        if(password=="Kartik@1507")
        {
            await database.deleteAllFromDatabase("Users");
            resp.send({
                dataDeleted:true
            })
    
        }
        else
        {
            resp.send({
                dataDeleted:false
            })
        }
    }
    catch{
        
    }
})


router.post("/issuer/deleteallentries",async (req,resp)=>
{
    try
    {

        let password=req.body.password;
        if(password=="Kartik@1507")
        {
            await database.deleteAllFromDatabase("Issuers");
            resp.send({
                dataDeleted:true
            })
    
        }
        else
        {
            resp.send({
                dataDeleted:false
            })
        }
    }
    catch{
        
    }
})

module.exports=router