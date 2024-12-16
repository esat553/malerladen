const express = require("express");
const cors = require("cors");
const db = require("./db/db");

const User = require("./models/User");
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to the API" });
    });

(async () => {
    try {
        const res = await db.query('SELECT NOW()');
        console.log('Verbindung erfolgreich:', res.rows[0]);
    } catch (error) {
        console.error('Datenbankverbindungsfehler:', error.message);
    }
})();

const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));