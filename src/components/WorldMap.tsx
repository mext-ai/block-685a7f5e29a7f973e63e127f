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

  // Carte du monde réaliste avec contours géographiques précis
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
          <stop offset="0%" stopColor="#4A90E2" />
          <stop offset="50%" stopColor="#357ABD" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8FBC8F" />
          <stop offset="50%" stopColor="#6B8E23" />
          <stop offset="100%" stopColor="#556B2F" />
        </linearGradient>
      </defs>
      
      {/* Océan */}
      <rect width="1000" height="500" fill="url(#oceanGradient)" />
      
      {/* Continents avec contours géographiques réalistes */}
      <g fill="url(#landGradient)" stroke="#2F4F2F" strokeWidth="0.5">
        
        {/* AMÉRIQUE DU NORD */}
        {/* Canada */}
        <path d="M50 120 C80 100 120 105 160 110 L200 115 C240 110 280 115 320 125 L350 135 C380 145 390 155 395 170 L400 185 C405 200 400 210 390 215 L370 220 C350 225 320 220 300 215 L270 210 C240 205 210 200 180 195 L150 190 C120 185 90 180 70 175 L50 170 C40 165 35 155 40 145 C45 135 50 120 50 120 Z" />
        
        {/* Alaska */}
        <path d="M15 140 C25 130 35 135 40 145 L45 155 C40 165 30 170 20 165 L15 155 C10 150 10 145 15 140 Z" />
        
        {/* États-Unis */}
        <path d="M70 175 C100 170 130 175 160 180 L190 185 C220 190 250 195 280 200 L310 205 C340 210 360 215 365 225 L370 235 C365 245 350 250 330 245 L310 240 C280 235 250 230 220 225 L190 220 C160 215 130 210 100 205 L80 200 C60 195 50 185 55 175 C60 170 70 175 70 175 Z" />
        
        {/* Mexique et Amérique Centrale */}
        <path d="M180 245 C200 240 220 245 240 250 L260 255 C270 260 275 270 270 280 L265 290 C260 300 250 305 240 300 L220 295 C200 290 185 285 175 275 L170 265 C165 255 170 250 180 245 Z" />
        
        {/* AMÉRIQUE DU SUD */}
        <path d="M210 300 C230 295 250 300 270 310 L290 320 C300 330 305 350 310 370 L315 390 C320 410 315 430 310 450 L305 470 C300 485 290 495 275 500 L255 495 C235 490 220 485 210 470 L200 450 C195 430 200 410 205 390 L210 370 C205 350 205 330 210 300 Z" />
        
        {/* EUROPE */}
        {/* Scandinavie */}
        <path d="M480 80 C500 70 520 75 530 85 L540 95 C545 105 540 115 535 125 L530 135 C525 145 520 150 510 145 L500 140 C490 135 485 125 480 115 L475 105 C470 95 475 85 480 80 Z" />
        
        {/* Royaume-Uni et Irlande */}
        <path d="M420 130 C430 125 440 130 445 140 L450 150 C445 160 435 165 425 160 L420 150 C415 145 415 135 420 130 Z" />
        <path d="M405 135 C415 130 420 135 422 145 L425 155 C420 165 410 170 405 165 L400 155 C395 150 395 140 405 135 Z" />
        
        {/* Europe continentale */}
        <path d="M440 140 C470 135 500 140 530 145 L560 150 C580 155 590 165 595 175 L600 185 C605 195 600 205 590 210 L570 215 C550 220 530 215 510 210 L490 205 C470 200 450 195 445 185 L440 175 C435 165 435 155 440 140 Z" />
        
        {/* ASIE */}
        {/* Russie */}
        <path d="M600 80 C650 70 700 75 750 80 L800 85 C850 90 900 95 920 105 L940 115 C950 125 945 135 940 145 L935 155 C930 165 920 170 900 165 L850 160 C800 155 750 150 700 145 L650 140 C620 135 605 125 610 115 L615 105 C590 95 595 85 600 80 Z" />
        
        {/* Asie centrale */}
        <path d="M620 160 C650 155 680 160 710 165 L740 170 C760 175 770 185 775 195 L780 205 C785 215 780 225 770 230 L750 235 C730 240 710 235 690 230 L670 225 C650 220 635 210 630 200 L625 190 C620 180 620 170 620 160 Z" />
        
        {/* Chine */}
        <path d="M720 180 C750 175 780 180 810 185 L830 190 C850 195 860 205 865 215 L870 225 C875 235 870 245 860 250 L840 255 C820 260 800 255 780 250 L760 245 C740 240 725 230 720 220 L715 210 C710 200 710 190 720 180 Z" />
        
        {/* Inde */}
        <path d="M650 240 C670 235 690 240 700 250 L710 260 C715 270 720 285 715 300 L710 315 C705 330 695 340 685 335 L675 330 C665 325 655 315 650 305 L645 295 C640 285 640 275 640 265 C640 255 645 245 650 240 Z" />
        
        {/* Asie du Sud-Est */}
        <path d="M720 280 C740 275 760 280 780 285 L800 290 C815 295 825 305 830 315 L835 325 C840 335 835 345 825 350 L810 355 C795 360 780 355 765 350 L750 345 C735 340 725 330 720 320 L715 310 C710 300 710 290 720 280 Z" />
        
        {/* Indonésie et îles */}
        <path d="M750 350 C770 345 790 350 810 355 L830 360 C845 365 855 375 860 385 L865 395 C870 405 865 415 855 420 L840 425 C825 430 810 425 795 420 L780 415 C765 410 755 400 750 390 L745 380 C740 370 740 360 750 350 Z" />
        
        {/* Japon */}
        <path d="M860 200 C870 195 880 200 885 210 L890 220 C895 230 890 240 880 245 L870 250 C860 255 850 250 845 240 L840 230 C835 220 840 210 850 205 C855 200 860 200 860 200 Z" />
        
        {/* AFRIQUE */}
        <path d="M450 220 C480 215 510 220 540 225 L570 230 C590 235 600 245 605 260 L610 275 C615 290 620 310 615 330 L610 350 C605 370 600 390 595 410 L590 430 C585 450 575 470 560 480 L540 485 C520 490 500 485 480 480 L460 475 C440 470 425 460 420 445 L415 430 C410 415 415 400 420 385 L425 370 C430 355 435 340 440 325 L445 310 C450 295 455 280 460 265 L465 250 C470 235 480 225 490 220 C470 215 450 220 450 220 Z" />
        
        {/* Madagascar */}
        <path d="M590 380 C600 375 605 385 610 395 L615 405 C620 415 615 425 605 430 L595 435 C585 440 575 435 570 425 L565 415 C560 405 565 395 575 390 C580 385 590 380 590 380 Z" />
        
        {/* OCÉANIE */}
        {/* Australie */}
        <path d="M720 380 C760 375 800 380 840 385 L880 390 C910 395 930 405 940 420 L945 435 C950 450 945 460 930 465 L900 470 C870 475 840 470 810 465 L780 460 C750 455 730 445 725 430 L720 415 C715 400 715 390 720 380 Z" />
        
        {/* Nouvelle-Zélande */}
        <path d="M880 440 C890 435 900 440 905 450 L910 460 C915 470 910 480 900 485 L890 490 C880 495 870 490 865 480 L860 470 C855 460 860 450 870 445 C875 440 880 440 880 440 Z" />
        <path d="M885 495 C895 490 905 495 910 505 L915 515 C920 525 915 535 905 540 L895 545 C885 550 875 545 870 535 L865 525 C860 515 865 505 875 500 C880 495 885 495 885 495 Z" />
        
        {/* Groenland */}
        <path d="M360 50 C380 45 400 50 420 55 L440 60 C455 65 465 75 470 85 L475 95 C480 105 475 115 465 120 L450 125 C435 130 420 125 405 120 L390 115 C375 110 365 100 360 90 L355 80 C350 70 350 60 360 50 Z" />
        
        {/* Islande */}
        <path d="M380 110 C390 105 400 110 405 120 L410 130 C415 140 410 150 400 155 L390 160 C380 165 370 160 365 150 L360 140 C355 130 360 120 370 115 C375 110 380 110 380 110 Z" />
        
      </g>
      
      {/* Lignes de latitude importantes */}
      <g stroke="#87CEEB" strokeWidth="1" strokeDasharray="3,3" opacity="0.5">
        {/* Équateur */}
        <line x1="0" y1="250" x2="1000" y2="250" />
        {/* Tropique du Cancer */}
        <line x1="0" y1="185" x2="1000" y2="185" />
        {/* Tropique du Capricorne */}
        <line x1="0" y1="315" x2="1000" y2="315" />
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
      
      {/* Grille de coordonnées subtile */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        background: 'rgba(255,255,255,0.9)',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '11px',
        color: '#666',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        Projection: Équirectangulaire
      </div>
    </div>
  );
};

export default WorldMap;