import { useState, useEffect } from 'react';
import { useItinerary } from '../context/ItineraryContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ItineraryCalendar = () => {
  const { itinerary } = useItinerary();
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const isDateInRange = (date) => {
    if (!itinerary.travelDates.from || !itinerary.travelDates.to) return false;
    const checkDate = new Date(date);
    const from = new Date(itinerary.travelDates.from);
    const to = new Date(itinerary.travelDates.to);
    return checkDate >= from && checkDate <= to;
  };

  const getPlaceForDate = (date) => {
    const checkDate = new Date(date);
    for (const place of itinerary.places) {
      if (!place.stays) continue;
      const checkIn = new Date(place.stays.checkIn);
      const checkOut = new Date(place.stays.checkOut);
      if (checkDate >= checkIn && checkDate < checkOut) {
        return place.name;
      }
    }
    return null;
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isInRange = isDateInRange(dateString);
      const placeName = getPlaceForDate(dateString);

      days.push(
        <div
          key={day}
          className={`h-12 flex flex-col items-center justify-center rounded-lg text-sm transition-all ${
            isInRange
              ? placeName
                ? 'bg-emerald-500 text-white font-semibold'
                : 'bg-emerald-100 text-emerald-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>{day}</span>
          {placeName && (
            <span className="text-[10px] truncate w-full text-center px-1">
              {placeName}
            </span>
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
          <div className="w-4 h-4 bg-emerald-100 rounded"></div>
          <span className="text-gray-600">Travel dates</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 bg-emerald-500 rounded"></div>
          <span className="text-gray-600">Booked stays</span>
        </div>
      </div>

      {/* Travel summary */}
      {itinerary.travelDates.from && itinerary.travelDates.to && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
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
          <p className="text-xs text-gray-500 mt-1">
            {Math.ceil(
              (new Date(itinerary.travelDates.to) - new Date(itinerary.travelDates.from)) /
              (1000 * 60 * 60 * 24)
            )}{' '}
            days
          </p>
        </div>
      )}
    </div>
  );
};

export default ItineraryCalendar;