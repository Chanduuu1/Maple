import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useItinerary } from '../context/ItineraryContext';
import { countryDetails } from '../data/countriesData';
import Navbar from '../components/navbar';
import ItineraryCalendar from '../components/ItineraryCalendar';
import PlaceCard from '../components/PlaceCard';
import { ArrowLeft } from 'lucide-react';

const CountryDetail = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const { setCountry, itinerary } = useItinerary();

  // Get country data
  const country = countryDetails[countryName.toLowerCase()];

  // FIX: Remove setCountry from dependencies
  useEffect(() => {
    if (country) {
      setCountry(country.name);
    }
  }, [country?.name]); // Only depend on country.name, not setCountry

  // If country not found, redirect
  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Country Not Found</h1>
          <button
            onClick={() => navigate('/countries')}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            Back to Countries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Top Section: 50/50 Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* LEFT: Heading + Image */}
          <div>
            {/* Back Button */}
            <button
              onClick={() => navigate('/countries')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Countries</span>
            </button>

            {/* Heading */}
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Let's plan your visit to <span className="text-emerald-500">{country.name}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">{country.tagline}</p>
            <p className="text-gray-700 mb-8">{country.description}</p>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={country.heroImage}
                alt={country.name}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Calendar */}
          <div>
            <ItineraryCalendar />
          </div>
        </div>

        {/* Bottom Section: Place Cards */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Best Places to Visit in {country.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {country.places.map((place) => (
              <PlaceCard key={place.id} place={place} countryName={country.name} />
            ))}
          </div>
        </div>

        {/* Finalize Itinerary Button */}
        {itinerary.places.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/itinerary-summary')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              View Itinerary Summary ({itinerary.places.length} {itinerary.places.length === 1 ? 'place' : 'places'}) →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;