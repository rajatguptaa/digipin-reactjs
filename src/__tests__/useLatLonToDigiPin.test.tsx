import { renderHook, act } from '@testing-library/react';
import { useLatLonToDigiPin } from '../hooks/useLatLonToDigiPin';

describe('useLatLonToDigiPin', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => useLatLonToDigiPin());
        expect(result.current.lat).toBe('');
        expect(result.current.lon).toBe('');
        expect(result.current.digipinResult).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle conversion', async () => {
        const { result } = renderHook(() => useLatLonToDigiPin());

        // Update inputs
        act(() => {
            result.current.setLat('12.9716');
            result.current.setLon('77.5946');
        });

        await act(async () => {
            result.current.convert();
        });

        expect(result.current.error).toBeNull();
        // Since we don't mock digipinjs logic, we expect a real result or at least not null if the coords are valid.
        // Assuming digipinjs works locally.
        expect(typeof result.current.digipinResult).toBe('string');
    });

    it('should handle invalid coordinates', async () => {
        const { result } = renderHook(() => useLatLonToDigiPin());

        act(() => {
            result.current.setLat('100'); // Invalid
            result.current.setLon('200'); // Invalid
        });

        await act(async () => {
            result.current.convert();
        });

        expect(result.current.error).toMatch(/Latitude must be between -90 and 90/);
        expect(result.current.digipinResult).toBeNull();
    });

    it('should handle non-numeric input', async () => {
        const { result } = renderHook(() => useLatLonToDigiPin());

        act(() => {
            result.current.setLat('abc');
            result.current.setLon('def');
        });

        await act(async () => {
            result.current.convert();
        });

        expect(result.current.error).toBe('Invalid latitude or longitude');
    });
});
