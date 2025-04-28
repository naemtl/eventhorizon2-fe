import { API_URL } from './utils.ts';

export async function fetchEventListing(eventId: string) {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      console.error('Error fetching event:', response.status);
    }
  }
  catch (error) {
    console.error('Error fetching event:', error);
  }
};
