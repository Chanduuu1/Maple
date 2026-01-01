import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../context/ItineraryContext';
import Navbar from '../components/navbar';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Edit, 
  Trash2, 
  ChevronDown,
  ChevronUp,
  Hotel,
  Plane,
  UtensilsCrossed,
  CheckCircle
} from 'lucide-react';

const ItinerarySummary = () => {
  const navigate = useNavigate();
  const { itinerary, removePlaceFromItinerary, getDatesBetween } = useItinerary();
  const [expandedPlaces, setExpandedPlaces] = useState({});

  // Calculate trip details
  const totalTripDays = itinerary.travelDates.from && itinerary.travelDates.to
    ? Math.ceil((new Date(itinerary.travelDates.to) - new Date(itinerary.travelDates.from)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const plannedDays = itinerary.places.reduce((total, place) => {
    if (place.dateRange && place.dateRange.from && place.dateRange.to) {
      const days = Math.ceil((new Date(place.dateRange.to) - new Date(place.dateRange.from)) / (1000 * 60 * 60 * 24)) + 1;
      return total + days;
    }
    return total;
  }, 0);

  const isFullyPlanned = plannedDays === totalTripDays;

  // FIX: Filter out places without dateRange and sort
  const sortedPlaces = itinerary.places
    .filter(place => place.dateRange && place.dateRange.from && place.dateRange.to) // Only include places with valid dates
    .sort((a, b) => new Date(a.dateRange.from) - new Date(b.dateRange.from));

  const toggleExpand = (placeId) => {
    setExpandedPlaces(prev => ({
      ...prev,
      [placeId]: !prev[placeId]
    }));
  };

  const handleEdit = (placeId) => {
    // Navigate back to country detail page
    navigate(`/countries/${itinerary.country.toLowerCase()}`);
  };

  const handleRemove = (placeId) => {
    if (window.confirm('Are you sure you want to remove this place from your itinerary?')) {
      removePlaceFromItinerary(placeId);
    }
  };

  const handleProceedToBooking = () => {
    navigate('/booking');
  };

  // FIX: Better validation for empty itinerary
  if (!itinerary.country || !itinerary.places || itinerary.places.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">No Itinerary Yet</h1>
            <p className="text-gray-600 mb-8">Start planning your trip to create an itinerary</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Start Planning
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FIX: If no places have dates, show a different message
  if (sortedPlaces.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <button
            onClick={() => navigate(`/countries/${itinerary.country.toLowerCase()}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Planning</span>
          </button>

          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your <span className="text-emerald-500">{itinerary.country}</span> Itinerary
            </h1>
            <p className="text-gray-600 mb-8">
              You have {itinerary.places.length} place(s) selected, but no dates planned yet.
            </p>
            <button
              onClick={() => navigate(`/countries/${itinerary.country.toLowerCase()}`)}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Plan Your Dates
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/countries/${itinerary.country.toLowerCase()}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Planning</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your <span className="text-emerald-500">{itinerary.country}</span> Itinerary
          </h1>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(itinerary.travelDates.from).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                {' → '}
                {new Date(itinerary.travelDates.to).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{sortedPlaces.length} destination{sortedPlaces.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Planning Progress</h2>
            <span className="text-2xl font-bold text-emerald-500">
              {plannedDays}/{totalTripDays} days
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${totalTripDays > 0 ? (plannedDays / totalTripDays) * 100 : 0}%` }}
            ></div>
          </div>
          {isFullyPlanned ? (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Your itinerary is complete! Ready to book.</span>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              {totalTripDays - plannedDays} day{totalTripDays - plannedDays !== 1 ? 's' : ''} remaining to plan
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Journey</h2>
          
          {sortedPlaces.map((place, index) => {
            const dates = getDatesBetween(place.dateRange.from, place.dateRange.to);
            const isExpanded = expandedPlaces[place.placeId];

            return (
              <div key={place.placeId} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Place Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-emerald-500 text-white rounded-full font-bold text-sm">
                          {index + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">{place.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 ml-11">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(place.dateRange.from).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                          {' - '}
                          {new Date(place.dateRange.to).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                          {' '}
                          ({dates.length} {dates.length === 1 ? 'day' : 'days'})
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(place.placeId)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleRemove(place.placeId)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleExpand(place.placeId)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Daily Notes */}
                {isExpanded && (
                  <div className="p-6 bg-gray-50 space-y-4">
                    {dates.map((date, dayIndex) => (
                      <div key={date} className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Day {dayIndex + 1} - {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </h4>
                        {place.dailyNotes && place.dailyNotes[date] ? (
                          <p className="text-gray-700 text-sm whitespace-pre-line">
                            {place.dailyNotes[date]}
                          </p>
                        ) : (
                          <p className="text-gray-400 text-sm italic">No notes for this day</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Book?</h2>
          
          {!isFullyPlanned && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800 text-sm">
                ⚠️ You have {totalTripDays - plannedDays} unplanned day(s). 
                Complete your itinerary for the best experience, or proceed to booking anyway.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Hotel className="w-8 h-8 text-emerald-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Hotels & Stays</h3>
                <p className="text-sm text-gray-600">Book accommodations</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Plane className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Travel</h3>
                <p className="text-sm text-gray-600">Flights & transportation</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <UtensilsCrossed className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Dining</h3>
                <p className="text-sm text-gray-600">Reserve restaurants</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/countries/${itinerary.country.toLowerCase()}`)}
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Continue Planning
            </button>
            <button
              onClick={handleProceedToBooking}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold text-lg"
            >
              Proceed to Booking 🎉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarySummary;