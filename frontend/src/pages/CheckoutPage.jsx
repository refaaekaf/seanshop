import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ recipientName: '', address: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createOrder({
        items,
        totalPrice: cartTotal,
        ...form,
      });
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat pesanan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <h2>Pesanan Berhasil Dibuat!</h2>
          <p>Terima kasih, pesanan kamu sedang diproses.</p>
          <Link to="/products" className="btn-primary">Kembali Belanja</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-state">
          <p>Keranjang kosong, tidak ada yang bisa di-checkout.</p>
          <Link to="/products" className="btn-primary">Lihat Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Data Pengiriman</h3>
          {error && <div className="auth-error">{error}</div>}

          <label>Nama Penerima</label>
          <input type="text" name="recipientName" value={form.recipientName} onChange={handleChange} required />

          <label>Alamat Lengkap</label>
          <textarea name="address" value={form.address} onChange={handleChange} rows="3" required />

          <label>Nomor Telepon</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Memproses...' : 'Buat Pesanan'}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Ringkasan Pesanan</h3>
          {items.map((item) => (
            <div key={item._id} className="checkout-summary-item">
              <span>{item.name} x{item.qty}</span>
              <span>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
            </div>
          ))}
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;