const { Client } = require('pg');

// Create a PostgreSQL client with your ElephantSQL credentials
const client = new Client({
  user: 'nxnfvhmo',                    // User
  host: 'satao.db.elephantsql.com',    // Host
  database: 'nxnfvhmo',                // User & Default database
  password: '6T9U1vBsbhd1b3mTBM4t_FJFwsW5buu3',           // Password (replace 'your-password' with your actual password)
  port: 5432,                          // Default PostgreSQL port
});


// client.connect((err) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL: ' + err.stack);
//     return;
//   }
//   console.log('Connected to PostgreSQL as process id ' + process.pid);
// });

const insertDocumentData = async (data) => {
  const query = `
    INSERT INTO DocumentData (
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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;

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

  try {
    await client.query(query, values);
    return true;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

const fetchPendingDocuments = async (gmail) => {
  const query = `
    SELECT DocId, DocumentName FROM DocumentData
    WHERE CollectorGmail = $1 AND Status = 'Pending'
  `;

  try {
    const result = await client.query(query, [gmail]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching pending documents:', error);
    throw error;
  }
};

const fetchAllDocumentDetails = async (gmail, DocId) => {
  const query = `
    SELECT * FROM DocumentData
    WHERE CollectorGmail = $1 AND Status = 'Pending' AND DocId = $2
  `;

  try {
    const result = await client.query(query, [gmail, DocId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching document details:', error);
    throw error;
  }
};

const updateDocumentStatus = async (gmail, DocId) => {
  const query = `
    UPDATE DocumentData
    SET Status = 'Collected'
    WHERE CollectorGmail = $1 AND Status = 'Pending' AND DocId = $2
  `;

  try {
    await client.query(query, [gmail, DocId]);
  } catch (error) {
    console.error('Error updating document status:', error);
    throw error;
  }
};

module.exports = { insertDocumentData, fetchPendingDocuments, fetchAllDocumentDetails, updateDocumentStatus };
