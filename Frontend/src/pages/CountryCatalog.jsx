import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import HeroCarousel from '../components/HeroCarousel';
import CountryRow from '../components/CountryRow';
import { featuredCountries, categorizedCountries } from '../data/countries';

const CountryCatalog = () => {
  const location = useLocation();
  const dates = location.state?.dates;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <Navbar />
      
      <div className="pt-28 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Destination
          </h1>
          {dates && (
            <p className="text-xl text-gray-600">
              Traveling from{' '}
              <span className="font-semibold text-emerald-600">
                {dates.from?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              {' '}to{' '}
              <span className="font-semibold text-emerald-600">
                {dates.to?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </p>
          )}
        </div>

        {/* Hero Carousel */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <HeroCarousel countries={featuredCountries} />
        </div>

        {/* Categorized Countries */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <CountryRow category={categorizedCountries.summer} />
          <CountryRow category={categorizedCountries.northernLights} />
          <CountryRow category={categorizedCountries.adventure} />
          <CountryRow category={categorizedCountries.cultural} />
        </div>
      </div>
    </div>
  );
};

export default CountryCatalog;