import { DigiPinInput, LatLonToDigiPinInput, DigiPinToLatLonInput } from 'digipin-reactjs';

function App() {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>DigiPin React Example</h1>
      <DigiPinInput />
      <LatLonToDigiPinInput />
      <DigiPinToLatLonInput />
    </div>
  );
}

export default App;
