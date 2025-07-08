import { useState } from 'react';
import { getLatLngFromDigiPin } from 'digipinjs';

export function useDigiPinToLatLon() {
  const [digipinInput, setDigiPinInput] = useState('');
  const [latLonResult, setLatLonResult] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    setLoading(true);
    setError(null);
    try {
      const result = getLatLngFromDigiPin(digipinInput.trim());
      setLatLonResult({ lat: result.latitude, lon: result.longitude });
    } catch (e: any) {
      setError(e.message || 'Unknown error');
      setLatLonResult(null);
    } finally {
      setLoading(false);
    }
  };

  return { digipinInput, setDigiPinInput, latLonResult, loading, error, convert };
} 