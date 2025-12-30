import { createContext, useContext, useState, useEffect } from 'react';

const ItineraryContext = createContext();

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within ItineraryProvider');
  }
  return context;
};

export const ItineraryProvider = ({ children }) => {
  // Load from localStorage on mount
  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem('travelItinerary');
    return saved ? JSON.parse(saved) : {
      country: null,
      travelDates: { from: null, to: null },
      places: []
    };
  });

  // Save to localStorage whenever itinerary changes
  useEffect(() => {
    localStorage.setItem('travelItinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  const setTravelDates = (dates) => {
    setItinerary(prev => ({
      ...prev,
      travelDates: dates
    }));
  };

  const setCountry = (country) => {
    setItinerary(prev => ({
      ...prev,
      country
    }));
  };

  const addPlaceBooking = (placeName, bookingType, data) => {
    setItinerary(prev => {
      const placeIndex = prev.places.findIndex(p => p.name === placeName);
      
      if (placeIndex === -1) {
        // New place
        return {
          ...prev,
          places: [...prev.places, {
            name: placeName,
            [bookingType]: data
          }]
        };
      } else {
        // Update existing place
        const updatedPlaces = [...prev.places];
        updatedPlaces[placeIndex] = {
          ...updatedPlaces[placeIndex],
          [bookingType]: data
        };
        return {
          ...prev,
          places: updatedPlaces
        };
      }
    });
  };

  const getPlaceBooking = (placeName, bookingType) => {
    const place = itinerary.places.find(p => p.name === placeName);
    return place ? place[bookingType] : null;
  };

  const checkDateOverlap = (newCheckIn, newCheckOut, excludePlace = null) => {
    const newStart = new Date(newCheckIn);
    const newEnd = new Date(newCheckOut);

    for (const place of itinerary.places) {
      if (excludePlace && place.name === excludePlace) continue;
      if (!place.stays) continue;

      const existingStart = new Date(place.stays.checkIn);
      const existingEnd = new Date(place.stays.checkOut);

      // Check for overlap
      if (newStart < existingEnd && newEnd > existingStart) {
        return { hasOverlap: true, conflictingPlace: place.name };
      }
    }

    return { hasOverlap: false };
  };

  const clearItinerary = () => {
    setItinerary({
      country: null,
      travelDates: { from: null, to: null },
      places: []
    });
    localStorage.removeItem('travelItinerary');
  };

  return (
    <ItineraryContext.Provider value={{
      itinerary,
      setTravelDates,
      setCountry,
      addPlaceBooking,
      getPlaceBooking,
      checkDateOverlap,
      clearItinerary
    }}>
      {children}
    </ItineraryContext.Provider>
  );
};