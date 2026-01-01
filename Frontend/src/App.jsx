import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CountryCatalog from './pages/CountryCatalog';
import CountryDetail from './pages/CountryDetail'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/countries" element={<CountryCatalog />} />
      <Route path="/countries/:countryName" element={<CountryDetail />} />
    </Routes>
  );
}

export default App;