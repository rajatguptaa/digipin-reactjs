import { useCallback, useState } from 'react';
import { getDigiPin, getLatLngFromDigiPin } from 'digipinjs';

type SearchResult = string | { latitude: number; longitude: number } | null;

export function useDigiPin() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<SearchResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      let res;
      // If input looks like lat,lon, encode to DIGIPIN
      const trimmed = query.trim();
      if (/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(trimmed)) {
        const [latStr, lonStr] = trimmed.split(',');
        const lat = Number(latStr.trim());
        const lon = Number(lonStr.trim());
        if (isNaN(lat) || isNaN(lon)) {
          throw new Error('Invalid latitude or longitude');
        }
        if (lat < -90 || lat > 90) {
          throw new Error('Latitude must be between -90 and 90');
        }
        if (lon < -180 || lon > 180) {
          throw new Error('Longitude must be between -180 and 180');
        }
        res = getDigiPin(lat, lon);
      } else {
        // Otherwise, decode as DIGIPIN
        if (!trimmed) {
          throw new Error('Input cannot be empty');
        }
        res = getLatLngFromDigiPin(trimmed);
      }
      setResult(res);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { input, setInput, result, loading, error, search };
}
