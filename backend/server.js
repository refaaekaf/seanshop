const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const JWT_SECRET = 'seanshop_rahasia_2026_xyz';

const users = []; 
const products = [
  {
    _id: "1",
    name: "Kopi Susu Gula Aren",
    price: 18000,
    category: "Minuman",
    stock: 50,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500",
    description: "Espresso murni dipadukan dengan susu segar dan kelezatan sirup gula aren asli alami."
  },
  {
    _id: "2",
    name: "Matcha Latte Premium",
    price: 22000,
    category: "Minuman",
    stock: 35,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500",
    description: "Bubuk matcha Jepang kualitas tinggi yang diseduh lembut bersama susu hangat gurih."
  },
  {
    _id: "3",
    name: "Croissant Butter Almond",
    price: 25000,
    category: "Makanan",
    stock: 15,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500",
    description: "Pastry berlapis mentega Prancis bertekstur renyah dengan taburan kacang almond melimpah."
  }
];

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Semua data wajib diisi' });
    
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) return res.status(400).json({ message: 'Email/Username sudah terdaftar' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { _id: Date.now().toString(), username, email, password: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Registrasi berhasil', token, user: { id: newUser._id, username, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Email atau password salah' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Email atau password salah' });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login berhasil', token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server backend SeanShop sukses berjalan di port ${PORT}`);
});