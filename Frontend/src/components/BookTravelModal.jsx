import { X } from 'lucide-react';

const BookTravelModal = ({ place, countryName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Book Travel to {place.name}</h2>
        <p className="text-gray-600 mb-6">Travel booking feature coming soon!</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookTravelModal;