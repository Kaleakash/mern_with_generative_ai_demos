const mysql = require('mysql2');
const readlineSync = require('readline-sync');

// Create connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'RetailPlatform'
});

// Establish connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL successfully!');

  // Get user input
  const emailId = readlineSync.question('Enter emailId: ');
  const password = readlineSync.question('Enter password: ');

  // Prepare and execute query
  connection.execute(
    'SELECT * FROM users WHERE emailId = ? AND password = ?',
    [emailId, password],
    (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }

      if (results.length > 0) {
        console.log('Login successful!');
      } else {
        console.log('Invalid emailId or password.');
      }

      // Close connection
      connection.end();
    }
  );
});
