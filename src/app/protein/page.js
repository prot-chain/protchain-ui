'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProteinScreen() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [input, setInput] = useState('');
    const [jsonObject, setJsonObject] = useState(null);

    useEffect(() => {
        const auth = localStorage.getItem('authenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push('/');
        }
    }, [router]);

    const handleParse = () => {
        try {
            const parsed = JSON.parse(input);
            setJsonObject(parsed);
        } catch (error) {
            setJsonObject({ error: 'Invalid JSON' });
        }
    };

    // Render a loading state until authentication is resolved
    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>JSON Input</h1>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows="6"
                    style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '1rem' }}
                    placeholder="Enter JSON here"
                ></textarea>
                <button onClick={handleParse} style={{ width: '100%', padding: '.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1rem' }}>
                    Parse JSON
                </button>
                {jsonObject && (
                    <pre style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
                        {JSON.stringify(jsonObject, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
}
