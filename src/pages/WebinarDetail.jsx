import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users } from 'lucide-react';
import { getWebinarDetails } from '../services/api';
import RegistrationForm from '../components/RegistrationForm';
import AttendeeList from '../components/AttendeeList';

const WebinarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWebinarDetails = async () => {
    try {
      setLoading(true);
      const response = await getWebinarDetails(id);
      setWebinar(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch webinar details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinarDetails();
  }, [id]);

  const handleRegistrationSuccess = () => {
    fetchWebinarDetails();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading webinar details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-4">
            {error}
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Webinars
          </button>
        </div>
      </div>
    );
  }

  if (!webinar) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Webinars
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {webinar.title}
          </h1>
          {webinar.description && (
            <p className="text-gray-600 mb-6">{webinar.description}</p>
          )}
          <div className="flex flex-wrap gap-4 text-gray-700">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              <span>{formatDate(webinar.scheduledAt)}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium">
                {webinar.attendeeCount} attendees registered
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RegistrationForm
              webinarId={id}
              onSuccess={handleRegistrationSuccess}
            />
          </div>
          <div className="lg:col-span-2">
            <AttendeeList attendees={webinar.attendees} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarDetail;