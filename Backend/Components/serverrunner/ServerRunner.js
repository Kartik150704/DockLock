const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')
const axios = require('axios');
const database = require('../Database/Database.js');

const router = express.Router()

router.get("/runserver", async (req, resp) => {

    console.log("request came")
    axios.get('https://serverrunner.onrender.com/fakeserver')
    .then((response) => {
        
    })
    .catch((error) => {
       
    });
    resp.send({ server: true })
})





module.exports = router