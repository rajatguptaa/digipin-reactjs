# digipin-reactjs

React hooks and components for integrating DIGIPIN (Indian Postal Digital PIN) geocoding into React apps. Includes hooks, prebuilt UI, and helpers for seamless integration.

[![npm version](https://img.shields.io/npm/v/digipin-reactjs.svg)](https://www.npmjs.com/package/digipin-reactjs)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

---

## Features
- Convert between DIGIPIN and latitude/longitude
- React hook: `useDigiPin`
- Prebuilt UI component: `DigiPinInput`
- TypeScript support

---

## Installation

```bash
npm install digipin-reactjs digipin react react-dom
```

---

## Usage

### 1. Prebuilt Input Component
```tsx
import { DigiPinInput } from 'digipin-reactjs';

function App() {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>DigiPin React Example</h1>
      <DigiPinInput />
    </div>
  );
}
```

### 2. Custom UI with the Hook
```tsx
import { useDigiPin } from 'digipin-reactjs';

function CustomDigiPinForm() {
  const { input, setInput, result, loading, error, search } = useDigiPin();

  return (
    <form onSubmit={e => { e.preventDefault(); search(input); }}>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter DIGIPIN or lat,lon" />
      <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}
```

---

## Example App

To run the included example/demo app:

```bash
cd example
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173) in your browser.

---

## Development

- Build the library: `npm run build`
- Lint: `npm run lint`
- Test: `npm run test`

---

## License

MIT License © 2025 [Rajat Gupta](https://github.com/rajatguptaa)
