const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')

const router=express.Router();
router.post('/createstamp', async (req, resp) => {


    let documentHash = req.body.documentHash
    let privateKey = req.body.privateKey
    console.log(req.body.documentHash);
    // privateKey = fs.readFileSync('key.txt', 'utf-8');
    const createStamp = (documentHash, privateKey) => {
        const sign = crypto.createSign('SHA256');


        sign.update(Buffer.from(documentHash, 'hex'));


        const signature = sign.sign(privateKey, 'hex');
        const publicKey = crypto.createPublicKey(privateKey);
        const publicKeyBase64 = publicKey.export({ format: 'pem', type: 'spki' }).toString('base64');
        let data =
        {
            signature: signature
        }
        return data;

    }

    let stamp = createStamp(documentHash, privateKey);
    console.log(stamp)
    resp.send(stamp)
})
module.exports=router