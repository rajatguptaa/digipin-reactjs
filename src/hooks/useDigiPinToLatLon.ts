import { useCallback, useState } from 'react';
import { getLatLngFromDigiPin } from 'digipinjs';

export function useDigiPinToLatLon() {
  const [digipinInput, setDigiPinInput] = useState('');
  const [latLonResult, setLatLonResult] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      const input = digipinInput.trim();
      if (!input) {
        throw new Error('DIGIPIN cannot be empty');
      }
      const result = getLatLngFromDigiPin(input);
      setLatLonResult({ lat: result.latitude, lon: result.longitude });
    } catch (e: any) {
      setError(e.message || 'Unknown error');
      setLatLonResult(null);
    } finally {
      setLoading(false);
    }
  }, [digipinInput]);

  return { digipinInput, setDigiPinInput, latLonResult, loading, error, convert };
}
