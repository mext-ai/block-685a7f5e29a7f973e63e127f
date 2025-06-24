import { Country } from '../types';

export const countries: Country[] = [
  // Europe - coordonnées ajustées pour la vraie carte du monde
  { name: 'France', code: 'FR', capital: 'Paris', flag: '🇫🇷', x: 52, y: 35, continent: 'Europe', monument: 'Tour Eiffel' },
  { name: 'Allemagne', code: 'DE', capital: 'Berlin', flag: '🇩🇪', x: 55, y: 33, continent: 'Europe', monument: 'Porte de Brandebourg' },
  { name: 'Italie', code: 'IT', capital: 'Rome', flag: '🇮🇹', x: 56, y: 41, continent: 'Europe', monument: 'Colisée' },
  { name: 'Espagne', code: 'ES', capital: 'Madrid', flag: '🇪🇸', x: 50, y: 40, continent: 'Europe', monument: 'Sagrada Familia' },
  { name: 'Royaume-Uni', code: 'GB', capital: 'Londres', flag: '🇬🇧', x: 50, y: 32, continent: 'Europe', monument: 'Big Ben' },
  { name: 'Russie', code: 'RU', capital: 'Moscou', flag: '🇷🇺', x: 64, y: 28, continent: 'Europe', monument: 'Place Rouge' },
  { name: 'Norvège', code: 'NO', capital: 'Oslo', flag: '🇳🇴', x: 55, y: 25, continent: 'Europe' },
  { name: 'Suède', code: 'SE', capital: 'Stockholm', flag: '🇸🇪', x: 57, y: 25, continent: 'Europe' },
  { name: 'Grèce', code: 'GR', capital: 'Athènes', flag: '🇬🇷', x: 58, y: 44, continent: 'Europe', monument: 'Parthénon' },
  { name: 'Pologne', code: 'PL', capital: 'Varsovie', flag: '🇵🇱', x: 58, y: 33, continent: 'Europe' },

  // Amérique du Nord - coordonnées corrigées pour la vraie carte
  { name: 'États-Unis', code: 'US', capital: 'Washington', flag: '🇺🇸', x: 24, y: 40, continent: 'Amérique du Nord', monument: 'Statue de la Liberté' },
  { name: 'Canada', code: 'CA', capital: 'Ottawa', flag: '🇨🇦', x: 25, y: 32, continent: 'Amérique du Nord', monument: 'Chutes du Niagara' },
  { name: 'Mexique', code: 'MX', capital: 'Mexico', flag: '🇲🇽', x: 22, y: 48, continent: 'Amérique du Nord', monument: 'Pyramide de Chichen Itza' },

  // Amérique du Sud - positions géographiques réelles
  { name: 'Brésil', code: 'BR', capital: 'Brasília', flag: '🇧🇷', x: 30, y: 60, continent: 'Amérique du Sud', monument: 'Christ Rédempteur' },
  { name: 'Argentine', code: 'AR', capital: 'Buenos Aires', flag: '🇦🇷', x: 28, y: 75, continent: 'Amérique du Sud' },
  { name: 'Chili', code: 'CL', capital: 'Santiago', flag: '🇨🇱', x: 26, y: 72, continent: 'Amérique du Sud' },
  { name: 'Pérou', code: 'PE', capital: 'Lima', flag: '🇵🇪', x: 25, y: 62, continent: 'Amérique du Sud', monument: 'Machu Picchu' },
  { name: 'Colombie', code: 'CO', capital: 'Bogotá', flag: '🇨🇴', x: 26, y: 52, continent: 'Amérique du Sud' },

  // Asie - coordonnées précises pour la projection équirectangulaire
  { name: 'Chine', code: 'CN', capital: 'Pékin', flag: '🇨🇳', x: 72, y: 38, continent: 'Asie', monument: 'Grande Muraille' },
  { name: 'Japon', code: 'JP', capital: 'Tokyo', flag: '🇯🇵', x: 80, y: 40, continent: 'Asie', monument: 'Mont Fuji' },
  { name: 'Inde', code: 'IN', capital: 'New Delhi', flag: '🇮🇳', x: 68, y: 50, continent: 'Asie', monument: 'Taj Mahal' },
  { name: 'Corée du Sud', code: 'KR', capital: 'Séoul', flag: '🇰🇷', x: 78, y: 39, continent: 'Asie' },
  { name: 'Thaïlande', code: 'TH', capital: 'Bangkok', flag: '🇹🇭', x: 72, y: 54, continent: 'Asie' },
  { name: 'Indonésie', code: 'ID', capital: 'Jakarta', flag: '🇮🇩', x: 74, y: 58, continent: 'Asie' },
  { name: 'Iran', code: 'IR', capital: 'Téhéran', flag: '🇮🇷', x: 63, y: 42, continent: 'Asie' },
  { name: 'Turquie', code: 'TR', capital: 'Ankara', flag: '🇹🇷', x: 60, y: 42, continent: 'Asie' },

  // Afrique - positions ajustées selon la vraie géographie
  { name: 'Égypte', code: 'EG', capital: 'Le Caire', flag: '🇪🇬', x: 59, y: 48, continent: 'Afrique', monument: 'Pyramides de Gizeh' },
  { name: 'Afrique du Sud', code: 'ZA', capital: 'Le Cap', flag: '🇿🇦', x: 58, y: 74, continent: 'Afrique' },
  { name: 'Nigeria', code: 'NG', capital: 'Abuja', flag: '🇳🇬', x: 52, y: 55, continent: 'Afrique' },
  { name: 'Kenya', code: 'KE', capital: 'Nairobi', flag: '🇰🇪', x: 61, y: 58, continent: 'Afrique', monument: 'Kilimandjaro' },
  { name: 'Maroc', code: 'MA', capital: 'Rabat', flag: '🇲🇦', x: 49, y: 42, continent: 'Afrique' },
  { name: 'Algérie', code: 'DZ', capital: 'Alger', flag: '🇩🇿', x: 52, y: 45, continent: 'Afrique' },

  // Océanie - coordonnées corrigées
  { name: 'Australie', code: 'AU', capital: 'Canberra', flag: '🇦🇺', x: 78, y: 70, continent: 'Océanie', monument: 'Opéra de Sydney' },
  { name: 'Nouvelle-Zélande', code: 'NZ', capital: 'Wellington', flag: '🇳🇿', x: 83, y: 78, continent: 'Océanie' },
];

export const getCountriesByContinent = (continent: string): Country[] => {
  if (continent === 'Monde') return countries;
  return countries.filter(country => country.continent === continent);
};

export const continents = ['Monde', 'Europe', 'Amérique du Nord', 'Amérique du Sud', 'Asie', 'Afrique', 'Océanie'];