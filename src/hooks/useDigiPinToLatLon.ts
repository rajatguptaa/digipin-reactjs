import { useState } from 'react';
import digipin from 'digipin';

export function useDigiPinToLatLon() {
  const [digipinInput, setDigiPinInput] = useState('');
  const [latLonResult, setLatLonResult] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    setLoading(true);
    setError(null);
    try {
      const result = digipin.getLatLonFromDIGIPIN(digipinInput.trim());
      setLatLonResult(result);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
      setLatLonResult(null);
    } finally {
      setLoading(false);
    }
  };

  return { digipinInput, setDigiPinInput, latLonResult, loading, error, convert };
} 