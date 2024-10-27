const express = require('express');
const cors = require('cors');
const connection = require('./config/db'); // Import your database connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint for signup
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  // SQL query to insert a new user
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  
  connection.query(sql, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'Error registering user' });
    }
    
    res.status(201).json({ message: 'User registered successfully!', userId: results.insertId });
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
