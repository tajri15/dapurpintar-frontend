import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { register } = useContext(AuthContext);

    const handleRegister = (event) => {
        event.preventDefault();
        register(name, email, password, passwordConfirmation);
    };

    return (
        <div className="auth-page fade-in">
            <h2 className="auth-title">Create Your Account</h2>
            <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
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
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="form-submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login" className="auth-link">Login here</Link>
            </p>
        </div>
    );
}

export default RegisterPage;