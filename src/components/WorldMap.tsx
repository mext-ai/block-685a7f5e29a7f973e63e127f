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
    const tolerance = 4; // Rayon de tolérance en pourcentage
    const clickedCountry = countries.find(country => {
      const distance = Math.sqrt(
        Math.pow(country.x - x, 2) + Math.pow(country.y - y, 2)
      );
      return distance <= tolerance;
    });

    onCountryClick(clickedCountry || null);
  };

  const getCountryStyle = (country: Country) => {
    let backgroundColor = '#FF6B35';
    let transform = 'scale(1)';
    let zIndex = 1;
    let borderColor = 'white';

    if (showCorrectAnswer === country) {
      backgroundColor = '#00E676';
      borderColor = '#00C853';
      transform = 'scale(2)';
      zIndex = 10;
    } else if (selectedCountry === country) {
      backgroundColor = '#FF1744';
      borderColor = '#D50000';
      transform = 'scale(1.6)';
      zIndex = 9;
    } else if (hoveredCountry === country && isGameActive) {
      backgroundColor = '#2196F3';
      borderColor = '#1976D2';
      transform = 'scale(1.4)';
      zIndex = 8;
    }

    return {
      position: 'absolute' as const,
      left: `${country.x}%`,
      top: `${country.y}%`,
      width: '18px',
      height: '18px',
      backgroundColor,
      borderRadius: '50%',
      border: `3px solid ${borderColor}`,
      cursor: isGameActive ? 'pointer' : 'default',
      transform: `${transform} translate(-50%, -50%)`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex,
      boxShadow: `0 6px 20px rgba(0,0,0,0.3), 0 0 0 2px ${backgroundColor}40`,
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
        cursor: isGameActive ? 'crosshair' : 'default',
        border: '4px solid #1565C0',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#4A90E2',
        boxShadow: '0 12px 40px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)'
      }}
    >
      {/* Vraie carte du monde (bien dézoomée pour montrer tous les continents) */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-15%',
          width: '130%',
          height: '140%',
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1024px-Equirectangular_projection_SW.jpg")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.9,
          zIndex: 0
        }}
      />
      
      {/* Overlay pour améliorer le contraste */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(70, 144, 226, 0.08) 0%, rgba(30, 58, 138, 0.08) 100%)',
          zIndex: 1
        }}
      />
      
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
      
      {/* Tooltip amélioré */}
      {hoveredCountry && isGameActive && (
        <div
          style={{
            position: 'absolute',
            left: `${Math.min(hoveredCountry.x + 4, 80)}%`,
            top: `${Math.max(hoveredCountry.y - 10, 5)}%`,
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            pointerEvents: 'none',
            zIndex: 100,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div style={{ fontSize: '16px', marginBottom: '4px' }}>
            {hoveredCountry.flag} <strong>{hoveredCountry.name}</strong>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9, color: '#B3E5FC' }}>
            📍 {hoveredCountry.capital}
          </div>
          {hoveredCountry.monument && (
            <div style={{ fontSize: '11px', opacity: 0.8, color: '#FFF59D', marginTop: '2px' }}>
              🏛️ {hoveredCountry.monument}
            </div>
          )}
        </div>
      )}
      
      {/* Légende modernisée */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        background: 'rgba(255,255,255,0.95)',
        padding: '16px',
        borderRadius: '12px',
        fontSize: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
        zIndex: 50
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          marginBottom: '8px', 
          color: '#1565C0',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          🌍 Guide
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#FF6B35', 
            borderRadius: '50%', 
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}></div>
          <span style={{ color: '#424242' }}>Pays à trouver</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#2196F3', 
            borderRadius: '50%', 
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}></div>
          <span style={{ color: '#424242' }}>Survol</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#00E676', 
            borderRadius: '50%', 
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}></div>
          <span style={{ color: '#424242' }}>Bonne réponse</span>
        </div>
      </div>
      
      {/* Boussole décorative */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        border: '2px solid rgba(255,255,255,0.5)',
        zIndex: 50
      }}>
        🧭
      </div>
      
      {/* Indicateur de carte */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        background: 'rgba(255,255,255,0.9)',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '11px',
        color: '#666',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 50
      }}>
        🗺️ Planisphère Mondial
      </div>
    </div>
  );
};

export default WorldMap;