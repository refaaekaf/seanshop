import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Masuk ke SeanShop</h2>
        <p className="auth-subtitle">Silakan login untuk melanjutkan.</p>
        {error && <div className="auth-error">{error}</div>}
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@contoh.com" required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
        <button type="submit" className="btn-primary auth-submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
        <p className="auth-switch">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;