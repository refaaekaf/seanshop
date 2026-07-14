import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">SeanShop</div>
      <div className="nav-links">
        <Link to="/">Beranda</Link>
        <Link to="/products">Daftar Produk</Link>
        <Link to="/cart" className="nav-cart-link">
          Keranjang
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile">Profil</Link>
            <span className="nav-user">Hai, {user?.username}</span>
            <button className="nav-logout-btn" onClick={handleLogout}>Keluar</button>
          </>
        ) : (
          <Link to="/login">Masuk</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;