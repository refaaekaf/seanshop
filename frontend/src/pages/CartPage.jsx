import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartPage() {
  const { items, removeFromCart, updateQty, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h2>Keranjang Belanja</h2>
        <div className="empty-state">
          <p>Keranjang kamu masih kosong.</p>
          <Link to="/products" className="btn-primary">Lihat Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Keranjang Belanja</h2>

      <div className="cart-list">
        {items.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="price">Rp {item.price.toLocaleString('id-ID')}</p>
            </div>
            <div className="qty-control">
              <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
            </div>
            <p className="cart-item-subtotal">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
            <button className="cart-remove-btn" onClick={() => removeFromCart(item._id)}>Hapus</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <span>Total</span>
        <span className="cart-total-price">Rp {cartTotal.toLocaleString('id-ID')}</span>
      </div>

      <button className="btn-cart cart-checkout-btn" onClick={handleCheckout}>
        Lanjut ke Checkout
      </button>
    </div>
  );
}

export default CartPage;