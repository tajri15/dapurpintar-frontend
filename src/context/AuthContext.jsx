import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000/api/v1';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token')); // Baca dari localStorage sekali saja
  const [isLoading, setIsLoading] = useState(true); // <-- State baru untuk loading
  const navigate = useNavigate();

  // Verifikasi token saat aplikasi pertama kali dimuat
  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setIsLoading(false); // Selesai loading jika tidak ada token
        return;
      }
      
      try {
        const response = await axios.get(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Periksa apakah data user benar-benar ada
        if (response.data) {
          setUser(response.data);
        } else {
          // Token mungkin valid tapi data user tidak ada
          logout();
        }
      } catch (error) {
        // Token tidak valid atau error jaringan
        console.error("Token verification failed", error);
        logout();
      } finally {
        setIsLoading(false); // Selesai loading setelah verifikasi
      }
    };

    verifyUser();
  }, [token]); // Hanya jalankan ulang jika token berubah

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      navigate('/');
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation
      });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      navigate('/');
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
