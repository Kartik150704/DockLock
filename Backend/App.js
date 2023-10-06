const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const fs = require('fs')
const cors = require('cors')
const app = express();
const port = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

const generatekeys=require('./Components/Cryptography/GenerateKeys')
app.use(generatekeys)

const generateStamp=require('./Components/Cryptography/GenerateStamp')
app.use(generateStamp)

const verifysignature=require('./Components/Cryptography/VerifySignature')
app.use(verifysignature)

const login=require('./Components/Authentication/Login')
app.use(login)

const signup=require('./Components/Authentication/Signup')
app.use(signup)

const databaseCRUD=require('./Components/Database/DatabaseCRUD')
app.use(databaseCRUD)


const adddocument=require('./Components/Authentication/AddDocument')
app.use(adddocument);

const serverRunner=require('./Components/serverrunner/ServerRunner')
app.use(serverRunner)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
