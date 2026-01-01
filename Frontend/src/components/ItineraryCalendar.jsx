import { useState, useEffect } from 'react';
import { useItinerary } from '../context/ItineraryContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ItineraryCalendar = () => {
  const { itinerary, getPlaceForDate } = useItinerary();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    if (itinerary.travelDates.from) {
      setCurrentMonth(new Date(itinerary.travelDates.from));
    }
  }, [itinerary.travelDates.from]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isDateInTravelRange = (date) => {
    if (!itinerary.travelDates.from || !itinerary.travelDates.to) return false;
    const checkDate = new Date(date);
    const from = new Date(itinerary.travelDates.from);
    const to = new Date(itinerary.travelDates.to);
    return checkDate >= from && checkDate <= to;
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-16"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isInTravelRange = isDateInTravelRange(dateString);
      const placeData = getPlaceForDate(dateString);

      // Determine styling
      let bgColor = 'bg-white hover:bg-gray-50';
      let textColor = 'text-gray-700';
      
      if (isInTravelRange) {
        if (placeData) {
          // Green for planned days
          bgColor = 'bg-green-500 hover:bg-green-600';
          textColor = 'text-white';
        } else {
          // Purple for unplanned travel days
          bgColor = 'bg-purple-200 hover:bg-purple-300';
          textColor = 'text-purple-900';
        }
      }

      days.push(
        <div
          key={day}
          className="relative"
          onMouseEnter={() => setHoveredDate(dateString)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <div
            className={`h-16 flex flex-col items-center justify-center rounded-lg text-sm transition-all cursor-pointer ${bgColor} ${textColor} font-medium`}
          >
            <span className="text-base">{day}</span>
            {placeData && (
              <span className="text-[10px] truncate w-full text-center px-1 mt-1">
                {placeData.name}
              </span>
            )}
          </div>

          {/* Hover Tooltip */}
          {hoveredDate === dateString && placeData && placeData.dailyNotes && placeData.dailyNotes[dateString] && (
            <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
              <div className="font-semibold mb-1">{placeData.name}</div>
              <div className="text-gray-300">{placeData.dailyNotes[dateString]}</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                <div className="border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const totalTripDays = itinerary.travelDates.from && itinerary.travelDates.to
    ? Math.ceil((new Date(itinerary.travelDates.to) - new Date(itinerary.travelDates.from)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const plannedDays = itinerary.places.reduce((total, place) => {
    if (place.dateRange) {
      const days = Math.ceil((new Date(place.dateRange.to) - new Date(place.dateRange.from)) / (1000 * 60 * 60 * 24)) + 1;
      return total + days;
    }
    return total;
  }, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-bold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendar()}
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-purple-200 rounded"></div>
          <span className="text-gray-600">Travel dates (unplanned)</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600">Planned days</span>
        </div>
      </div>

      {/* Travel summary */}
      {itinerary.travelDates.from && itinerary.travelDates.to && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Your Trip</p>
            <p className="text-xs text-gray-600">
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
            </p>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Planning Progress</span>
              <span className="font-semibold">{plannedDays}/{totalTripDays} days</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(plannedDays / totalTripDays) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryCalendar;