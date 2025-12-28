import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ onDatesChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDatesChange({ from: date, to: endDate });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDatesChange({ from: startDate, to: date });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
      {/* From Date */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          From
        </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          placeholderText="Select start date"
          className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
          dateFormat="MMM dd, yyyy"
        />
      </div>

      {/* To Date */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          To
        </label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || new Date()}
          placeholderText="Select end date"
          className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
          dateFormat="MMM dd, yyyy"
          disabled={!startDate}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;