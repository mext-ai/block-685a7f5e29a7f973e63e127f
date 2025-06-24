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
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 500' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1000' height='500' fill='%234A90E2'/%3E%3Cg fill='%23228B22' stroke='%23006400' stroke-width='0.5'%3E%3Cpath d='M80 150 C120 130 180 135 240 140 L300 145 C360 150 400 160 420 180 L440 200 C450 220 440 240 420 250 L380 260 C340 270 300 265 260 260 L220 255 C180 250 140 245 100 240 L80 235 C60 230 50 210 60 190 C70 170 80 150 80 150 Z'/%3E%3Cpath d='M250 260 C280 255 310 260 340 270 L370 280 C390 290 400 310 405 330 L410 350 C415 370 410 390 400 410 L390 430 C380 450 365 465 345 470 L325 475 C305 480 285 475 270 470 L255 465 C240 460 230 450 225 435 L220 420 C215 405 220 390 225 375 L230 360 C235 345 240 330 245 315 C250 300 250 280 250 260 Z'/%3E%3Cpath d='M420 140 C450 135 480 140 510 145 L540 150 C570 155 590 165 600 180 L610 195 C620 210 615 225 605 235 L590 245 C575 255 560 250 545 245 L530 240 C515 235 500 230 485 225 L470 220 C455 215 445 205 440 190 L435 175 C430 160 435 145 445 135 C455 130 420 140 420 140 Z'/%3E%3Cpath d='M590 160 C630 155 670 160 710 165 L750 170 C790 175 820 185 840 200 L860 215 C880 230 875 245 865 255 L850 265 C835 275 820 270 805 265 L790 260 C775 255 760 250 745 245 L730 240 C715 235 700 230 685 225 L670 220 C655 215 645 205 640 190 L635 175 C630 165 635 155 645 150 C655 145 590 160 590 160 Z'/%3E%3Cpath d='M470 220 C500 215 530 220 560 225 L590 230 C620 235 640 245 650 260 L660 275 C670 290 665 305 655 315 L640 325 C625 335 610 330 595 325 L580 320 C565 315 550 310 535 305 L520 300 C505 295 495 285 490 270 L485 255 C480 240 485 225 495 215 C505 210 470 220 470 220 Z'/%3E%3Cpath d='M350 50 C380 45 410 50 440 55 L470 60 C500 65 520 75 530 90 L540 105 C550 120 545 135 535 145 L520 155 C505 165 490 160 475 155 L460 150 C445 145 430 140 415 135 L400 130 C385 125 375 115 370 100 L365 85 C360 70 365 55 375 45 C385 40 350 50 350 50 Z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 12px 40px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)'
      }}
    >
      {/* Overlay avec image de carte du monde réelle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1024px-Equirectangular_projection_SW.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8,
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
          background: 'linear-gradient(135deg, rgba(70, 144, 226, 0.1) 0%, rgba(30, 58, 138, 0.1) 100%)',
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
        Carte du Monde
      </div>
    </div>
  );
};

export default WorldMap;