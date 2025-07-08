import { useState } from 'react';
import { getDigiPin } from 'digipinjs';

export function useLatLonToDigiPin() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [digipinResult, setDigiPinResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    setLoading(true);
    setError(null);
    try {
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      if (isNaN(latNum) || isNaN(lonNum)) {
        throw new Error('Invalid latitude or longitude');
      }
      const result = getDigiPin(latNum, lonNum);
      setDigiPinResult(result);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
      setDigiPinResult(null);
    } finally {
      setLoading(false);
    }
  };

  return { lat, setLat, lon, setLon, digipinResult, loading, error, convert };
} 