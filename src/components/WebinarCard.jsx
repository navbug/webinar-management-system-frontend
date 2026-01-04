import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';

const WebinarCard = ({ webinar }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      onClick={() => navigate(`/webinars/${webinar._id}`)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {webinar.title}
      </h3>
      <div className="flex items-center text-gray-600 mb-2">
        <Calendar className="w-5 h-5 mr-2" />
        <span className="text-sm">{formatDate(webinar.scheduledAt)}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <Users className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">
          {webinar.attendeeCount} attendees
        </span>
      </div>
    </div>
  );
};

export default WebinarCard;