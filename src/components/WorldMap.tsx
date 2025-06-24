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

  // Carte du monde détaillée avec de vrais continents
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
      {/* Dégradé pour les océans */}
      <defs>
        <radialGradient id="oceanGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="50%" stopColor="#4FC3F7" />
          <stop offset="100%" stopColor="#0277BD" />
        </radialGradient>
        <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5D6A7" />
          <stop offset="50%" stopColor="#66BB6A" />
          <stop offset="100%" stopColor="#388E3C" />
        </linearGradient>
        <filter id="shadow">
          <dropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      
      {/* Océan avec dégradé */}
      <rect width="1000" height="500" fill="url(#oceanGradient)" />
      
      {/* Amérique du Nord - forme plus réaliste */}
      <path d="M50 120 Q80 100 120 110 L160 105 Q200 100 240 110 L280 120 Q320 130 340 150 L350 170 Q360 190 350 210 L340 230 Q320 240 300 235 L280 240 Q240 245 200 240 L160 235 Q120 230 80 225 L60 210 Q40 190 45 170 Q50 150 50 120 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2" filter="url(#shadow)"/>
      
      {/* Alaska */}
      <path d="M20 140 Q30 135 40 140 L45 150 Q40 160 30 155 L25 150 Q20 145 20 140 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      
      {/* Groenland */}
      <path d="M280 60 Q320 50 350 65 L370 80 Q375 100 365 115 L350 125 Q320 130 290 125 L270 115 Q260 100 265 85 Q270 70 280 60 Z" 
            fill="#E8F5E8" stroke="#4CAF50" strokeWidth="2"/>
      
      {/* Amérique du Sud - forme de poire */}
      <path d="M200 260 Q230 250 260 260 L280 280 Q290 320 285 360 L280 400 Q275 440 265 470 L250 485 Q230 490 210 485 L190 470 Q180 440 185 400 L190 360 Q195 320 205 280 Q200 270 200 260 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2" filter="url(#shadow)"/>
      
      {/* Europe - plus détaillée */}
      <path d="M420 110 Q450 100 480 105 L510 110 Q530 120 540 140 L545 160 Q540 180 530 175 L510 180 Q480 175 450 170 L430 165 Q410 160 415 140 Q420 125 420 110 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2" filter="url(#shadow)"/>
      
      {/* Royaume-Uni et Irlande */}
      <path d="M410 130 Q420 125 430 130 L435 140 Q430 150 420 145 L415 140 Q410 135 410 130 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      <path d="M400 135 Q405 130 410 135 L412 145 Q407 150 402 145 L400 140 Q400 137 400 135 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      
      {/* Scandinavie */}
      <path d="M480 80 Q500 75 520 85 L530 100 Q525 120 515 115 L500 110 Q485 105 480 95 Q475 85 480 80 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2"/>
      
      {/* Afrique - forme caractéristique */}
      <path d="M430 200 Q470 190 510 200 L540 220 Q550 260 545 300 L540 340 Q535 380 525 410 L510 435 Q490 445 470 440 L450 435 Q430 425 425 410 L420 380 Q415 340 420 300 Q425 260 435 220 Q430 210 430 200 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2" filter="url(#shadow)"/>
      
      {/* Madagascar */}
      <path d="M565 380 Q575 375 580 385 L582 405 Q577 415 567 410 L562 400 Q560 390 565 380 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      
      {/* Asie - Russie */}
      <path d="M540 80 Q600 70 700 80 L800 90 Q860 100 900 110 L920 130 Q915 150 900 145 L860 140 Q800 130 700 120 L600 110 Q540 100 540 80 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2" filter="url(#shadow)"/>
      
      {/* Asie - Chine et Mongolie */}
      <path d="M650 160 Q720 150 780 165 L810 180 Q815 200 805 215 L780 225 Q720 220 650 210 Q630 200 635 180 Q640 170 650 160 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2" filter="url(#shadow)"/>
      
      {/* Inde - forme triangulaire */}
      <path d="M620 240 Q660 230 680 250 L690 280 Q685 310 670 320 L650 325 Q630 320 620 305 L615 280 Q620 260 620 240 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2" filter="url(#shadow)"/>
      
      {/* Asie du Sud-Est */}
      <path d="M720 280 Q760 270 790 285 L800 305 Q795 325 780 320 L760 315 Q730 310 720 295 Q715 285 720 280 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2"/>
      
      {/* Indonésie - archipel */}
      <path d="M750 330 Q780 325 810 335 L820 345 Q815 355 800 350 L780 345 Q755 340 750 330 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      <path d="M770 355 Q790 350 805 360 L810 370 Q805 380 790 375 L775 370 Q770 365 770 355 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      
      {/* Japon */}
      <path d="M860 200 Q870 195 875 205 L880 225 Q875 235 865 230 L860 220 Q855 210 860 200 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      <path d="M865 240 Q875 235 880 245 L882 255 Q877 265 867 260 L862 250 Q860 245 865 240 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      
      {/* Australie - forme réaliste */}
      <path d="M720 350 Q780 340 840 355 L860 370 Q865 390 855 405 L835 415 Q780 420 720 410 L700 400 Q695 380 705 365 Q715 355 720 350 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="2" filter="url(#shadow)"/>
      
      {/* Nouvelle-Zélande */}
      <path d="M880 420 Q890 415 895 425 L898 440 Q893 450 883 445 L878 435 Q875 425 880 420 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      <path d="M885 460 Q895 455 900 465 L902 475 Q897 485 887 480 L882 470 Q880 465 885 460 Z" 
            fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1"/>
      
      {/* Détails géographiques - montagnes */}
      <path d="M280 150 L285 145 L290 150" stroke="#2E7D32" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M480 120 L485 115 L490 120" stroke="#2E7D32" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M650 180 L655 175 L660 180" stroke="#2E7D32" strokeWidth="1" fill="none" opacity="0.6"/>
      
      {/* Nuages décoratifs */}
      <circle cx="100" cy="80" r="15" fill="white" opacity="0.7"/>
      <circle cx="110" cy="75" r="12" fill="white" opacity="0.7"/>
      <circle cx="120" cy="80" r="10" fill="white" opacity="0.7"/>
      
      <circle cx="600" cy="60" r="18" fill="white" opacity="0.6"/>
      <circle cx="615" cy="55" r="15" fill="white" opacity="0.6"/>
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
        border: '4px solid #1565C0',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)'
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
        border: '1px solid rgba(255,255,255,0.3)'
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
        border: '2px solid rgba(255,255,255,0.5)'
      }}>
        🧭
      </div>
    </div>
  );
};

export default WorldMap;