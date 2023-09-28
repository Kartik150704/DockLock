const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kartik@1507',
    database: 'sih',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }

});

const insertDocumentData = (data) => {
    return new Promise((resolve) => {
        const sql = `INSERT INTO DocumentData (
        DocId,
        DocumentName,
        IssuerName,
        IssuerGmail,
        CollectorName,
        CollectorGmail,
        EventName,
        Status,
        ReferenceLink,
        DocumentHash
      ) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        const values = [
            data.DocId,
            data.DocumentName,
            data.IssuerName,
            data.IssuerGmail,
            data.CollectorName,
            data.CollectorGmail,
            data.EventName,
            data.Status,
            data.ReferenceLink,
            data.DocumentHash
        ];

        connection.query(sql, values, (err, results) => {
            if (err) {
                console.log(err)
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

const fetchPendingDocuments = (gmail) => {
    return new Promise((resolve, reject) => {
        const selectSql = `SELECT DocId, DocumentName FROM DocumentData WHERE CollectorGmail = ? AND Status = 'pending'`;

        connection.query(selectSql, [gmail], (err, results) => {
            if (err) {
                console.error(err);
                return reject(err);
            }

            resolve(results);
        });
    });
};

const fetchAllDocumentDetails = (gmail, DocId) => {
    return new Promise((resolve, reject) => {
        const selectSql = `SELECT * FROM DocumentData WHERE CollectorGmail = ? AND Status = 'pending' AND DocId=?`;

        connection.query(selectSql, [gmail, DocId], (err, results) => {
            if (err) {
                console.error(err);
                return reject(err);
            }

            resolve(results);
        });
    });
}


const updateDocumentStatus = (gmail,DocId) => {
    return new Promise((resolve, reject) => {
        const selectSql = `update DocumentData set Status="Collected" where CollectorGmail = ? AND Status = 'pending' AND DocId=?`;

        connection.query(selectSql, [gmail, DocId], (err, results) => {
            if (err) {
                console.error(err);
                return reject(err);
            }

            resolve(results);
        });
    });
}
const dataToInsert = {
    DocID: 1,
    DocumentName: 'Sample Document',
    IssuerName: 'John Doe',
    IssuerGmail: 'john.doe@example.com',
    CollectorName: 'Jane Smith',
    CollectorGmail: 'jane.smith@example.com',
    EventName: 'Event Name',
    Status: 'Pending',
    ReferenceLink: 'https://example.com',
    DocumentHash: 'abc123',
};




module.exports = { insertDocumentData, fetchPendingDocuments, fetchAllDocumentDetails,updateDocumentStatus };