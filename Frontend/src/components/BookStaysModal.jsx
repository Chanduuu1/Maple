import { X } from 'lucide-react';
import { useState } from 'react';
import { useItinerary } from '../context/ItineraryContext';

const BookStaysModal = ({ place, countryName, onClose }) => {
  const { addPlaceBooking, checkDateOverlap, itinerary } = useItinerary();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate dates
    if (!checkIn || !checkOut || !hotelName) {
      setError('Please fill in all fields');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in date');
      return;
    }

    // Check for overlaps
    const overlap = checkDateOverlap(checkIn, checkOut, place.name);
    if (overlap.hasOverlap) {
      setError(`Dates overlap with your stay at ${overlap.conflictingPlace}`);
      return;
    }

    // Check if dates are within travel dates
    if (itinerary.travelDates.from && itinerary.travelDates.to) {
      const travelStart = new Date(itinerary.travelDates.from);
      const travelEnd = new Date(itinerary.travelDates.to);
      const stayStart = new Date(checkIn);
      const stayEnd = new Date(checkOut);

      if (stayStart < travelStart || stayEnd > travelEnd) {
        setError('Stay dates must be within your travel dates');
        return;
      }
    }

    // Save booking
    addPlaceBooking(place.name, 'stays', {
      hotelName,
      checkIn,
      checkOut
    });

    alert(`✅ Stay booked at ${hotelName} in ${place.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Book Stays at {place.name}
        </h2>
        <p className="text-gray-600 mb-6">{countryName}</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hotel/Accommodation Name
            </label>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              placeholder="e.g., Hotel Borg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Check-in Date
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Check-out Date
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookStaysModal;