const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const sampleProducts = [
      { name: "Kopi Susu Gula Aren", price: 18000, category: "Minuman", stock: 50, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500", description: "Espresso murni dipadukan dengan susu segar dan kelezatan sirup gula aren asli alami." },
      { name: "Matcha Latte Premium", price: 22000, category: "Minuman", stock: 35, image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500", description: "Bubuk matcha Jepang kualitas tinggi yang diseduh lembut bersama susu hangat gurih." },
      { name: "Americano Dingin", price: 17000, category: "Minuman", stock: 40, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500", description: "Espresso hitam murni disajikan dingin dengan es batu, cocok untuk cuaca panas." },
      { name: "Es Teh Manis Jumbo", price: 8000, category: "Minuman", stock: 60, image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500", description: "Teh manis segar ukuran jumbo, teman setia menemani setiap makanan." },
      { name: "Nasi Goreng Spesial", price: 28000, category: "Makanan", stock: 20, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500", description: "Nasi goreng dengan telur, ayam suwir, dan acar segar khas nusantara." },
      { name: "Sandwich Club Ayam", price: 24000, category: "Makanan", stock: 18, image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=500", description: "Roti lapis tiga tingkat dengan ayam panggang, telur, dan sayuran segar." },
      { name: "Croissant Butter Almond", price: 25000, category: "Makanan", stock: 15, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500", description: "Pastry berlapis mentega Prancis bertekstur renyah dengan taburan kacang almond melimpah." },
      { name: "Donat Coklat Keju", price: 12000, category: "Dessert", stock: 30, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500", description: "Donat lembut dengan topping coklat leleh dan taburan keju parut." },
      { name: "Red Velvet Cake Slice", price: 27000, category: "Dessert", stock: 12, image: "https://images.unsplash.com/photo-1586985289906-406988974504?w=500", description: "Potongan kue red velvet lembut dengan cream cheese frosting." }
    ];
    const createdProducts = await Product.insertMany(sampleProducts);
    res.status(201).json(createdProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;