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

  // Carte du monde réaliste utilisant une carte SVG simplifiée mais précise
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
      </defs>
      
      {/* Océan */}
      <rect width="1000" height="500" fill="url(#oceanGradient)" />
      
      {/* Utilisation d'une carte du monde simplifiée mais géographiquement correcte */}
      <g fill="url(#landGradient)" stroke="#2E7D32" strokeWidth="1">
        {/* Groenland */}
        <path d="M355 50 Q380 45 400 55 L420 70 Q425 85 415 100 L400 110 Q380 115 360 110 L345 100 Q335 85 340 70 Q350 55 355 50 Z" />
        
        {/* Amérique du Nord */}
        <path d="M50 120 Q80 100 120 110 L160 105 Q200 100 240 110 L280 120 Q320 130 340 150 L350 170 Q360 190 350 210 L340 230 Q320 240 300 235 L280 240 Q240 245 200 240 L160 235 Q120 230 80 225 L60 210 Q40 190 45 170 Q50 150 50 120 Z" />
        
        {/* Alaska */}
        <path d="M20 140 Q35 130 50 140 L55 155 Q50 170 35 165 L25 155 Q15 150 20 140 Z" />
        
        {/* Amérique Centrale */}
        <path d="M180 240 Q200 235 220 245 L240 255 Q235 270 220 265 L200 260 Q185 255 180 240 Z" />
        
        {/* Amérique du Sud */}
        <path d="M200 260 Q230 250 260 265 L280 285 Q290 320 285 360 L280 400 Q275 440 265 470 L250 485 Q230 490 210 485 L190 470 Q180 440 185 400 L190 360 Q195 320 205 285 Q200 270 200 260 Z" />
        
        {/* Islande */}
        <path d="M380 110 Q390 105 400 115 L405 125 Q400 135 390 130 L385 125 Q380 120 380 110 Z" />
        
        {/* Royaume-Uni et Irlande */}
        <path d="M410 130 Q420 125 430 135 L435 145 Q430 155 420 150 L415 145 Q410 140 410 130 Z" />
        <path d="M400 135 Q408 130 415 140 L417 150 Q412 160 405 155 L400 145 Q395 140 400 135 Z" />
        
        {/* Scandinavie */}
        <path d="M480 80 Q500 70 520 85 L530 100 Q535 120 525 135 L515 140 Q500 145 485 140 L475 135 Q465 120 470 100 Q475 85 480 80 Z" />
        
        {/* Europe continentale */}
        <path d="M420 140 Q450 130 480 140 L510 145 Q530 155 540 175 L545 195 Q540 215 530 210 L510 215 Q480 210 450 205 L430 200 Q410 195 415 175 Q420 160 420 140 Z" />
        
        {/* Russie européenne */}
        <path d="M540 80 Q580 70 620 80 L650 90 Q670 100 675 120 L680 140 Q675 160 665 155 L650 160 Q620 155 580 150 L560 145 Q540 140 535 120 Q530 100 540 80 Z" />
        
        {/* Russie asiatique */}
        <path d="M675 80 Q720 70 780 80 L840 90 Q880 100 920 110 L940 125 Q945 145 935 160 L920 165 Q880 170 840 165 L780 160 Q720 155 675 150 Q655 145 660 125 Q665 105 675 80 Z" />
        
        {/* Asie centrale */}
        <path d="M620 160 Q660 150 700 165 L730 175 Q750 185 755 205 L760 225 Q755 245 745 240 L730 245 Q700 240 660 235 L640 230 Q620 225 615 205 Q610 185 620 160 Z" />
        
        {/* Chine */}
        <path d="M700 180 Q740 170 780 185 L810 195 Q830 205 835 225 L840 245 Q835 265 825 260 L810 265 Q780 260 740 255 L720 250 Q700 245 695 225 Q690 205 700 180 Z" />
        
        {/* Inde */}
        <path d="M640 240 Q670 230 690 250 L700 270 Q705 300 695 320 L685 335 Q670 340 655 335 L645 320 Q635 300 640 270 Q635 250 640 240 Z" />
        
        {/* Asie du Sud-Est */}
        <path d="M720 280 Q750 270 780 285 L800 295 Q815 305 820 325 L825 345 Q820 365 810 360 L800 365 Q780 360 750 355 L730 350 Q720 345 715 325 Q710 305 720 280 Z" />
        
        {/* Indonésie */}
        <path d="M750 350 Q780 345 810 360 L830 370 Q835 390 825 405 L815 410 Q780 415 750 410 L730 405 Q720 390 725 370 Q730 360 750 350 Z" />
        
        {/* Japon */}
        <path d="M860 200 Q875 195 885 210 L890 230 Q885 250 875 245 L865 240 Q855 230 860 210 Q855 200 860 200 Z" />
        
        {/* Corée */}
        <path d="M820 210 Q830 205 835 220 L840 235 Q835 250 825 245 L820 240 Q815 235 820 220 Q815 210 820 210 Z" />
        
        {/* Moyen-Orient */}
        <path d="M540 200 Q570 190 600 205 L620 215 Q635 225 640 245 L645 265 Q640 285 630 280 L620 285 Q600 280 570 275 L550 270 Q540 265 535 245 Q530 225 540 200 Z" />
        
        {/* Afrique */}
        <path d="M430 200 Q470 190 510 205 L540 220 Q560 240 565 280 L570 320 Q575 360 570 400 L565 440 Q560 470 545 485 L525 495 Q490 500 460 495 L440 485 Q425 470 420 440 L415 400 Q410 360 415 320 L420 280 Q425 240 445 220 Q430 210 430 200 Z" />
        
        {/* Madagascar */}
        <path d="M580 380 Q590 375 595 390 L600 410 Q595 430 585 425 L580 420 Q575 410 580 390 Z" />
        
        {/* Australie */}
        <path d="M720 350 Q780 340 840 355 L880 370 Q900 385 905 405 L910 425 Q905 445 895 440 L880 445 Q840 450 780 445 L740 440 Q720 435 715 415 Q710 395 715 375 Q720 355 720 350 Z" />
        
        {/* Nouvelle-Zélande */}
        <path d="M880 420 Q895 415 905 430 L910 450 Q905 470 890 465 L885 460 Q880 450 885 430 Q880 420 880 420 Z" />
        <path d="M885 475 Q900 470 910 485 L915 505 Q910 525 895 520 L890 515 Q885 505 890 485 Q885 475 885 475 Z" />
      </g>
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