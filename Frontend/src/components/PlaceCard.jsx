import { useState } from 'react';
import { ChevronDown, ChevronUp, Hotel, Plane, UtensilsCrossed, MapPin, CalendarCheck } from 'lucide-react';
import { useItinerary } from '../context/ItineraryContext';
import BookStaysModal from './BookStaysModal';
import BookTravelModal from './BookTravelModal';
import ExploreCuisinesModal from './ExploreCuisinesModal';
import ExploreAttractionsModal from './ExploreAttractionsModal';
import PlacePlanningModal from './PlacePlanningModal'; // NEW

const PlaceCard = ({ place, countryName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const { itinerary } = useItinerary();

  // Check if place is in itinerary
  const isPlanned = itinerary.places.some(p => p.placeId === place.id);

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${isPlanned ? 'ring-2 ring-green-500' : ''}`}>
        {/* Place Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {place.estimatedDays}
          </div>
          {isPlanned && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <CalendarCheck className="w-4 h-4" />
              Planned
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{place.name}</h3>
              <p className="text-gray-600">{place.description}</p>
            </div>
          </div>

          {/* MAIN PLANNING BUTTON */}
          <button
            onClick={() => setActiveModal('planning')}
            className={`w-full mb-4 px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
              isPlanned
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg'
            }`}
          >
            {isPlanned ? '✓ Edit Your Plan' : '📅 Plan Your Visit'}
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600 font-semibold mb-4 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-5 h-5" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                <span>Show More</span>
              </>
            )}
          </button>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mb-6 space-y-4">
              {/* Attractions Preview */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Top Attractions
                </h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {place.attractions.slice(0, 3).map((attraction, idx) => (
                    <li key={idx}>{attraction}</li>
                  ))}
                </ul>
              </div>

              {/* Cuisines Preview */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-emerald-500" />
                  Must-Try Foods
                </h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {place.cuisines.slice(0, 2).map((cuisine, idx) => (
                    <li key={idx}>{cuisine.name}</li>
                  ))}
                </ul>
              </div>

              {/* Secondary Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setActiveModal('stays')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <Hotel className="w-4 h-4" />
                  <span>Stays</span>
                </button>

                <button
                  onClick={() => setActiveModal('travel')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <Plane className="w-4 h-4" />
                  <span>Travel</span>
                </button>

                <button
                  onClick={() => setActiveModal('cuisines')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Cuisines</span>
                </button>

                <button
                  onClick={() => setActiveModal('attractions')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Attractions</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'planning' && (
        <PlacePlanningModal
          place={place}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'stays' && (
        <BookStaysModal
          place={place}
          countryName={countryName}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'travel' && (
        <BookTravelModal
          place={place}
          countryName={countryName}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'cuisines' && (
        <ExploreCuisinesModal
          place={place}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'attractions' && (
        <ExploreAttractionsModal
          place={place}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
};

export default PlaceCard;