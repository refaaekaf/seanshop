import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Memuat detail produk...</div>;
  if (!product) return <div className="error">Produk tidak ditemukan.</div>;

  const handleAddToCart = () => {
    addToCart(product, qty);
    const goToCart = window.confirm(`${qty} ${product.name} dimasukkan ke keranjang. Buka keranjang sekarang?`);
    if (goToCart) navigate('/cart');
  };

  return (
    <div className="detail-page">
      <Link to="/products" className="btn-back">← Kembali ke Menu</Link>

      <div className="detail-flex">
        <div className="detail-image-area">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info-area">
          <span className="category-tag">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-price">Rp {product.price.toLocaleString('id-ID')}</p>

          <div className="description-box">
            <h4>Deskripsi:</h4>
            <p>{product.description}</p>
          </div>

          <p className="stock-info">Sisa Stok: <strong>{product.stock}</strong> pcs</p>

          <div className="qty-control">
            <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
            <span>{qty}</span>
            <button onClick={() => qty < product.stock && setQty(qty + 1)}>+</button>
          </div>

          <button className="btn-cart" onClick={handleAddToCart}>
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;