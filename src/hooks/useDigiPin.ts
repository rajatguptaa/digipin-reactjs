import { useState } from 'react';
import digipin from 'digipinjs';

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
        res = digipin.getDIGIPINFromLatLon(lat, lon);
      } else {
        // Otherwise, decode as DIGIPIN
        res = digipin.getLatLonFromDIGIPIN(query.trim());
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