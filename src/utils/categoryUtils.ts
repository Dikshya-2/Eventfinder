// utils/categoryUtils.ts
const categoryMap = [
  { keywords: ['baseball'], label: 'Baseball' },
  { keywords: ['football', 'nfl'], label: 'Football' },
  { keywords: ['basketball'], label: 'Basketball' },
  { keywords: ['hockey'], label: 'Hockey' },
  { keywords: ['tennis'], label: 'Tennis' },
  { keywords: ['music', 'rock', 'pop'], label: 'Music' },
  { keywords: ['sport'], label: 'Sports' },
  { keywords: ['arts', 'theater', 'theatre'], label: 'Arts & Theatre' },
  { keywords: ['film', 'movie'], label: 'Film' },
  { keywords: ['misc'], label: 'Miscellaneous' },
];

export const normalizeCategory = (rawCategory: string): string => {
  const cat = rawCategory.toLowerCase();
  for (const { keywords, label } of categoryMap) {
    if (keywords.some(k => cat.includes(k))) {return label;}
  }
  return rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();
};
