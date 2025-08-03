import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PantryPage from './pages/PantryPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import './App.css';

function App() {
  const { user, logout, isLoading } = useContext(AuthContext);

  // Jika aplikasi masih memverifikasi token, tampilkan loading
  if (isLoading) {
    return <div className="app-loading"></div>;
  }

  return (
    <>
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            DapurPintar🍳
          </Link>
          <div className="nav-links">
            {user ? (
              <>
                <span className="nav-user">👋 Hello, {user.name}</span>
                <Link to="/">My Pantry</Link>
                <button onClick={logout} className="nav-button">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={user ? <PantryPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
          <Route path="/recipe/:id" element={user ? <RecipeDetailPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
