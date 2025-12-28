import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CountryCatalog from './pages/CountryCatalog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/countries" element={<CountryCatalog />} />
      </Routes>
    </Router>
  );
}

export default App;