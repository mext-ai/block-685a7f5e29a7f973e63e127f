import { Country } from '../types';

export const countries: Country[] = [
  // Europe
  { name: 'France', code: 'FR', capital: 'Paris', flag: '🇫🇷', x: 48, y: 46, continent: 'Europe', monument: 'Tour Eiffel' },
  { name: 'Allemagne', code: 'DE', capital: 'Berlin', flag: '🇩🇪', x: 52, y: 42, continent: 'Europe', monument: 'Porte de Brandebourg' },
  { name: 'Italie', code: 'IT', capital: 'Rome', flag: '🇮🇹', x: 50, y: 55, continent: 'Europe', monument: 'Colisée' },
  { name: 'Espagne', code: 'ES', capital: 'Madrid', flag: '🇪🇸', x: 45, y: 52, continent: 'Europe', monument: 'Sagrada Familia' },
  { name: 'Royaume-Uni', code: 'GB', capital: 'Londres', flag: '🇬🇧', x: 46, y: 41, continent: 'Europe', monument: 'Big Ben' },
  { name: 'Russie', code: 'RU', capital: 'Moscou', flag: '🇷🇺', x: 75, y: 38, continent: 'Europe', monument: 'Place Rouge' },
  { name: 'Norvège', code: 'NO', capital: 'Oslo', flag: '🇳🇴', x: 50, y: 30, continent: 'Europe' },
  { name: 'Suède', code: 'SE', capital: 'Stockholm', flag: '🇸🇪', x: 53, y: 32, continent: 'Europe' },
  { name: 'Grèce', code: 'GR', capital: 'Athènes', flag: '🇬🇷', x: 55, y: 58, continent: 'Europe', monument: 'Parthénon' },
  { name: 'Pologne', code: 'PL', capital: 'Varsovie', flag: '🇵🇱', x: 54, y: 43, continent: 'Europe' },

  // Amérique du Nord
  { name: 'États-Unis', code: 'US', capital: 'Washington', flag: '🇺🇸', x: 25, y: 52, continent: 'Amérique du Nord', monument: 'Statue de la Liberté' },
  { name: 'Canada', code: 'CA', capital: 'Ottawa', flag: '🇨🇦', x: 25, y: 35, continent: 'Amérique du Nord', monument: 'Chutes du Niagara' },
  { name: 'Mexique', code: 'MX', capital: 'Mexico', flag: '🇲🇽', x: 22, y: 62, continent: 'Amérique du Nord', monument: 'Pyramide de Chichen Itza' },

  // Amérique du Sud  
  { name: 'Brésil', code: 'BR', capital: 'Brasília', flag: '🇧🇷', x: 35, y: 78, continent: 'Amérique du Sud', monument: 'Christ Rédempteur' },
  { name: 'Argentine', code: 'AR', capital: 'Buenos Aires', flag: '🇦🇷', x: 32, y: 88, continent: 'Amérique du Sud' },
  { name: 'Chili', code: 'CL', capital: 'Santiago', flag: '🇨🇱', x: 30, y: 85, continent: 'Amérique du Sud' },
  { name: 'Pérou', code: 'PE', capital: 'Lima', flag: '🇵🇪', x: 28, y: 80, continent: 'Amérique du Sud', monument: 'Machu Picchu' },
  { name: 'Colombie', code: 'CO', capital: 'Bogotá', flag: '🇨🇴', x: 28, y: 72, continent: 'Amérique du Sud' },

  // Asie
  { name: 'Chine', code: 'CN', capital: 'Pékin', flag: '🇨🇳', x: 77, y: 48, continent: 'Asie', monument: 'Grande Muraille' },
  { name: 'Japon', code: 'JP', capital: 'Tokyo', flag: '🇯🇵', x: 87, y: 52, continent: 'Asie', monument: 'Mont Fuji' },
  { name: 'Inde', code: 'IN', capital: 'New Delhi', flag: '🇮🇳', x: 72, y: 62, continent: 'Asie', monument: 'Taj Mahal' },
  { name: 'Corée du Sud', code: 'KR', capital: 'Séoul', flag: '🇰🇷', x: 83, y: 53, continent: 'Asie' },
  { name: 'Thaïlande', code: 'TH', capital: 'Bangkok', flag: '🇹🇭', x: 75, y: 68, continent: 'Asie' },
  { name: 'Indonésie', code: 'ID', capital: 'Jakarta', flag: '🇮🇩', x: 78, y: 78, continent: 'Asie' },
  { name: 'Iran', code: 'IR', capital: 'Téhéran', flag: '🇮🇷', x: 67, y: 55, continent: 'Asie' },
  { name: 'Turquie', code: 'TR', capital: 'Ankara', flag: '🇹🇷', x: 58, y: 54, continent: 'Asie' },

  // Afrique
  { name: 'Égypte', code: 'EG', capital: 'Le Caire', flag: '🇪🇬', x: 58, y: 62, continent: 'Afrique', monument: 'Pyramides de Gizeh' },
  { name: 'Afrique du Sud', code: 'ZA', capital: 'Le Cap', flag: '🇿🇦', x: 60, y: 90, continent: 'Afrique' },
  { name: 'Nigeria', code: 'NG', capital: 'Abuja', flag: '🇳🇬', x: 48, y: 70, continent: 'Afrique' },
  { name: 'Kenya', code: 'KE', capital: 'Nairobi', flag: '🇰🇪', x: 62, y: 78, continent: 'Afrique', monument: 'Kilimandjaro' },
  { name: 'Maroc', code: 'MA', capital: 'Rabat', flag: '🇲🇦', x: 45, y: 58, continent: 'Afrique' },
  { name: 'Algérie', code: 'DZ', capital: 'Alger', flag: '🇩🇿', x: 48, y: 60, continent: 'Afrique' },

  // Océanie
  { name: 'Australie', code: 'AU', capital: 'Canberra', flag: '🇦🇺', x: 85, y: 88, continent: 'Océanie', monument: 'Opéra de Sydney' },
  { name: 'Nouvelle-Zélande', code: 'NZ', capital: 'Wellington', flag: '🇳🇿', x: 92, y: 92, continent: 'Océanie' },
];

export const getCountriesByContinent = (continent: string): Country[] => {
  if (continent === 'Monde') return countries;
  return countries.filter(country => country.continent === continent);
};

export const continents = ['Monde', 'Europe', 'Amérique du Nord', 'Amérique du Sud', 'Asie', 'Afrique', 'Océanie'];