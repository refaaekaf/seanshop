import React from 'react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="detail-page">
      <h1>Profil Saya</h1>
      <div className="description-box">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
      <p className="stock-info">Halaman ini hanya bisa diakses setelah login (protected route).</p>
    </div>
  );
}

export default ProfilePage;