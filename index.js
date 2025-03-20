
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'products'
});
 
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log(`Connected to MySQL database`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware to check required fields for update
const checkRequiredFields = (req, res, next) => {
    const { type, product_name, hsn_code, amount } = req.body;
    if (!type && !product_name && !hsn_code && !amount) {
        return res.status(400).json({ error: "At least one field is required for update" });
    }
    next();
};

// Get all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM product', (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "Failed to fetch products" });
        }
        res.json(results);
    });
});

// Create a new product
app.post('/masters/Create', (req, res) => {
    const { type, product_name, hsn_code, amount } = req.body;

    // Validate required fields
    if (!type || !product_name || !hsn_code || !amount) {
        return res.status(400).json({ error: "All fields (type, product_name, hsn_code, amount) are required" });
    }

    const sql = "INSERT INTO product (type, product_name, hsn_code, amount) VALUES (?, ?, ?, ?)";
    const values = [type, product_name, hsn_code, amount];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error creating product:", err);
            return res.status(500).json({ error: "Failed to create product" });
        }
        return res.json({ message: "Product created successfully" });
    });
});

// Update an existing product
app.post('/masters/Update/:id', checkRequiredFields, (req, res) => {
    const id = req.params.id;
    const { type, product_name, hsn_code, amount } = req.body;
    const updateFields = [];
    const values = [];

    if (type) {
        updateFields.push("type = ?");
        values.push(type);
    }
    if (product_name) {
        updateFields.push("product_name = ?");
        values.push(product_name);
    }
    if (hsn_code) {
        updateFields.push("hsn_code = ?");
        values.push(hsn_code);
    }
    if (amount) {
        updateFields.push("amount = ?");
        values.push(amount);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ error: "No valid fields provided for update" });
    }

    const sql = `UPDATE product SET ${updateFields.join(', ')} WHERE id = ?`;
    db.query(sql, [...values, id], (err, results) => {
        if (err) {
            console.error("Error updating product:", err);
            return res.status(500).json({ error: "Failed to update product" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json({ message: "Product updated successfully" });
    });
});

// Delete a product
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM product WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ error: "Failed to delete product" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json({ message: "Product deleted successfully" });
    });
});

// Get product by name
app.get('/product', (req, res) => {
    const productName = req.query.name;
    const sql = "SELECT * FROM product WHERE product_name = ?";
    db.query(sql, [productName], (err, results) => {
        if (err) {
            console.error("Error fetching product:", err);
            return res.status(500).json({ error: "Failed to fetch product" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json(results[0]);
    });
});
