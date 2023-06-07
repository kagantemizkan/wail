//db.js
const connection = require('./config');

function checkLogin(email, password) {
  // Adapt this function to check users' login credentials
  // If the login credentials are correct, return a valid user object
  // If the login credentials are incorrect, return null or false
  // For example:
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return null;
    }
    if (rows.length > 0) {
      const user = rows[0];
      return user;
    } else {
      return null;
    }
  });
}

module.exports = {
  checkLogin: checkLogin
};