import { X } from 'lucide-react';

const ExploreCuisinesModal = ({ place, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Local Cuisines in {place.name}</h2>
        <div className="space-y-4">
          {place.cuisines.map((cuisine, idx) => (
            <div key={idx} className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{cuisine.name}</h3>
              <p className="text-sm text-gray-600">{cuisine.restaurant}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCuisinesModal;