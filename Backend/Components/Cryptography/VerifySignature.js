const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')

const router=express.Router();

router.post('/verifysignature', async (req, resp) => {

    // console.log(req.body)
    let documentHash = req.body.documentHash;
    let publicKey = req.body.publicKey;
    let signature = req.body.signature;
    // publicKey=base64ToPem(publicKey,"PUBLIC KEY","PUBLIC KEY");
    // publicKey=fs.readFileSync("publickey.txt",'utf-8')
    console.log(publicKey)
    const verifyDocument = (documentHash, publicKey, signature) => {
        const verify = crypto.createVerify('SHA256');
        verify.update(Buffer.from(documentHash, 'hex'));

        // Verify the signature
        const isVerified = verify.verify(publicKey, signature, 'hex');

        if (isVerified) {
            console.log('Digital Signature is Verified');

            return true

            // Decoding the hash from the signature
            const decodedHash = Buffer.from(signature, 'hex').toString('utf-8');

        } else {
            console.log('Digital Signature Verification Failed');
            return false
        }
    }

    resp.send(verifyDocument(documentHash, publicKey, signature))
})

module.exports=router