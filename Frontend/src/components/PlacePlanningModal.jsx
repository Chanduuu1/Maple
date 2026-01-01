import { useState, useEffect } from 'react';
import { X, Calendar, StickyNote, AlertCircle } from 'lucide-react';
import { useItinerary } from '../context/ItineraryContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PlacePlanningModal = ({ place, onClose }) => {
  const {
    itinerary,
    addPlaceToItinerary,
    removePlaceFromItinerary,
    updateDailyNotes,
    checkDateOverlap,
    getDatesBetween
  } = useItinerary();

  // Check if place is already in itinerary
  const existingPlace = itinerary.places.find(p => p.placeId === place.id);

  const [startDate, setStartDate] = useState(existingPlace?.dateRange?.from ? new Date(existingPlace.dateRange.from) : null);
  const [endDate, setEndDate] = useState(existingPlace?.dateRange?.to ? new Date(existingPlace.dateRange.to) : null);
  const [dailyNotes, setDailyNotes] = useState(existingPlace?.dailyNotes || {});
  const [error, setError] = useState('');

  const travelStart = itinerary.travelDates.from ? new Date(itinerary.travelDates.from) : null;
  const travelEnd = itinerary.travelDates.to ? new Date(itinerary.travelDates.to) : null;

  // Get dates for notes input
  const selectedDates = startDate && endDate ? getDatesBetween(
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  ) : [];

  const handleSave = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    // Check for overlaps
    const overlap = checkDateOverlap(
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0],
      place.id
    );

    if (overlap.hasOverlap) {
      setError(`Dates overlap with ${overlap.conflictingPlace}`);
      return;
    }

    // Save to itinerary
    addPlaceToItinerary({
      placeId: place.id,
      name: place.name,
      dateRange: {
        from: startDate.toISOString().split('T')[0],
        to: endDate.toISOString().split('T')[0]
      },
      dailyNotes: dailyNotes
    });

    onClose();
  };

  const handleRemove = () => {
    removePlaceFromItinerary(place.id);
    onClose();
  };

  const handleNoteChange = (date, note) => {
    setDailyNotes(prev => ({
      ...prev,
      [date]: note
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Plan Your Visit</h2>
            <p className="text-gray-600 mt-1">{place.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Date Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              Select Dates
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setError('');
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={travelStart}
                  maxDate={travelEnd}
                  placeholderText="Select start date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  dateFormat="MMM dd, yyyy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setError('');
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || travelStart}
                  maxDate={travelEnd}
                  placeholderText="Select end date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  dateFormat="MMM dd, yyyy"
                  disabled={!startDate}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Recommended: {place.estimatedDays}
            </p>
          </div>

          {/* Daily Notes */}
          {selectedDates.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-emerald-500" />
                Daily Notes
              </h3>
              <div className="space-y-4">
                {selectedDates.map((date, index) => (
                  <div key={date} className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Day {index + 1} - {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </label>
                    <textarea
                      value={dailyNotes[date] || ''}
                      onChange={(e) => handleNoteChange(date, e.target.value)}
                      placeholder="e.g., Arrive at 10AM, have lunch at the bay, visit church at xyz, rest at hotel..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                      rows="3"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Activities */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <h4 className="font-semibold text-emerald-900 mb-2">Suggested Activities</h4>
            <ul className="list-disc list-inside text-sm text-emerald-700 space-y-1">
              {place.attractions.slice(0, 4).map((attraction, idx) => (
                <li key={idx}>{attraction}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
          <div>
            {existingPlace && (
              <button
                onClick={handleRemove}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Remove from Plan
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
            >
              {existingPlace ? 'Update Plan' : 'Add to Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePlanningModal;