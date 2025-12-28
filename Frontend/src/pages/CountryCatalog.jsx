import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';

const CountryCatalog = () => {
  const location = useLocation();
  const dates = location.state?.dates;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Destination
          </h1>
          {dates && (
            <p className="text-gray-600 mb-8">
              Traveling from {dates.from?.toLocaleDateString()} to {dates.to?.toLocaleDateString()}
            </p>
          )}
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-2xl text-gray-400">
              Country catalog coming next! 🌍
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCatalog;