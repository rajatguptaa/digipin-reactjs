import React from 'react';
import { useDigiPinToLatLon } from '../hooks/useDigiPinToLatLon';

export const DigiPinToLatLonInput: React.FC = () => {
  const { digipinInput, setDigiPinInput, latLonResult, loading, error, convert } = useDigiPinToLatLon();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    convert();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div>
        <input
          type="text"
          value={digipinInput}
          onChange={e => setDigiPinInput(e.target.value)}
          placeholder="DIGIPIN"
          style={{ marginRight: 8 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Converting...' : 'Convert to Lat/Lon'}
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {latLonResult && (
        <div style={{ marginTop: 8 }}>
          <strong>Latitude:</strong> {latLonResult.lat} <br />
          <strong>Longitude:</strong> {latLonResult.lon}
        </div>
      )}
    </form>
  );
}; 