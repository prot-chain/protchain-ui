'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser, registerUser } from '../lib/api';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Email and password are required.');
            return;
        }

        try {
            if (isLogin) {
                const response = await authenticateUser(email, password);
                localStorage.setItem('authenticated', 'true');
                setMessage('Login successful!');
                router.push('/protein');
            } else {
                const response = await registerUser(email, password);
                localStorage.setItem('authenticated', 'true');
                setMessage('Signup successful!');
                router.push('/protein');
            }
        } catch (error) {
            setMessage(error.message || `${isLogin ? 'Login' : 'Signup'} failed. Please try again.`);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'black' }}>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '.5rem', color: 'black' }}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc', color: 'black' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '.5rem', color: 'black' }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc', color: 'black' }}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                {message && (
                    <p style={{ marginTop: '1rem', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>
                )}
                <p style={{ marginTop: '1rem', textAlign: 'center', color: 'black' }}>
                    {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setMessage('');
                        }}
                        style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer', textDecoration: 'underline', marginLeft: '0.5rem' }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}
