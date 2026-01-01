import { renderHook, act } from '@testing-library/react';
import { useDigiPin } from '../hooks/useDigiPin';

describe('useDigiPin', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => useDigiPin());

        expect(result.current.input).toBe('');
        expect(result.current.result).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should update input value', () => {
        const { result } = renderHook(() => useDigiPin());

        act(() => {
            result.current.setInput('test');
        });

        expect(result.current.input).toBe('test');
    });

    it('should handle empty input error', async () => {
        const { result } = renderHook(() => useDigiPin());

        await act(async () => {
            await result.current.search('');
        });

        expect(result.current.error).toBe('Input cannot be empty');
        expect(result.current.result).toBeNull();
    });

    it('should handle invalid coordinates', async () => {
        const { result } = renderHook(() => useDigiPin());

        await act(async () => {
            await result.current.search('100,200'); // Invalid lat/lon
        });

        expect(result.current.error).toBe('Latitude must be between -90 and 90');
        expect(result.current.result).toBeNull();
    });
});
