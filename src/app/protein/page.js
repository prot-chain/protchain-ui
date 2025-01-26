'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ProteinScreen() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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

    const initializeScene = (file) => {
        console.log("inside the initializeScene")
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

        // Load PDB structure from file
        const loader = new PDBLoader();
        const reader = new FileReader();
        reader.onload = () => {
            const pdbData = reader.result;
            console.log('PDB File Content:', pdbData);
            console.log("Processing parser")
            const pdb = loader.parse(pdbData)
            console.log("insider parser")
            console.log("pdb information", pdb)
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
        };
        reader.onerror = () => {
            setError('Failed to read the file');
        };
        reader.readAsText(file);

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

    const handleFileUpload = (event) => {
        console.log("inside file upload")
        const file = event.target.files[0];
        if (!file) {
            setError('Please upload a valid PDB file');
            return;
        }
        setError('');
        initializeScene(file);
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
                    type="file"
                    accept=".pdb"
                    onChange={handleFileUpload}
                    style={{ marginBottom: '1rem' }}
                />
                {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
            </div>
            <div
                ref={containerRef}
                style={{ width: '80%', height: '50vh', backgroundColor: '#000', borderRadius: '8px', marginTop: '2rem' }}
            ></div>
        </div>
    );
}
