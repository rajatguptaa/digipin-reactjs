import { useCallback, useState } from 'react';
import { getDigiPin } from 'digipinjs';

export function useLatLonToDigiPin() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [digipinResult, setDigiPinResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      const latNum = Number(lat.trim());
      const lonNum = Number(lon.trim());
      if (isNaN(latNum) || isNaN(lonNum)) {
        throw new Error('Invalid latitude or longitude');
      }
      if (latNum < -90 || latNum > 90) {
        throw new Error('Latitude must be between -90 and 90');
      }
      if (lonNum < -180 || lonNum > 180) {
        throw new Error('Longitude must be between -180 and 180');
      }
      const result = getDigiPin(latNum, lonNum);
      setDigiPinResult(result);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
      setDigiPinResult(null);
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  return { lat, setLat, lon, setLon, digipinResult, loading, error, convert };
}
