const AttendeeList = ({ attendees }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!attendees || attendees.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendees</h3>
        <p className="text-gray-500 text-center py-8">
          No attendees registered yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Attendees ({attendees.length})
      </h3>
      <div className="space-y-3">
        {attendees.map((attendee) => (
          <div
            key={attendee._id}
            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div>
              <p className="font-medium text-gray-800">{attendee.fullName}</p>
              <p className="text-sm text-gray-600">{attendee.email}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Joined</p>
              <p className="text-sm text-gray-700">
                {formatDate(attendee.joinedAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendeeList;