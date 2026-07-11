import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, seedSampleProducts } from '../services/api';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    getProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSeed = async () => {
    try {
      await seedSampleProducts();
      loadData();
    } catch (err) {
      alert("Gagal memuat data contoh. Pastikan backend sudah aktif!");
    }
  };

  if (loading) return <div className="loading">Mengunduh Produk...</div>;

  return (
    <div className="products-page">
      <div className="header-actions">
        <h2>Menu Makanan & Minuman</h2>
        <button onClick={handleSeed} className="btn-seed">+ Muat Data Contoh</button>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>Belum ada produk di database.</p>
          <p>Silakan klik tombol <strong>+ Muat Data Contoh</strong> di atas.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <span className="badge-category">{product.category}</span>
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">Rp {product.price.toLocaleString('id-ID')}</p>
                <Link to={`/products/${product._id}`} className="btn-detail">Lihat Detail</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;