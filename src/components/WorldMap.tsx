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
    let backgroundColor = '#FF5722';
    let transform = 'scale(1)';
    let zIndex = 1;

    if (showCorrectAnswer === country) {
      backgroundColor = '#4CAF50';
      transform = 'scale(1.8)';
      zIndex = 10;
    } else if (selectedCountry === country) {
      backgroundColor = '#f44336';
      transform = 'scale(1.5)';
      zIndex = 9;
    } else if (hoveredCountry === country && isGameActive) {
      backgroundColor = '#2196F3';
      transform = 'scale(1.3)';
      zIndex = 8;
    }

    return {
      position: 'absolute' as const,
      left: `${country.x}%`,
      top: `${country.y}%`,
      width: '16px',
      height: '16px',
      backgroundColor,
      borderRadius: '50%',
      border: '3px solid white',
      cursor: isGameActive ? 'pointer' : 'default',
      transform,
      transition: 'all 0.3s ease',
      zIndex,
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    };
  };

  // SVG de la carte du monde simplifiée
  const WorldMapSVG = () => (
    <svg 
      viewBox="0 0 1000 500" 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
      }}
    >
      {/* Océans */}
      <rect width="1000" height="500" fill="#4FC3F7" />
      
      {/* Amérique du Nord */}
      <path d="M50 150 Q100 120 150 140 L200 130 Q250 125 280 150 L300 180 Q280 200 250 190 L200 200 Q150 210 100 190 Q70 180 50 150 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Amérique du Sud */}
      <path d="M180 250 Q200 240 220 250 L240 300 Q250 350 240 400 L220 450 Q200 460 180 450 L160 400 Q150 350 160 300 Q170 250 180 250 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Europe */}
      <path d="M400 120 Q450 110 500 120 L520 140 Q510 160 480 150 L450 160 Q420 150 400 120 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Afrique */}
      <path d="M420 200 Q460 190 500 200 L520 250 Q530 300 520 350 L500 400 Q480 410 460 400 L440 350 Q430 300 440 250 Q430 220 420 200 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Asie */}
      <path d="M500 120 Q600 100 700 120 L750 140 Q800 150 850 160 L880 180 Q870 220 850 200 L800 210 Q750 200 700 190 L650 180 Q550 170 500 120 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Russie */}
      <path d="M500 80 Q600 70 700 80 L800 90 Q850 100 900 110 L920 130 Q910 150 880 140 L800 130 Q700 120 600 110 L500 100 Q480 90 500 80 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Inde */}
      <path d="M600 250 Q650 240 680 260 L690 300 Q680 320 650 310 L620 300 Q600 280 600 250 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Chine */}
      <path d="M650 180 Q700 170 750 180 L780 200 Q770 230 740 220 L700 210 Q660 200 650 180 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Australie */}
      <path d="M700 350 Q750 340 800 350 L820 380 Q810 400 780 390 L750 380 Q720 370 700 350 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Groenland */}
      <path d="M250 50 Q300 40 320 60 L330 90 Q320 100 290 90 L260 80 Q240 70 250 50 Z" fill="#E8F5E8" stroke="#4CAF50" strokeWidth="1"/>
      
      {/* Japon */}
      <path d="M850 200 Q860 190 870 200 L875 220 Q870 230 860 225 L855 215 Q850 205 850 200 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="1"/>
      
      {/* Royaume-Uni */}
      <path d="M420 130 Q430 125 435 135 L440 145 Q435 150 430 145 L425 140 Q420 135 420 130 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="1"/>
      
      {/* Madagascar */}
      <path d="M550 380 Q560 375 565 385 L570 400 Q565 405 560 400 L555 390 Q550 385 550 380 Z" fill="#66BB6A" stroke="#4CAF50" strokeWidth="1"/>
    </svg>
  );

  return (
    <div 
      ref={mapRef}
      onClick={handleMapClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: isGameActive ? 'crosshair' : 'default',
        border: '4px solid #1976d2',
        borderRadius: '15px',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #87CEEB 0%, #4FC3F7 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}
    >
      {/* Carte du monde en arrière-plan */}
      <WorldMapSVG />
      
      {/* Points des pays */}
      {countries.map((country) => (
        <div
          key={country.code}
          style={getCountryStyle(country)}
          onMouseEnter={() => setHoveredCountry(country)}
          onMouseLeave={() => setHoveredCountry(null)}
          title={`${country.name} - ${country.capital}`}
        />
      ))}
      
      {/* Tooltip au survol */}
      {hoveredCountry && isGameActive && (
        <div
          style={{
            position: 'absolute',
            left: `${Math.min(hoveredCountry.x + 3, 85)}%`,
            top: `${Math.max(hoveredCountry.y - 8, 5)}%`,
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            pointerEvents: 'none',
            zIndex: 100,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <div>{hoveredCountry.flag} {hoveredCountry.name}</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Capital: {hoveredCountry.capital}
          </div>
        </div>
      )}
      
      {/* Légende */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        background: 'rgba(255,255,255,0.9)',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#1976d2' }}>
          🗺️ Légende
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#FF5722', borderRadius: '50%', border: '2px solid white' }}></div>
          <span>Pays</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#2196F3', borderRadius: '50%', border: '2px solid white' }}></div>
          <span>Survol</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#4CAF50', borderRadius: '50%', border: '2px solid white' }}></div>
          <span>Correct</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;