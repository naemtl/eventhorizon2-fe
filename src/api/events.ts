export async function fetchEvents({ pageParam = 1, queryString = '' }) {
  const params = new URLSearchParams();
  params.set('limit', '12');
  params.set('cursor', pageParam.toString());
  params.set('queryString', queryString);
  try {
    const response = await fetch(`http://localhost:3000/events?${params}`, {
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
