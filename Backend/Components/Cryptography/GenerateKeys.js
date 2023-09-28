const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')

const router=express.Router();
router.get('/generatekeys',async (req,resp)=>
{
    
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // You can adjust the key size as needed
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });

      resp.send({publicKey,privateKey})
})

module.exports=router