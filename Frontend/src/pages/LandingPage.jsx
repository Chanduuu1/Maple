import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import DateRangePicker from '../components/DateRangePicker';

const LandingPage = () => {
  const navigate = useNavigate();
  const [travelDates, setTravelDates] = useState({ from: null, to: null });

  const handleLetsGo = () => {
    if (travelDates.from && travelDates.to) {
      // Navigate to country catalog with dates in state
      navigate('/countries', { state: { dates: travelDates } });
    } else {
      alert('Please select both start and end dates');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <Navbar />
      
      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-12">
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Planning your trip
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  faster and smoother
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your solo travel companion. Discover destinations, plan itineraries, 
                and book everything in one place.
              </p>
            </div>

            {/* Date Selection Card */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  When are you traveling?
                </h2>
                
                <DateRangePicker onDatesChange={setTravelDates} />

                {/* Let's Go Button */}
                <button
                  onClick={handleLetsGo}
                  className="mt-8 w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={!travelDates.from || !travelDates.to}
                >
                  Let's Go! 🚀
                </button>
              </div>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl">🗺️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Curated Destinations</h3>
                <p className="text-gray-600 text-sm">Handpicked locations perfect for solo travelers</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl">🏨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">All-in-One Booking</h3>
                <p className="text-gray-600 text-sm">Hotels, hostels, and restaurants in one place</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Hassle-Free Planning</h3>
                <p className="text-gray-600 text-sm">Save time with smart recommendations</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;