const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nama produk wajib diisi'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Harga produk wajib diisi'] 
  },
  category: { 
    type: String, 
    required: [true, 'Kategori wajib diisi'] 
  },
  stock: { 
    type: Number, 
    default: 0 
  },
  image: { 
    type: String, 
    required: [true, 'URL Gambar wajib diisi'] 
  },
  description: { 
    type: String, 
    required: [true, 'Deskripsi produk wajib diisi'] 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);