import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Webinar APIs
export const createWebinar = async (data) => {
  const response = await api.post('/webinars', data);
  return response.data;
};

export const getWebinars = async () => {
  const response = await api.get('/webinars');
  return response.data;
};

export const getWebinarDetails = async (id) => {
  const response = await api.get(`/webinars/${id}`);
  return response.data;
};

// Attendee APIs
export const registerAttendee = async (webinarId, data) => {
  const response = await api.post(`/webinars/${webinarId}/register`, data);
  return response.data;
};

export const getAttendees = async (webinarId) => {
  const response = await api.get(`/webinars/${webinarId}/attendees`);
  return response.data;
};

export default api;