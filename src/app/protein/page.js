'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ProteinScreen() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pdbId, setPdbId] = useState('');
    const [error, setError] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        const auth = localStorage.getItem('authenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push('/');
        }
    }, [router]);

    const fetchPdbUrl = async (id) => {
        try {
            //setError(''); // Clear previous errors
            //const response = await fetch(`/api/pdb/${id}`); // Replace with your API endpoint
            //if (!response.ok) {
            //    throw new Error(`Failed to fetch PDB URL for ID: ${id}`);
            //}
            //const data = await response.json();
            //return data.url; // Assume API returns { url: "https://example.com/protein.pdb" }
            return `https://files.rcsb.org/download/${id.toUpperCase()}.pdb`
        } catch (error) {
            setError(error.message);
            console.error('Error fetching PDB URL:', error);
            return null;
        }
    };

    const initializeScene = (pdbUrl) => {
        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Load PDB structure
        const loader = new PDBLoader();
        loader.load(
            pdbUrl,
            (pdb) => {
                const { geometryAtoms, geometryBonds } = pdb;

                // Atoms
                const materialAtoms = new THREE.PointsMaterial({ size: 0.5, vertexColors: true });
                const points = new THREE.Points(geometryAtoms, materialAtoms);
                scene.add(points);

                // Bonds
                const materialBonds = new THREE.LineBasicMaterial({ color: 0xffffff });
                const bonds = new THREE.LineSegments(geometryBonds, materialBonds);
                scene.add(bonds);

                // Adjust camera position to frame the structure
                const boundingBox = new THREE.Box3().setFromObject(points);
                const center = boundingBox.getCenter(new THREE.Vector3());
                const size = boundingBox.getSize(new THREE.Vector3()).length();
                const distance = size * 2.5;
                camera.position.set(center.x, center.y, distance);
                camera.lookAt(center);
                controls.update();
            },
            undefined,
            (error) => {
                console.error('Error loading PDB file:', error);
            }
        );

        camera.position.z = 100;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Clean up on unmount
        return () => {
            renderer.dispose();
            containerRef.current.innerHTML = ''; // Clear renderer DOM
        };
    };

    const handleLoadStructure = async () => {
        if (!pdbId.trim()) {
            setError('Please enter a valid PDB ID');
            return;
        }

        const pdbUrl = await fetchPdbUrl(pdbId.toUpperCase());
        if (pdbUrl) {
            initializeScene(pdbUrl);
        }
    };

    // Render a loading state until authentication is resolved
    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <h1>3D PDB Viewer</h1>
                <input
                    type="text"
                    value={pdbId}
                    onChange={(e) => setPdbId(e.target.value)}
                    placeholder="Enter PDB ID (e.g., 1CRN)"
                    style={{ width: '80%', padding: '.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={handleLoadStructure}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Load PDB Structure
                </button>
                {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
            </div>
            <div
                ref={containerRef}
                style={{ width: '80%', height: '70vh', backgroundColor: '#000', borderRadius: '8px', marginTop: '2rem' }}
            ></div>
        </div>
    );
}
