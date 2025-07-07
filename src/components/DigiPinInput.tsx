import React from 'react';
import { useDigiPin } from '../hooks/useDigiPin';

export const DigiPinInput: React.FC = () => {
  const { input, setInput, result, loading, error, search } = useDigiPin();

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