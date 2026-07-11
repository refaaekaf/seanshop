import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Selamat Datang di SeanShop</h1>
        <p>Menyajikan Makanan & Minuman Segar Berkualitas Tinggi Langsung untuk Anda.</p>
        <Link to="/products" className="btn-primary">Lihat Menu Kami</Link>
      </header>
      
      <section className="features-grid">
        <div className="feature-card">
          <h3>Bahan Premium</h3>
          <p>Kami hanya menggunakan bahan baku segar pilihan terbaik.</p>
        </div>
        <div className="feature-card">
          <h3>Pelayanan Cepat</h3>
          <p>Pesanan Anda diproses secara higienis dan instan.</p>
        </div>
        <div className="feature-card">
          <h3>Rasa Autentik</h3>
          <p>Diracik oleh tenaga ahli berpengalaman di bidang kuliner.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;