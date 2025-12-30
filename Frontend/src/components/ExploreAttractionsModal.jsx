import { X } from 'lucide-react';

const ExploreAttractionsModal = ({ place, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Best Places in {place.name}</h2>
        <div className="space-y-3">
          {place.attractions.map((attraction, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-lg">
              <p className="font-semibold text-gray-900">{attraction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreAttractionsModal;