import { useState, useEffect } from 'react';
import { Plus, Video } from 'lucide-react';
import { getWebinars } from '../services/api';
import WebinarCard from '../components/WebinarCard';
import CreateWebinarModal from '../components/CreateWebinarModal';

const WebinarList = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWebinars = async () => {
    try {
      setLoading(true);
      const response = await getWebinars();
      setWebinars(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch webinars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  const handleWebinarCreated = () => {
    fetchWebinars();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading webinars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Webinars</h1>
            <p className="text-gray-600 mt-1">
              Browse and register for upcoming webinars
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Webinar
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {webinars.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No webinars yet
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first webinar to get started
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Webinar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <WebinarCard key={webinar._id} webinar={webinar} />
            ))}
          </div>
        )}
      </div>

      <CreateWebinarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleWebinarCreated}
      />
    </div>
  );
};

export default WebinarList;