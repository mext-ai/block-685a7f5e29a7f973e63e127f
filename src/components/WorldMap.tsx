import React, { useState, useRef, useEffect } from 'react';
import { Country } from '../types';

interface WorldMapProps {
  onCountryClick: (country: Country | null) => void;
  countries: Country[];
  selectedCountry?: Country | null;
  showCorrectAnswer?: Country | null;
  isGameActive: boolean;
}

const WorldMap: React.FC<WorldMapProps> = ({ 
  onCountryClick, 
  countries, 
  selectedCountry,
  showCorrectAnswer,
  isGameActive 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isGameActive) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Trouver le pays le plus proche du clic (dans un rayon de tolérance)
    const tolerance = 3; // Rayon de tolérance en pourcentage
    const clickedCountry = countries.find(country => {
      const distance = Math.sqrt(
        Math.pow(country.x - x, 2) + Math.pow(country.y - y, 2)
      );
      return distance <= tolerance;
    });

    onCountryClick(clickedCountry || null);
  };

  const getCountryStyle = (country: Country) => {
    let backgroundColor = '#4CAF50';
    let transform = 'scale(1)';
    let zIndex = 1;

    if (showCorrectAnswer === country) {
      backgroundColor = '#4CAF50';
      transform = 'scale(1.5)';
      zIndex = 10;
    } else if (selectedCountry === country) {
      backgroundColor = '#f44336';
      transform = 'scale(1.3)';
      zIndex = 9;
    } else if (hoveredCountry === country && isGameActive) {
      backgroundColor = '#2196F3';
      transform = 'scale(1.2)';
      zIndex = 8;
    }

    return {
      position: 'absolute' as const,
      left: `${country.x}%`,
      top: `${country.y}%`,
      width: '12px',
      height: '12px',
      backgroundColor,
      borderRadius: '50%',
      border: '2px solid white',
      cursor: isGameActive ? 'pointer' : 'default',
      transform,
      transition: 'all 0.3s ease',
      zIndex,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    };
  };

  return (
    <div 
      ref={mapRef}
      onClick={handleMapClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Crect width='1000' height='500' fill='%23e3f2fd'/%3E%3Cpath d='M0 300 Q250 250 500 300 T1000 300 L1000 500 L0 500 Z' fill='%234fc3f7'/%3E%3Cpath d='M100 200 L200 180 L300 200 L400 190 L500 200 L600 180 L700 200 L800 190 L900 200 L1000 180 L1000 220 L900 240 L800 230 L700 240 L600 220 L500 240 L400 230 L300 240 L200 220 L100 240 Z' fill='%2366bb6a'/%3E%3Cpath d='M150 350 L250 330 L350 350 L450 340 L550 350 L650 330 L750 350 L850 340 L950 350 L1000 340 L1000 380 L950 390 L850 380 L750 390 L650 370 L550 390 L450 380 L350 390 L250 370 L150 390 Z' fill='%2366bb6a'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: isGameActive ? 'crosshair' : 'default',
        border: '3px solid #1976d2',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      {countries.map((country) => (
        <div
          key={country.code}
          style={getCountryStyle(country)}
          onMouseEnter={() => setHoveredCountry(country)}
          onMouseLeave={() => setHoveredCountry(null)}
          title={`${country.name} - ${country.capital}`}
        />
      ))}
      
      {hoveredCountry && isGameActive && (
        <div
          style={{
            position: 'absolute',
            left: `${hoveredCountry.x + 2}%`,
            top: `${hoveredCountry.y - 5}%`,
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 100,
            whiteSpace: 'nowrap'
          }}
        >
          {hoveredCountry.name}
        </div>
      )}
    </div>
  );
};

export default WorldMap;