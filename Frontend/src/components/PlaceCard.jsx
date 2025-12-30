import { useState } from 'react';
import { ChevronDown, ChevronUp, Hotel, Plane, UtensilsCrossed, MapPin } from 'lucide-react';
import BookStaysModal from './BookStaysModal';
import BookTravelModal from './BookTravelModal';
import ExploreCuisinesModal from './ExploreCuisinesModal';
import ExploreAttractionsModal from './ExploreAttractionsModal';

const PlaceCard = ({ place, countryName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveModal('stays')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
            >
              <Hotel className="w-5 h-5" />
              <span className="text-sm">Book Stays</span>
            </button>

            <button
              onClick={() => setActiveModal('travel')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              <Plane className="w-5 h-5" />
              <span className="text-sm">Book Travel</span>
            </button>

            <button
              onClick={() => setActiveModal('cuisines')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span className="text-sm">Cuisines</span>
            </button>

            <button
              onClick={() => setActiveModal('attractions')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Attractions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
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