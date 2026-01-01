# digipin-reactjs

React hooks and components for integrating **DIGIPIN** (Indian Postal Digital PIN) geocoding into React apps. Includes hooks, prebuilt UI, and helpers for seamless integration.

[![npm version](https://img.shields.io/npm/v/digipin-reactjs.svg)](https://www.npmjs.com/package/digipin-reactjs)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Downloads](https://img.shields.io/npm/dm/digipin-reactjs.svg)](https://www.npmjs.com/package/digipin-reactjs)

---

**Live demo:** [thedigipin.net](https://thedigipin.net/?tab=0&zoom=5&encTab=0&base=cartoDark)

---

## Features

- **Bidirectional Conversion**: Convert between DIGIPIN and Latitude/Longitude.
- **React Hooks**: `useDigiPin`, `useDigiPinToLatLon`, `useLatLonToDigiPin`.
- **Prebuilt UI**: Ready-to-use search and conversion components.
- **Type Safety**: Full TypeScript support.
- **Lightweight**: Minimal dependencies.

---

## Installation

```bash
npm install digipin-reactjs digipin react react-dom
# or
yarn add digipin-reactjs digipin react react-dom
```

---

## Real World Usage

### 1. Delivery Location Picker
Allow users to enter a DIGIPIN to pinpoint their delivery location on a map.

```tsx
import { useDigiPinToLatLon } from 'digipin-reactjs';
import { useEffect } from 'react';

function DeliveryLocator() {
  const { digipinInput, setDigiPinInput, latLonResult, convert } = useDigiPinToLatLon();

  useEffect(() => {
    if (latLonResult) {
       console.log("Updating Map Center:", latLonResult);
       // updateMap(latLonResult.lat, latLonResult.lon);
    }
  }, [latLonResult]);

  return (
    <div>
      <input 
        type="text" 
        value={digipinInput} 
        onChange={(e) => setDigiPinInput(e.target.value)}
        placeholder="Enter DIGIPIN (e.g., 12-34-56)"
      />
      <button onClick={convert}>Locate Address</button>
    </div>
  );
}
```

### 2. Location Tagging
Automatically generate a DIGIPIN for a user's current location.

```tsx
import { useLatLonToDigiPin } from 'digipin-reactjs';

function CurrentLocationTagger() {
  const { setLat, setLon, digipinResult, convert } = useLatLonToDigiPin();

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toString());
      setLon(pos.coords.longitude.toString());
      // Trigger conversion immediately or via effect
      setTimeout(convert, 0); 
    });
  };

  return (
      <div>
        <button onClick={handleGetLocation}>Get My Digital Address</button>
        {digipinResult && <p>Your DIGIPIN: <strong>{digipinResult}</strong></p>}
      </div>
  );
}
```

---

## API Reference

### Hooks

#### `useDigiPin()`
Universal search hook that detects if input is Lat/Lon or DigiPin.
- **Returns**: `{ input, setInput, result, loading, error, search }`
- **usage**: `search("1234")` or `search()` (uses state)

#### `useDigiPinToLatLon()`
Dedicated hook for decoding DigiPin.
- **Returns**: `{ digipinInput, setDigiPinInput, latLonResult, loading, error, convert }`

#### `useLatLonToDigiPin()`
Dedicated hook for encoding Lat/Lon to DigiPin.
- **Returns**: `{ lat, setLat, lon, setLon, digipinResult, loading, error, convert }`

### Components

- `<DigiPinInput />`: A simple search box for DigiPin.
- `<LatLonToDigiPinInput />`: UI for encoding coordinates.
- `<DigiPinToLatLonInput />`: UI for decoding DigiPin.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
