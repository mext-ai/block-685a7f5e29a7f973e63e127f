import { Country } from '../types';

export const countries: Country[] = [
  // Europe - coordonnées précises pour la nouvelle carte SVG
  { name: 'France', code: 'FR', capital: 'Paris', flag: '🇫🇷', x: 45, y: 34, continent: 'Europe', monument: 'Tour Eiffel' },
  { name: 'Allemagne', code: 'DE', capital: 'Berlin', flag: '🇩🇪', x: 50, y: 32, continent: 'Europe', monument: 'Porte de Brandebourg' },
  { name: 'Italie', code: 'IT', capital: 'Rome', flag: '🇮🇹', x: 48, y: 38, continent: 'Europe', monument: 'Colisée' },
  { name: 'Espagne', code: 'ES', capital: 'Madrid', flag: '🇪🇸', x: 42, y: 38, continent: 'Europe', monument: 'Sagrada Familia' },
  { name: 'Royaume-Uni', code: 'GB', capital: 'Londres', flag: '🇬🇧', x: 42, y: 28, continent: 'Europe', monument: 'Big Ben' },
  { name: 'Russie', code: 'RU', capital: 'Moscou', flag: '🇷🇺', x: 75, y: 18, continent: 'Europe', monument: 'Place Rouge' },
  { name: 'Norvège', code: 'NO', capital: 'Oslo', flag: '🇳🇴', x: 50, y: 18, continent: 'Europe' },
  { name: 'Suède', code: 'SE', capital: 'Stockholm', flag: '🇸🇪', x: 52, y: 20, continent: 'Europe' },
  { name: 'Grèce', code: 'GR', capital: 'Athènes', flag: '🇬🇷', x: 52, y: 42, continent: 'Europe', monument: 'Parthénon' },
  { name: 'Pologne', code: 'PL', capital: 'Varsovie', flag: '🇵🇱', x: 52, y: 30, continent: 'Europe' },

  // Amérique du Nord - positions ajustées
  { name: 'États-Unis', code: 'US', capital: 'Washington', flag: '🇺🇸', x: 20, y: 38, continent: 'Amérique du Nord', monument: 'Statue de la Liberté' },
  { name: 'Canada', code: 'CA', capital: 'Ottawa', flag: '🇨🇦', x: 18, y: 28, continent: 'Amérique du Nord', monument: 'Chutes du Niagara' },
  { name: 'Mexique', code: 'MX', capital: 'Mexico', flag: '🇲🇽', x: 16, y: 48, continent: 'Amérique du Nord', monument: 'Pyramide de Chichen Itza' },

  // Amérique du Sud - coordonnées corrigées
  { name: 'Brésil', code: 'BR', capital: 'Brasília', flag: '🇧🇷', x: 24, y: 65, continent: 'Amérique du Sud', monument: 'Christ Rédempteur' },
  { name: 'Argentine', code: 'AR', capital: 'Buenos Aires', flag: '🇦🇷', x: 21, y: 88, continent: 'Amérique du Sud' },
  { name: 'Chili', code: 'CL', capital: 'Santiago', flag: '🇨🇱', x: 18, y: 85, continent: 'Amérique du Sud' },
  { name: 'Pérou', code: 'PE', capital: 'Lima', flag: '🇵🇪', x: 20, y: 75, continent: 'Amérique du Sud', monument: 'Machu Picchu' },
  { name: 'Colombie', code: 'CO', capital: 'Bogotá', flag: '🇨🇴', x: 22, y: 60, continent: 'Amérique du Sud' },

  // Asie - positions réalistes
  { name: 'Chine', code: 'CN', capital: 'Pékin', flag: '🇨🇳', x: 76, y: 40, continent: 'Asie', monument: 'Grande Muraille' },
  { name: 'Japon', code: 'JP', capital: 'Tokyo', flag: '🇯🇵', x: 87, y: 44, continent: 'Asie', monument: 'Mont Fuji' },
  { name: 'Inde', code: 'IN', capital: 'New Delhi', flag: '🇮🇳', x: 67, y: 56, continent: 'Asie', monument: 'Taj Mahal' },
  { name: 'Corée du Sud', code: 'KR', capital: 'Séoul', flag: '🇰🇷', x: 83, y: 42, continent: 'Asie' },
  { name: 'Thaïlande', code: 'TH', capital: 'Bangkok', flag: '🇹🇭', x: 76, y: 58, continent: 'Asie' },
  { name: 'Indonésie', code: 'ID', capital: 'Jakarta', flag: '🇮🇩', x: 78, y: 70, continent: 'Asie' },
  { name: 'Iran', code: 'IR', capital: 'Téhéran', flag: '🇮🇷', x: 60, y: 48, continent: 'Asie' },
  { name: 'Turquie', code: 'TR', capital: 'Ankara', flag: '🇹🇷', x: 56, y: 44, continent: 'Asie' },

  // Afrique - coordonnées précises
  { name: 'Égypte', code: 'EG', capital: 'Le Caire', flag: '🇪🇬', x: 54, y: 48, continent: 'Afrique', monument: 'Pyramides de Gizeh' },
  { name: 'Afrique du Sud', code: 'ZA', capital: 'Le Cap', flag: '🇿🇦', x: 52, y: 88, continent: 'Afrique' },
  { name: 'Nigeria', code: 'NG', capital: 'Abuja', flag: '🇳🇬', x: 46, y: 60, continent: 'Afrique' },
  { name: 'Kenya', code: 'KE', capital: 'Nairobi', flag: '🇰🇪', x: 58, y: 70, continent: 'Afrique', monument: 'Kilimandjaro' },
  { name: 'Maroc', code: 'MA', capital: 'Rabat', flag: '🇲🇦', x: 43, y: 46, continent: 'Afrique' },
  { name: 'Algérie', code: 'DZ', capital: 'Alger', flag: '🇩🇿', x: 46, y: 50, continent: 'Afrique' },

  // Océanie - positions finales
  { name: 'Australie', code: 'AU', capital: 'Canberra', flag: '🇦🇺', x: 81, y: 78, continent: 'Océanie', monument: 'Opéra de Sydney' },
  { name: 'Nouvelle-Zélande', code: 'NZ', capital: 'Wellington', flag: '🇳🇿', x: 89, y: 90, continent: 'Océanie' },
];

export const getCountriesByContinent = (continent: string): Country[] => {
  if (continent === 'Monde') return countries;
  return countries.filter(country => country.continent === continent);
};

export const continents = ['Monde', 'Europe', 'Amérique du Nord', 'Amérique du Sud', 'Asie', 'Afrique', 'Océanie'];