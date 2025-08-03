import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = (event) => {
        event.preventDefault();
        login(email, password);
    };

    return (
        <div className="auth-page fade-in">
            <h2 className="auth-title">Welcome Back!</h2>
            <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="form-submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register" className="auth-link">Sign up here</Link>
            </p>
        </div>
    );
}

export default LoginPage;