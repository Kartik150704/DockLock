const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')

const database = require('../Database/DocumentData.js');
const sendEmail = require('../Notifiers/EmailNotifier.js');
const router = express.Router();

router.post("/issuer/adddocument", async (req, resp) => {
    let userData = req.body;
    console.log(userData)
    let dataToInsert = {
        DocId: userData.DocId,
        DocumentName: userData.DocumentName,
        IssuerName: userData.IssuerName,
        IssuerGmail: userData.IssuerGmail,
        CollectorName: userData.CollectorName,
        CollectorGmail: userData.CollectorGmail,
        EventName: userData.EventName,
        Status: 'Pending',
        ReferenceLink: userData.ReferenceLink,
        DocumentHash: userData.DocumentHash,
    };

    let response = await database.insertDocumentData(dataToInsert)
    console.log(response)
    if (response) {

        const subject = `Important Document Notification`
        const message = ` 

Dear ${userData.CollectorName},

We are writing to inform you that a document titled ${userData.DocumentName} with Document ID ${userData.DocId} has been issued to your name. We kindly request you to promptly collect this document from our website.

You can see your document by clicking on the link below

${userData.ReferenceLink}
Your prompt attention to this matter is appreciated.


Best regards,
IT Team,DocLock
`;

        await sendEmail(userData.CollectorGmail, subject, message);

        resp.send({
            dataAdded: true
        })
    }
    else {
        resp.send({
            dataAdded: false
        })
    }

})


router.post("/user/fetchpendingdocument", async (req, resp) => {
    let gmail = req.body.gmail

    let response = await database.fetchPendingDocuments(gmail)
    resp.send(response);
})


router.post('/user/claimdocument', async (req, resp) => {
    let gmail = req.body.gmail
    let DocId = req.body.DocId;

    let response = await database.fetchAllDocumentDetails(gmail, DocId)
    resp.send(response[0]);
})

router.post("/user/updatestatus", async (req, resp) => {
    let gmail = req.body.gmail
    let DocId = req.body.DocId
    let userName=req.body.userName

    const subject = "Document Claimed Successfully";
    const body = `Dear ${userName},

We are pleased to inform you that your document with Document ID ${DocId} has been successfully claimed.

If you have any questions or need further assistance, please don't hesitate to contact us.

Best regards,
Kartik Yadav
DocLock`;

await sendEmail(gmail,subject,body)

    let response = await database.updateDocumentStatus(gmail, DocId)
    if (response) {
        resp.send({
            collected: true
        })

    }
    else {
        resp.send({
            collected: false
        })
    }
})
module.exports = router