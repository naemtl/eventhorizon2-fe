export async function fetchEvents(queryString: string) {
  try {
    const response = await fetch(`http://localhost:3000/events?${queryString}`, {
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
      console.error('Error fetching events:', response.status);
    }
  }
  catch (error) {
    console.error('Error fetching events:', error);
  }
};
