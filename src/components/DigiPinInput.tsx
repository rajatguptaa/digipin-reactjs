import React from 'react';
import { useDigiPin, SearchResult } from '../hooks/useDigiPin';

export interface DigiPinInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onResult?: (result: SearchResult) => void;
  onSearchError?: (error: string) => void;
}

export const DigiPinInput: React.FC<DigiPinInputProps> = ({ onResult, onSearchError, ...props }) => {
  const { input, setInput, result, loading, error, search } = useDigiPin();

  React.useEffect(() => {
    if (result && onResult) {
      onResult(result);
    }
  }, [result, onResult]);

  React.useEffect(() => {
    if (error && onSearchError) {
      onSearchError(error);
    }
  }, [error, onSearchError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter DigiPin query"
        {...props}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </form>
  );
}; 