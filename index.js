const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8081;
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/bank', (req, res) => {
    const sql = "SELECT * FROM bank";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/uom', (req, res) => {
    const sql = "SELECT * FROM uom";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const { id, company_name, Address, phone } = req.body;
    if (!id || !company_name || !Address || !phone) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }
    const sql = "INSERT INTO users (`id`, `company_name`, `Address`, `phone`) VALUES (?,?,?,?)";
    const values = [id, company_name, Address, phone];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("created");
    });
});

app.post('/create1', (req, res) => {
    const { id, product_description, primary, secondary, price } = req.body;
    if (!id || !product_description || !primary || !secondary || !price) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }
    const sql = "INSERT INTO uom (`id`, `product_description`, `primary`, `secondary`, `price`) VALUES (?,?,?,?,?)";
    const values = [id, product_description, primary, secondary, price];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("created");
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json("deleted");
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM uom WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json("deleted");
    });
});


app.put('/update/:id', (req, res) => {
    const sql = "UPDATE users SET `id` = ?, `company_name` = ?, `Address` = ?, `phone` = ? WHERE id = ?";
    const id = req.params.id;
    const { id: newId, company_name, Address, phone } = req.body;
    const values = [newId, company_name, Address, phone, id];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("updated");
    });
});

app.put('/update1/:id', (req, res) => {
    const sql = "UPDATE uom SET `id` = ?, `product_description` = ?, `primary` = ?, `secondary` = ?, `price` = ? WHERE id = ?";
    const id = req.params.id;
    const { id: newId, product_description, primary, secondary, price } = req.body;
    const values = [newId, product_description, primary, secondary, price, id];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("updated");
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
