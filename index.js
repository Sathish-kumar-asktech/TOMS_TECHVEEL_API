const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log("Connected to MySQL database");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Get all products
app.get('/data', (req, res) => {
    db.query('SELECT * FROM data', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Get product by id
app.get('/data/:id', (req, res) => {
    const sql = 'SELECT * FROM data WHERE id = ?';
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Database query error: ", err);
            return res.status(500).json({ error: "Database query error", details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No record found with this ID" });
        }
        return res.json(results[0]);
    });
});

app.get('/users/:id', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const id = req.params.id;

  db.query(sql, [id], (err, results) => {
      if (err) {
          console.error("Database query error: ", err);
          return res.status(500).json({ error: "Database query error", details: err });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: "No record found with this ID" });
      }
      return res.json(results[0]);
  });
});

app.post('/add', (req, res) => {
    const sql = "INSERT INTO `data` (`id`, `account_no`, `account_name`, `ifsc_code`, `phone`, `email`, `branch`, `city`, `address`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.id,
        req.body.account_no,
        req.body.account_name,
        req.body.ifsc_code,
        req.body.phone,
        req.body.email,
        req.body.branch,
        req.body.city,
        req.body.address,
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Database insert error: ", err); // Log the detailed error
            return res.status(500).json({ error: "Database insert error", details: err });
        }
        return res.json({ message: "Created", results });
    });
});


app.put('/update/:id', (req, res) => {
    const sql = "UPDATE data SET account_no = ?, account_name = ?, ifsc_code = ?, phone =?, email =?,branch=? ,  city =?, address =? WHERE id = ?";
    const id = req.params.id;
    const values = [
        req.body.account_no,
        req.body.account_name,
        req.body.ifsc_code,
        req.body.phone,
        req.body.email,
        req.body.branch,
        req.body.city,
        req.body.address,
    ]
    db.query(sql, [...values, id], (err, results) => {
        if (err) return res.json(err);
        return res.json("Updated");
    })
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM data WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: "Deleted successfully" });
    });
});
