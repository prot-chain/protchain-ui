'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { retrieveProteinDetail } from '@/lib/api';

export default function ProteinScreen() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pdbId, setPdbId] = useState('');
    const [error, setError] = useState('');
    const [metadata, setMetadata] = useState(null);
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

    const initializeScene = (pdbBlob) => {
        const reader = new FileReader();
        reader.onload = () => {
            const pdbContent = reader.result;

            // Create scene, camera, and renderer
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
                75,
                containerRef.current.clientWidth / containerRef.current.clientHeight,
                0.1,
                1000
            );
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

            // Load PDB structure from content
            const loader = new PDBLoader();
            const pdb = loader.parse(pdbContent);
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

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
        };

        reader.onerror = () => {
            setError('Failed to read PDB file.');
        };

        reader.readAsText(pdbBlob);
    };

    const fetchPdbFile = async () => {
        if (!pdbId.trim()) {
            setError('Please enter a valid PDB ID.');
            return;
        }

        try {
            setError('');
            const response = await retrieveProteinDetail(pdbId);

            if (!response.metadata || !response.file) {
                throw new Error('Invalid response format.');
            }

            // Extract and display metadata
            const { payload } = response.metadata;
            setMetadata(payload);

            // Initialize the 3D scene with the PDB file blob
            const pdbBlob = new Blob([response.file], { type: 'chemical/x-pdb' });
            initializeScene(pdbBlob);
        } catch (err) {
            setError(err.message || 'Error fetching PDB file.');
            console.error('Error fetching PDB file:', err);
        }
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <h1>3D PDB Viewer</h1>
                <input
                    type="text"
                    placeholder="Enter PDB ID (e.g., 1XYZ)"
                    value={pdbId}
                    onChange={(e) => setPdbId(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        borderRadius: '4px',
                        border: '1px solid #000',
                        fontSize: '1rem',
                    }}
                />
                <button
                    onClick={fetchPdbFile}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                    }}
                >
                    Load PDB Structure
                </button>
                {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
            </div>
            <div
                ref={containerRef}
                style={{ width: '80%', height: '50vh', backgroundColor: '#000', borderRadius: '8px', marginTop: '2rem' }}
            ></div>
            {metadata && (
                <div style={{ width: '80%', marginTop: '2rem', textAlign: 'left' }}>
                    <h2>Protein Metadata</h2>
                    <p><strong>Primary Accession:</strong> {metadata.primary_accession}</p>
                    <p><strong>Recommended Name:</strong> {metadata.recommended_name || 'N/A'}</p>
                    <p><strong>Organism:</strong> {metadata.organism.scientific_name || 'Unknown'} ({metadata.organism.common_name || 'Unknown'})</p>
                    <p><strong>First Public Date:</strong> {metadata.entry_audit.first_public_date || 'N/A'}</p>
                </div>
            )}
        </div>
    );
}
