import { API_URL } from './utils.ts';

interface FetchEventsParams {
  keyword: string;
  pageParam: number;
  startDate: Date | null;
  endDate: Date | null;
  sources: string[];
}

export async function fetchEvents({ pageParam = 1, keyword, startDate, endDate, sources }: FetchEventsParams) {
  const params = new URLSearchParams();
  params.set('limit', '12');
  params.set('cursor', pageParam.toString());
  params.set('keyword', keyword);
  params.set('startDate', startDate ? startDate.toISOString() : '');
  params.set('endDate', endDate ? endDate.toISOString() : '');
  params.set('sources', sources.join(','));
  try {
    const response = await fetch(`${API_URL}/events?${params}`, {
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
