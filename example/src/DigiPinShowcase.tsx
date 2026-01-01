import React, { useState } from 'react';
import {
    DigiPinInput,
    LatLonToDigiPinInput,
    DigiPinToLatLonInput,
    useDigiPin,
    useDigiPinToLatLon,
    useLatLonToDigiPin
} from 'digipin-reactjs';
import type { SearchResult } from 'digipin-reactjs';

// Section 1: Prebuilt Components
const PrebuiltSection = () => (
    <section style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
        <h2>1. Prebuilt UI Components</h2>
        <p>Ready-to-use components for quick integration.</p>

        <div style={{ marginBottom: '1.5rem' }}>
            <h3>DigiPinInput</h3>
            <p>Universal search (detects Lat/Lon or DIGIPIN)</p>
            <DigiPinInput
                onResult={(res: SearchResult) => console.log('Search Result:', res)}
                style={{ padding: '8px', fontSize: '1rem', width: '300px' }}
            />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
            <h3>LatLonToDigiPinInput</h3>
            <LatLonToDigiPinInput />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
            <h3>DigiPinToLatLonInput</h3>
            <DigiPinToLatLonInput />
        </div>
    </section>
);

// Section 2: Custom Hooks
const HooksSection = () => {
    return (
        <section>
            <h2>2. Custom Hook Implementations</h2>
            <p>Build your own UI using the provided hooks.</p>

            <CustomSearch />
            <CustomLatLonToDigiPin />
            <CustomDigiPinToLatLon />
        </section>
    );
};

const CustomSearch = () => {
    const { input, setInput, result, loading, error, search } = useDigiPin();

    return (
        <div style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <h3>useDigiPin (Custom Search)</h3>
            <form onSubmit={(e) => { e.preventDefault(); search(input); }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Try '12-34-56' or '12.97,77.59'"
                    style={{ padding: '8px', marginRight: '8px', width: '250px' }}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Go'}
                </button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '8px' }}>Error: {error}</div>}
            {result && (
                <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
};

const CustomLatLonToDigiPin = () => {
    const { lat, setLat, lon, setLon, digipinResult, loading, error, convert } = useLatLonToDigiPin();

    return (
        <div style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <h3>useLatLonToDigiPin</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                    value={lat} onChange={(e) => setLat(e.target.value)}
                    placeholder="Lat (e.g. 12.97)" style={{ padding: '6px' }}
                />
                <input
                    value={lon} onChange={(e) => setLon(e.target.value)}
                    placeholder="Lon (e.g. 77.59)" style={{ padding: '6px' }}
                />
                <button onClick={convert} disabled={loading}>Convert</button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {digipinResult && <div style={{ color: 'green', fontWeight: 'bold' }}>Generated PIN: {digipinResult}</div>}
        </div>
    );
};

const CustomDigiPinToLatLon = () => {
    const { digipinInput, setDigiPinInput, latLonResult, loading, error, convert } = useDigiPinToLatLon();

    return (
        <div style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <h3>useDigiPinToLatLon</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                    value={digipinInput} onChange={(e) => setDigiPinInput(e.target.value)}
                    placeholder="Enter Digipin" style={{ padding: '6px' }}
                />
                <button onClick={convert} disabled={loading}>Convert</button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {latLonResult && (
                <div style={{ color: 'blue' }}>
                    Lat: {latLonResult.lat}, Lon: {latLonResult.lon}
                </div>
            )}
        </div>
    );
};

export const DigiPinShowcase = () => {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: '#333' }}>DigiPin ReactJS Showcase</h1>
                <p style={{ color: '#666' }}>Comprehensive demo of all package functionality</p>
            </header>

            <PrebuiltSection />
            <HooksSection />
        </div>
    );
};
