const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      image: String,
      qty: Number,
    },
  ],
  totalPrice: { type: Number, required: true },
  recipientName: { type: String, required: [true, 'Nama penerima wajib diisi'] },
  address: { type: String, required: [true, 'Alamat wajib diisi'] },
  phone: { type: String, required: [true, 'Nomor telepon wajib diisi'] },
  status: { type: String, enum: ['pending', 'diproses', 'selesai'], default: 'pending' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);