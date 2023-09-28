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
  console.log('Connected to MySQL as id ' + connection.threadId);
});

let query1=`select * from Users`;
const insertInDatabase = async (gmail, userName,table) => {
  const query2 = `INSERT INTO ${table} (gmail, userName) VALUES ("${gmail}", "${userName}")`;
  const values = [gmail, userName];

  try {
    await new Promise((resolve, reject) => {
      connection.query(query2, values, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error; // Re-throw the error if needed
  }
};

const fetchFromDatabase = (gmail,table) => {
  return new Promise((resolve, reject) => {
    const query1 = `SELECT * FROM ${table} WHERE gmail="${gmail}"`;

    connection.query(query1, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};


const isUserPresent=async (gmail,table)=>
{
   let mydata=await fetchFromDatabase(gmail,table)
   if(mydata.length==0)
   {
      
      return false
   }
   
   return true;
   
}

const fetchAllFromDatabase = (table) => {
  return new Promise((resolve, reject) => {
    const query1 = `SELECT * FROM ${table}`;

    connection.query(query1, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};

const deleteAllFromDatabase = (table) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${table}`; // Replace 'Users' with the name of your table

    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};


module.exports = {
  insertInDatabase,
  fetchFromDatabase,
  isUserPresent,
  fetchAllFromDatabase,
  deleteAllFromDatabase
};