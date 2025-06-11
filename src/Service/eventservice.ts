import { Eventt } from '../Model/Eventt';

const normalizeCategory = (rawCategory: string): string => {
  const cat = rawCategory.toLowerCase();

  if (cat.includes('baseball')) { return 'Baseball'; }
  if (cat.includes('football') || cat.includes('nfl')) { return 'Football'; }
  if (cat.includes('basketball')) { return 'Basketball'; }
  if (cat.includes('hockey')) { return 'Hockey'; }
  if (cat.includes('tennis')) { return 'Tennis'; }

  if (cat.includes('music') || cat === 'rock' || cat === 'pop') { return 'Music'; }
  if (cat.includes('sport')) { return 'Sports'; }
  if (cat.includes('arts') || cat.includes('theater') || cat.includes('theatre')) { return 'Arts & Theatre'; }
  if (cat.includes('film') || cat.includes('movie')) { return 'Film'; }
  if (cat.includes('misc')) { return 'Miscellaneous'; }

  return rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();
};

const API_URL =
 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=3cDpuUzznD3a9EYy7WGKvwhW3F2lFJs3&countryCode=US&size=10&keyword=music';

export const fetchEvents = async (): Promise<Eventt[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const text = await response.text();
      console.error(' Response failed:', text);
      throw new Error(`API error! Status ${response.status}`);
    }

    const data = await response.json();

    if (!data._embedded?.events) {
      throw new Error('No events found');
    }

const events: Eventt[] = data._embedded.events.map((event: any) => {
  const venue = event._embedded?.venues?.[0];
  const address = [
    venue?.address?.line1,
    venue?.city?.name,
    venue?.state?.name,
  ].filter(Boolean).join(', ');

  return {
    id: event.id,
    name: event.name,
    date: event.dates?.start?.localDate || 'Unknown date',
    category: normalizeCategory(event.classifications?.[0]?.segment?.name || 'Uncategorized'),
    imageUrl: event.images?.[0]?.url || '',
    url: event.url,
    info: event.info || '',
    location: address || venue?.name || 'Unknown location',
    latitude: parseFloat(venue?.location?.latitude || '0'),
    longitude: parseFloat(venue?.location?.longitude || '0'),
  };
});

    return events;
  } catch (err) {
    console.error('🔥 Final catch:', err);
    throw new Error('Failed to fetch events.');
  }
};
