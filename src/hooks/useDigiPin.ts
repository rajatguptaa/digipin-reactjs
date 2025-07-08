import { useState } from 'react';
import { getDigiPin, getLatLngFromDigiPin } from 'digipinjs';

export function useDigiPin() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      let res;
      // If input looks like lat,lon, encode to DIGIPIN
      if (/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(query.trim())) {
        const [lat, lon] = query.split(',').map(Number);
        res = getDigiPin(lat, lon);
      } else {
        // Otherwise, decode as DIGIPIN
        res = getLatLngFromDigiPin(query.trim());
      }
      setResult(res);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { input, setInput, result, loading, error, search };
} 