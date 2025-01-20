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
    const [proteinData, setProteinData] = useState(null);
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

    const fetchProteinData = async (id) => {
        try {
            setError('');
            //const response = await fetch(`/api/protein/${id}`); // Replace with your API endpoint
            //if (!response.ok) {
            //    throw new Error(`Failed to fetch data for protein ID: ${id}`);
            //}
            //const data = await response.json();
            setProteinData({
    "protein_id": "P01308",
    "data": {
        "primary_accession": "P01308",
        "recommended_name": "Insulin",
        "organism": {
            "scientific_name": "Homo sapiens",
            "common_name": "Human"
        },
        "entry_audit": {
            "first_public_date": "1986-07-21",
            "last_annotation_update_date": "2024-11-27",
            "sequence_version": 1,
            "entry_version": 278
        },
        "functions": [
            "Insulin decreases blood glucose concentration. It increases cell permeability to monosaccharides, amino acids and fatty acids. It accelerates glycolysis, the pentose phosphate cycle, and glycogen synthesis in liver"
        ],
        "subunit_structure": [
            "Heterodimer of a B chain and an A chain linked by two disulfide bonds (PubMed:25423173)"
        ],
        "subcellular_locations": [
            "Secreted"
        ],
        "disease_associations": [
            {
                "disease_name": "An autosomal dominant condition characterized by elevated levels of serum proinsulin-like material.",
                "acronym": "HPRI",
                "cross_reference": "MIM"
            },
            {
                "disease_name": "A multifactorial disorder of glucose homeostasis that is characterized by susceptibility to ketoacidosis in the absence of insulin therapy. Clinical features are polydipsia, polyphagia and polyuria which result from hyperglycemia-induced osmotic diuresis and secondary thirst. These derangements result in long-term complications that affect the eyes, kidneys, nerves, and blood vessels.",
                "acronym": "T1D2",
                "cross_reference": "MIM"
            },
            {
                "disease_name": "A form of permanent neonatal diabetes mellitus, a type of diabetes characterized by onset of persistent hyperglycemia within the first six months of life. Initial clinical manifestations include intrauterine growth retardation, hyperglycemia, glycosuria, osmotic polyuria, severe dehydration, and failure to thrive. PNDM4 transmission pattern is consistent with autosomal dominant or autosomal recessive inheritance.",
                "acronym": "PNDM4",
                "cross_reference": "MIM"
            },
            {
                "disease_name": "A form of diabetes that is characterized by an autosomal dominant mode of inheritance, onset in childhood or early adulthood (usually before 25 years of age), a primary defect in insulin secretion and frequent insulin-independence at the beginning of the disease.",
                "acronym": "MODY10",
                "cross_reference": "MIM"
            }
        ],
        "isoforms": [
            {
                "isoform_name": "1",
                "sequence_status": "Displayed"
            },
            {
                "isoform_name": "2",
                "sequence_status": "External"
            }
        ],
        "features": [
            {
                "type": "Signal",
                "location": "1 - 24",
                "description": ""
            },
            {
                "type": "Peptide",
                "location": "25 - 54",
                "description": "Insulin B chain"
            },
            {
                "type": "Propeptide",
                "location": "57 - 87",
                "description": "C peptide"
            },
            {
                "type": "Peptide",
                "location": "90 - 110",
                "description": "Insulin A chain"
            },
            {
                "type": "Disulfide bond",
                "location": "31 - 96",
                "description": "Interchain (between B and A chains)"
            },
            {
                "type": "Disulfide bond",
                "location": "43 - 109",
                "description": "Interchain (between B and A chains)"
            },
            {
                "type": "Disulfide bond",
                "location": "95 - 100",
                "description": ""
            },
            {
                "type": "Natural variant",
                "location": "6 - 6",
                "description": "in MODY10; dbSNP:rs121908278"
            },
            {
                "type": "Natural variant",
                "location": "6 - 6",
                "description": "in MODY10; dbSNP:rs121908259"
            },
            {
                "type": "Natural variant",
                "location": "24 - 24",
                "description": "in PNDM4; dbSNP:rs80356663"
            },
            {
                "type": "Natural variant",
                "location": "29 - 29",
                "description": "in PNDM4; dbSNP:rs121908272"
            },
            {
                "type": "Natural variant",
                "location": "32 - 32",
                "description": "in PNDM4; dbSNP:rs80356664"
            },
            {
                "type": "Natural variant",
                "location": "32 - 32",
                "description": "in PNDM4; dbSNP:rs80356664"
            },
            {
                "type": "Natural variant",
                "location": "34 - 34",
                "description": "in HPRI; Providence; dbSNP:rs121918101"
            },
            {
                "type": "Natural variant",
                "location": "35 - 35",
                "description": "in PNDM4; dbSNP:rs121908273"
            },
            {
                "type": "Natural variant",
                "location": "43 - 43",
                "description": "in PNDM4; dbSNP:rs80356666"
            },
            {
                "type": "Natural variant",
                "location": "46 - 46",
                "description": "in MODY10; reduces binding affinity to INSR; reduces biological activity; reduces folding properties; dbSNP:rs121908260"
            },
            {
                "type": "Natural variant",
                "location": "47 - 47",
                "description": "in PNDM4; dbSNP:rs80356667"
            },
            {
                "type": "Natural variant",
                "location": "48 - 48",
                "description": "in PNDM4; dbSNP:rs80356668"
            },
            {
                "type": "Natural variant",
                "location": "48 - 48",
                "description": "in HPRI; Los-Angeles; dbSNP:rs80356668"
            },
            {
                "type": "Natural variant",
                "location": "49 - 49",
                "description": "in Chicago; dbSNP:rs148685531"
            },
            {
                "type": "Natural variant",
                "location": "55 - 55",
                "description": "in T1D2; dbSNP:rs121908261"
            },
            {
                "type": "Natural variant",
                "location": "68 - 68",
                "description": "in dbSNP:rs121908279"
            },
            {
                "type": "Natural variant",
                "location": "84 - 84",
                "description": "in PNDM4; uncertain significance; dbSNP:rs121908274"
            },
            {
                "type": "Natural variant",
                "location": "89 - 89",
                "description": "in PNDM4; dbSNP:rs80356669"
            },
            {
                "type": "Natural variant",
                "location": "89 - 89",
                "description": "in HPRI; impairs post-translational cleavage; dbSNP:rs28933985"
            },
            {
                "type": "Natural variant",
                "location": "89 - 89",
                "description": "in HPRI; Kyoto; dbSNP:rs28933985"
            },
            {
                "type": "Natural variant",
                "location": "90 - 90",
                "description": "in PNDM4; dbSNP:rs80356670"
            },
            {
                "type": "Natural variant",
                "location": "92 - 92",
                "description": "in Wakayama; dbSNP:rs121918102"
            },
            {
                "type": "Natural variant",
                "location": "96 - 96",
                "description": "in PNDM4; dbSNP:rs80356671"
            },
            {
                "type": "Natural variant",
                "location": "96 - 96",
                "description": "in PNDM4; dbSNP:rs80356671"
            },
            {
                "type": "Natural variant",
                "location": "101 - 101",
                "description": "in PNDM4; dbSNP:rs121908276"
            },
            {
                "type": "Natural variant",
                "location": "103 - 103",
                "description": "in PNDM4; dbSNP:rs121908277"
            },
            {
                "type": "Natural variant",
                "location": "108 - 108",
                "description": "in PNDM4; dbSNP:rs80356672"
            },
            {
                "type": "Beta strand",
                "location": "26 - 29",
                "description": ""
            },
            {
                "type": "Helix",
                "location": "33 - 43",
                "description": ""
            },
            {
                "type": "Helix",
                "location": "44 - 46",
                "description": ""
            },
            {
                "type": "Beta strand",
                "location": "48 - 50",
                "description": ""
            },
            {
                "type": "Beta strand",
                "location": "56 - 58",
                "description": ""
            },
            {
                "type": "Turn",
                "location": "59 - 66",
                "description": ""
            },
            {
                "type": "Beta strand",
                "location": "74 - 76",
                "description": ""
            },
            {
                "type": "Helix",
                "location": "79 - 81",
                "description": ""
            },
            {
                "type": "Turn",
                "location": "84 - 86",
                "description": ""
            },
            {
                "type": "Helix",
                "location": "91 - 97",
                "description": ""
            },
            {
                "type": "Beta strand",
                "location": "98 - 101",
                "description": ""
            },
            {
                "type": "Helix",
                "location": "102 - 106",
                "description": ""
            },
            {
                "type": "Turn",
                "location": "107 - 109",
                "description": ""
            }
        ],
        "pdb_ids": [
            "1A7F",
            "1AI0",
            "1AIY",
            "1B9E",
            "1BEN",
            "1EFE",
            "1EV3",
            "1EV6",
            "1EVR",
            "1FU2",
            "1FUB",
            "1G7A",
            "1G7B",
            "1GUJ",
            "1HIQ",
            "1HIS",
            "1HIT",
            "1HLS",
            "1HTV",
            "1HUI",
            "1IOG",
            "1IOH",
            "1J73",
            "1JCA",
            "1JCO",
            "1JK8",
            "1K3M",
            "1KMF",
            "1LKQ",
            "1LPH",
            "1MHI",
            "1MHJ",
            "1MSO",
            "1OS3",
            "1OS4",
            "1Q4V",
            "1QIY",
            "1QIZ",
            "1QJ0",
            "1RWE",
            "1SF1",
            "1SJT",
            "1SJU",
            "1T0C",
            "1T1K",
            "1T1P",
            "1T1Q",
            "1TRZ",
            "1TYL",
            "1TYM",
            "1UZ9",
            "1VKT",
            "1W8P",
            "1XDA",
            "1XGL",
            "1XW7",
            "1ZEG",
            "1ZEH",
            "1ZNJ",
            "2AIY",
            "2C8Q",
            "2C8R",
            "2CEU",
            "2G54",
            "2G56",
            "2H67",
            "2HH4",
            "2HHO",
            "2HIU",
            "2JMN",
            "2JUM",
            "2JUU",
            "2JUV",
            "2JV1",
            "2JZQ",
            "2K91",
            "2K9R",
            "2KJJ",
            "2KJU",
            "2KQP",
            "2KQQ",
            "2KXK",
            "2L1Y",
            "2L1Z",
            "2LGB",
            "2LWZ",
            "2M1D",
            "2M1E",
            "2M2M",
            "2M2N",
            "2M2O",
            "2M2P",
            "2MLI",
            "2MPG",
            "2MPI",
            "2MVC",
            "2MVD",
            "2N2V",
            "2N2W",
            "2N2X",
            "2OLY",
            "2OLZ",
            "2OM0",
            "2OM1",
            "2OMG",
            "2OMH",
            "2OMI",
            "2OMQ",
            "2QIU",
            "2R34",
            "2R35",
            "2R36",
            "2RN5",
            "2VJZ",
            "2VK0",
            "2W44",
            "2WBY",
            "2WC0",
            "2WRU",
            "2WRV",
            "2WRW",
            "2WRX",
            "2WS0",
            "2WS1",
            "2WS4",
            "2WS6",
            "2WS7",
            "3AIY",
            "3BXQ",
            "3E7Y",
            "3E7Z",
            "3EXX",
            "3FQ9",
            "3HYD",
            "3I3Z",
            "3I40",
            "3ILG",
            "3INC",
            "3IR0",
            "3JSD",
            "3KQ6",
            "3P2X",
            "3P33",
            "3Q6E",
            "3ROV",
            "3TT8",
            "3U4N",
            "3UTQ",
            "3UTS",
            "3UTT",
            "3V19",
            "3V1G",
            "3W11",
            "3W12",
            "3W13",
            "3W7Y",
            "3W7Z",
            "3W80",
            "3ZI3",
            "3ZQR",
            "3ZS2",
            "3ZU1",
            "4AIY",
            "4AJX",
            "4AJZ",
            "4AK0",
            "4AKJ",
            "4CXL",
            "4CXN",
            "4CY7",
            "4EFX",
            "4EWW",
            "4EWX",
            "4EWZ",
            "4EX0",
            "4EX1",
            "4EXX",
            "4EY1",
            "4EY9",
            "4EYD",
            "4EYN",
            "4EYP",
            "4F0N",
            "4F0O",
            "4F1A",
            "4F1B",
            "4F1C",
            "4F1D",
            "4F1F",
            "4F1G",
            "4F4T",
            "4F4V",
            "4F51",
            "4F8F",
            "4FG3",
            "4FKA",
            "4GBC",
            "4GBI",
            "4GBK",
            "4GBL",
            "4GBN",
            "4IUZ",
            "4IYD",
            "4IYF",
            "4NIB",
            "4OGA",
            "4P65",
            "4RXW",
            "4UNE",
            "4UNG",
            "4UNH",
            "4WDI",
            "4XC4",
            "4Y19",
            "4Y1A",
            "4Z76",
            "4Z77",
            "4Z78",
            "5AIY",
            "5BOQ",
            "5BPO",
            "5BQQ",
            "5BTS",
            "5C0D",
            "5CJO",
            "5CNY",
            "5CO2",
            "5CO6",
            "5CO9",
            "5E7W",
            "5EMS",
            "5EN9",
            "5ENA",
            "5HPR",
            "5HPU",
            "5HQI",
            "5HRQ",
            "5HYJ",
            "5MAM",
            "5MHD",
            "5MT3",
            "5MT9",
            "5MWQ",
            "5T7R",
            "5UDP",
            "5UOZ",
            "5UQA",
            "5URT",
            "5URU",
            "5USP",
            "5USS",
            "5USV",
            "5UU2",
            "5UU3",
            "5UU4",
            "5VIZ",
            "5WBT",
            "5WDM",
            "5WOB",
            "6B3Q",
            "6B70",
            "6BFC",
            "6CE7",
            "6CE9",
            "6CEB",
            "6CK2",
            "6GNQ",
            "6GV0",
            "6H3M",
            "6HN5",
            "6JK8",
            "6JR3",
            "6K59",
            "6NWV",
            "6O17",
            "6P4Z",
            "6S34",
            "6S4I",
            "6S4J",
            "6SOF",
            "6TC2",
            "6TYH",
            "6U46",
            "6VEP",
            "6VER",
            "6VES",
            "6VET",
            "6X4X",
            "6Z7W",
            "6Z7Y",
            "7BW7",
            "7BW8",
            "7BWA",
            "7JP3",
            "7KD6",
            "7MD4",
            "7MD5",
            "7MQO",
            "7MQR",
            "7MQS",
            "7NHU",
            "7NMG",
            "7PG0",
            "7PG2",
            "7PG3",
            "7PG4",
            "7QAC",
            "7QGF",
            "7QID",
            "7RKD",
            "7RZE",
            "7RZF",
            "7RZI",
            "7S4Y",
            "7SL1",
            "7SL2",
            "7SL3",
            "7SL4",
            "7SL6",
            "7SL7",
            "7STH",
            "7STI",
            "7STJ",
            "7STK",
            "7U6E",
            "7V3P",
            "7YQ3",
            "7YQ4",
            "7YQ5",
            "7Z5L",
            "7Z5Q",
            "8EYX",
            "8EYY",
            "8EZ0",
            "8GSG",
            "8GUY",
            "8HGZ",
            "8HSF",
            "8HSK",
            "8IPZ",
            "8OKY",
            "8ONI",
            "8ONK",
            "8ONP",
            "8ONR",
            "8PI4",
            "8PI5",
            "8PI6",
            "8PJH",
            "8RRP",
            "8RVT",
            "8SBD",
            "8VCX",
            "8VDD",
            "8Z4B"
        ],
        "pdb_link": "https://files.rcsb.org/download/1A7F.pdb.gz",
        "sequence": ">sp|P01308|INS_HUMAN Insulin OS=Homo sapiens OX=9606 GN=INS PE=1 SV=1\nMALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAED\nLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN\n"
    }
});
            //return data.data.pdb_link; // Extract PDB link from response
            return `https://files.rcsb.org/download/${id.toUpperCase()}.pdb`
        } catch (error) {
            setError(error.message);
            console.error('Error fetching protein data:', error);
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

        const pdbUrl = await fetchProteinData(pdbId.toUpperCase());
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
                    placeholder="Enter Protein ID (e.g., P01308)"
                    style={{ width: '80%', padding: '.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc',  fontSize: '1rem', fontWeight: '500', color: '#333'}}
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
                style={{ width: '80%', height: '50vh', backgroundColor: '#000', borderRadius: '8px', marginTop: '2rem' }}
            ></div>
            {proteinData && (
                <div style={{ width: '80%', backgroundColor: '#fff', marginTop: '1rem', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', color: '#333', fontWeight: '500', lineHeight: '1.6', }}>
                <h2 style={{ fontWeight: 'bold', color: '#222', marginBottom: '1rem' }}>
                    {proteinData.data.recommended_name}
                </h2>
                <p><strong>Organism:</strong> {proteinData.data.organism.scientific_name} ({proteinData.data.organism.common_name})</p>
                <p><strong>Function:</strong> {proteinData.data.functions.join('; ')}</p>
                <p><strong>Subunit Structure:</strong> {proteinData.data.subunit_structure.join('; ')}</p>
                <p><strong>First Public Date:</strong> {proteinData.data.entry_audit.first_public_date}</p>
                </div>
            )}
        </div>
    );
}
