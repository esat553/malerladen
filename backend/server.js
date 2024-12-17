const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Modelle
const User = require("./models/User");
const Product = require("./models/Product");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parst JSON Daten aus dem Request-Body

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

const SECRET_KEY = process.env.SECRET_KEY || 'secretKey';

// Initialisierungen
db.sync({ force: true }) // force: false löscht die Tabellen nicht, wenn sie bereits existieren
    .then(() => {
        console.log("database connected");
        return initializeAdminUser();
    })
    .catch((error) => console.log("error while connecting to Database:", error));

    async function initializeAdminUser() {
        try {
          // Prüfen, ob bereits ein Admin-Benutzer existiert
          const existingAdmin = await User.findOne({ 
            where: { 
              role: 'admin' 
            } 
          });
      
          // Wenn kein Admin existiert, erstellen
          if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            
            await User.create({
              username: 'admin',
              password: hashedPassword,
              role: 'admin'
            });
      
            console.log('Admin-Benutzer wurde erfolgreich erstellt');
          }
        } catch (error) {
          console.error('Fehler beim Erstellen des Admin-Benutzers:', error);
        }
      }


// Routen

// Grundlegende Route
app.get("/", (req, res) => {
    res.json({ message: "Malershop Backend" });
    });

// Route für Authentifizierung
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
      const user = await User.findOne({ where: { username: username }});
      
      if (!user) {
          return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
          return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
      }

      const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role }, 
          SECRET_KEY, 
          { expiresIn: '1h' }
      );

      res.json({ token });
  } catch (error) {
      res.status(500).json({ message: 'Server Error' });
  }
});

// Route für Produkte
app.post('/products', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, imagePath } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      imagePath
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

  app.get('/products', authenticateToken, async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/products/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, imagePath } = req.body;
      
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.update({
        name,
        description,
        price,
        imagePath
      });
  
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });



const PORT = 5001;

app.listen(PORT, () => console.log(`server runs on port ${PORT}`));