const sql = require('mssql');

// Configuration for SQL Server
const config = {
  user: 'sql12649676',          // Database Username
  password: '9mmACpQApR',    // Database Password (replace 'your_password' with your actual password)
  server: 'sql12.freesqldatabase.com', // SQL Server host (Server/Host)
  database: 'sql12649676',      // Database Name
  port:3306, // Replace with your custom port number
};

// Function to run a SQL query
async function runQuery(query) {
  try {
    // Connect to the database
    await sql.connect(config);

    // Execute the query
    const result = await sql.query(query);

    // Return the query result
    return result.recordset;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  } finally {
    // Close the database connection
    sql.close();
  }
}

// Example usage:

let query1=`
create database SIH`
const query = `
create table Users
(
	id int auto_increment primary key,
    gmail varchar(20),
    userName varchar(20)
);
`;
runQuery(query1)
  .then((data) => {
    console.log('Query Result:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
