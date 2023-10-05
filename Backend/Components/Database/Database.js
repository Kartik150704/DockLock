const { Client } = require('pg');

// Create a PostgreSQL client with your ElephantSQL credentials
const client = new Client({
  user: 'nxnfvhmo',                    
  host: 'satao.db.elephantsql.com',    
  database: 'nxnfvhmo',               
  password: '6T9U1vBsbhd1b3mTBM4t_FJFwsW5buu3',           
  port: 5432,                          
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL: ' + err.stack);
    return;
  }
  console.log('Connected to PostgreSQL as process id ' + process.pid);
});

const insertInDatabase = async (gmail, userName, table) => {
  const query = `INSERT INTO ${table} (gmail, userName) VALUES ($1, $2)`;
  const values = [gmail, userName];

  try {
    await client.query(query, values);
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error; // Re-throw the error if needed
  }
};

const fetchFromDatabase = async (gmail, table) => {
  const query = `SELECT * FROM ${table} WHERE gmail=$1`;
  const values = [gmail];

  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const isUserPresent = async (gmail, table) => {
  const userData = await fetchFromDatabase(gmail, table);
  return userData.length > 0;
};

const fetchAllFromDatabase = async (table) => {
  const query = `SELECT * FROM ${table}`;

  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const deleteAllFromDatabase = async (table) => {
  const query = `DELETE FROM ${table}`;

  try {
    await client.query(query);
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

module.exports = {
  insertInDatabase,
  fetchFromDatabase,
  isUserPresent,
  fetchAllFromDatabase,
  deleteAllFromDatabase,
  
};
