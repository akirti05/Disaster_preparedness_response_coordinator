// src/SignUpLoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpLoginPage.css'; // Create this CSS file for styling if needed

function SignUpLoginPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError('');
        setSuccess('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !password) {
            setError('Both fields are required');
            return;
        }

        if (isLoginMode) {
            const storedPassword = localStorage.getItem(username);
            if (storedPassword === password) {
                setSuccess('Login successful!');
                navigate('/'); // Redirect to Home page
            } else {
                setError('Invalid username or password');
            }
        } else {
            if (localStorage.getItem(username)) {
                setError('Username already exists');
            } else {
                localStorage.setItem(username, password);
                setSuccess('Sign-up successful!');
                setUsername('');
                setPassword('');
                setTimeout(() => navigate('/'), 1000); // Redirect after 1 second
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="form-container">
                <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">{isLoginMode ? 'Login' : 'Sign Up'}</button>
                    <p>{error && <span className="error">{error}</span>}</p>
                    <p>{success && <span className="success">{success}</span>}</p>
                </form>
                <button className="switch-button" onClick={toggleMode}>
                    {isLoginMode ? 'Switch to Sign Up' : 'Switch to Login'}
                </button>
            </div>
        </div>
    );
}

export default SignUpLoginPage;
