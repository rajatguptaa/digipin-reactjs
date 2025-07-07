# digipin-reactjs

React hooks and components for integrating DIGIPIN (Indian Postal Digital PIN) geocoding into React apps. Includes hooks, prebuilt UI, and helpers for seamless integration.

[![npm version](https://img.shields.io/npm/v/digipin-reactjs.svg)](https://www.npmjs.com/package/digipin-reactjs)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

---

## Features
- Convert between DIGIPIN and latitude/longitude
- React hook: `useDigiPin`
- Prebuilt UI component: `DigiPinInput`
- TypeScript support

---

## Installation

```bash
npm install digipin-reactjs digipin react react-dom
```

---

## Usage

### 1. Prebuilt Input Component
```tsx
import { DigiPinInput } from 'digipin-reactjs';

function App() {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>DigiPin React Example</h1>
      <DigiPinInput />
    </div>
  );
}
```

### 2. Custom UI with the Hook
```tsx
import { useDigiPin } from 'digipin-reactjs';

function CustomDigiPinForm() {
  const { input, setInput, result, loading, error, search } = useDigiPin();

  return (
    <form onSubmit={e => { e.preventDefault(); search(input); }}>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter DIGIPIN or lat,lon" />
      <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}
```

### 3. Convert Latitude/Longitude to DIGIPIN (Hook)
```tsx
import { useLatLonToDigiPin } from 'digipin-reactjs';

function LatLonForm() {
  const { lat, setLat, lon, setLon, digipinResult, loading, error, convert } = useLatLonToDigiPin();
  return (
    <form onSubmit={e => { e.preventDefault(); convert(); }}>
      <input value={lat} onChange={e => setLat(e.target.value)} placeholder="Latitude" />
      <input value={lon} onChange={e => setLon(e.target.value)} placeholder="Longitude" />
      <button type="submit" disabled={loading}>Convert</button>
      {error && <div>{error}</div>}
      {digipinResult && <div>DIGIPIN: {digipinResult}</div>}
    </form>
  );
}
```

### 4. Convert DIGIPIN to Latitude/Longitude (Hook)
```tsx
import { useDigiPinToLatLon } from 'digipin-reactjs';

function DigiPinForm() {
  const { digipinInput, setDigiPinInput, latLonResult, loading, error, convert } = useDigiPinToLatLon();
  return (
    <form onSubmit={e => { e.preventDefault(); convert(); }}>
      <input value={digipinInput} onChange={e => setDigiPinInput(e.target.value)} placeholder="DIGIPIN" />
      <button type="submit" disabled={loading}>Convert</button>
      {error && <div>{error}</div>}
      {latLonResult && <div>Lat: {latLonResult.lat}, Lon: {latLonResult.lon}</div>}
    </form>
  );
}
```

### 5. Prebuilt UI Components
```tsx
import { LatLonToDigiPinInput, DigiPinToLatLonInput } from 'digipin-reactjs';

function App() {
  return (
    <>
      <LatLonToDigiPinInput />
      <DigiPinToLatLonInput />
    </>
  );
}
```

---

## Example App

To run the included example/demo app:

```