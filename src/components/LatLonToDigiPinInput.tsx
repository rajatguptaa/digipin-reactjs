import React from 'react';
import { useLatLonToDigiPin } from '../hooks/useLatLonToDigiPin';

export const LatLonToDigiPinInput: React.FC = () => {
  const { lat, setLat, lon, setLon, digipinResult, loading, error, convert } = useLatLonToDigiPin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    convert();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div>
        <input
          type="text"
          value={lat}
          onChange={e => setLat(e.target.value)}
          placeholder="Latitude"
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          value={lon}
          onChange={e => setLon(e.target.value)}
          placeholder="Longitude"
          style={{ marginRight: 8 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Converting...' : 'Convert to DIGIPIN'}
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {digipinResult && (
        <div style={{ marginTop: 8 }}>
          <strong>DIGIPIN:</strong> {digipinResult}
        </div>
      )}
    </form>
  );
}; 