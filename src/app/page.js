'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Email and password are required.');
            return;
        }

        try {
            // Mock authentication logic
            if (email === 'test@example.com' && password === 'password') {
                localStorage.setItem('authenticated', 'true');
                setMessage('Signup successful!');
                router.push('/protein');
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '.5rem' }}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '.5rem' }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                        Sign Up
                    </button>
                </form>
                {message && (
                    <p style={{ marginTop: '1rem', color: message === 'Signup successful!' ? 'green' : 'red' }}>{message}</p>
                )}
            </div>
        </div>
    );
}
