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
      places: [] // Now stores: { placeId, name, dateRange: {from, to}, dailyNotes: {'2024-06-01': 'note'} }
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

  // NEW: Add or update a place with date range and notes
  const addPlaceToItinerary = (placeData) => {
    setItinerary(prev => {
      const existingIndex = prev.places.findIndex(p => p.placeId === placeData.placeId);
      
      if (existingIndex !== -1) {
        // Update existing place
        const updatedPlaces = [...prev.places];
        updatedPlaces[existingIndex] = placeData;
        return { ...prev, places: updatedPlaces };
      } else {
        // Add new place
        return { ...prev, places: [...prev.places, placeData] };
      }
    });
  };

  // NEW: Remove a place from itinerary
  const removePlaceFromItinerary = (placeId) => {
    setItinerary(prev => ({
      ...prev,
      places: prev.places.filter(p => p.placeId !== placeId)
    }));
  };

  // NEW: Update daily notes for a place
  const updateDailyNotes = (placeId, date, note) => {
    setItinerary(prev => {
      const updatedPlaces = prev.places.map(place => {
        if (place.placeId === placeId) {
          return {
            ...place,
            dailyNotes: {
              ...place.dailyNotes,
              [date]: note
            }
          };
        }
        return place;
      });
      return { ...prev, places: updatedPlaces };
    });
  };

  // NEW: Check if date range overlaps with existing places
  const checkDateOverlap = (newFrom, newTo, excludePlaceId = null) => {
    const newStart = new Date(newFrom);
    const newEnd = new Date(newTo);

    for (const place of itinerary.places) {
      if (excludePlaceId && place.placeId === excludePlaceId) continue;
      if (!place.dateRange) continue;

      const existingStart = new Date(place.dateRange.from);
      const existingEnd = new Date(place.dateRange.to);

      // Check for overlap
      if (newStart <= existingEnd && newEnd >= existingStart) {
        return { hasOverlap: true, conflictingPlace: place.name };
      }
    }

    return { hasOverlap: false };
  };

  // NEW: Get all dates between two dates
  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // NEW: Get total planned days
  const getTotalPlannedDays = () => {
    let totalDays = 0;
    itinerary.places.forEach(place => {
      if (place.dateRange) {
        const days = getDatesBetween(place.dateRange.from, place.dateRange.to);
        totalDays += days.length;
      }
    });
    return totalDays;
  };

  // NEW: Get total trip days
  const getTotalTripDays = () => {
    if (!itinerary.travelDates.from || !itinerary.travelDates.to) return 0;
    const days = getDatesBetween(itinerary.travelDates.from, itinerary.travelDates.to);
    return days.length;
  };

  // NEW: Get place for a specific date
  const getPlaceForDate = (date) => {
    for (const place of itinerary.places) {
      if (!place.dateRange) continue;
      const dates = getDatesBetween(place.dateRange.from, place.dateRange.to);
      if (dates.includes(date)) {
        return place;
      }
    }
    return null;
  };

  // LEGACY: Keep for backward compatibility
  const addPlaceBooking = (placeName, bookingType, data) => {
    setItinerary(prev => {
      const placeIndex = prev.places.findIndex(p => p.name === placeName);
      
      if (placeIndex === -1) {
        return {
          ...prev,
          places: [...prev.places, {
            name: placeName,
            [bookingType]: data
          }]
        };
      } else {
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
      addPlaceToItinerary,
      removePlaceFromItinerary,
      updateDailyNotes,
      checkDateOverlap,
      getDatesBetween,
      getTotalPlannedDays,
      getTotalTripDays,
      getPlaceForDate,
      // Legacy methods
      addPlaceBooking,
      getPlaceBooking,
      clearItinerary
    }}>
      {children}
    </ItineraryContext.Provider>
  );
};