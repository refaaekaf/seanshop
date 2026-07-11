import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser(form);
      login(res.data.user, res.data.token);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Buat Akun SeanShop</h2>
        <p className="auth-subtitle">Daftar untuk mulai berbelanja.</p>
        {error && <div className="auth-error">{error}</div>}
        <label>Username</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="username_kamu" required />
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@contoh.com" required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Minimal 6 karakter" required />
        <button type="submit" className="btn-primary auth-submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Daftar'}
        </button>
        <p className="auth-switch">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;