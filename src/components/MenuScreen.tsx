import React from 'react';
import { GameScreen, GameMode, QuestionType } from '../types';
import { continents } from '../data/countries';

interface MenuScreenProps {
  currentScreen: GameScreen;
  onScreenChange: (screen: GameScreen) => void;
  onGameStart: (mode: GameMode, questionType: QuestionType, continent: string) => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
  score?: number;
  questionsAnswered?: number;
  totalQuestions?: number;
  timeSpent?: number;
}

const MenuScreen: React.FC<MenuScreenProps> = ({
  currentScreen,
  onScreenChange,
  onGameStart,
  onPause,
  onResume,
  onRestart,
  onMainMenu,
  score = 0,
  questionsAnswered = 0,
  totalQuestions = 0,
  timeSpent = 0
}) => {
  const [selectedMode, setSelectedMode] = React.useState<GameMode>('training');
  const [selectedType, setSelectedType] = React.useState<QuestionType>('country');
  const [selectedContinent, setSelectedContinent] = React.useState<string>('Monde');

  const menuStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    zIndex: 2000
  };

  const buttonStyle = {
    background: 'rgba(255,255,255,0.9)',
    color: '#1976d2',
    border: 'none',
    padding: '15px 30px',
    margin: '10px',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    minWidth: '200px'
  };

  const titleStyle = {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
    textAlign: 'center' as const
  };

  // Menu principal
  if (currentScreen === 'menu') {
    return (
      <div style={menuStyle}>
        <h1 style={titleStyle}>
          🌍 Voyageur Express
        </h1>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '20px', opacity: 0.9 }}>
            Explorez le monde et testez vos connaissances géographiques !
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            style={buttonStyle}
            onClick={() => onScreenChange('modeSelect')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            }}
          >
            🎮 Jouer
          </button>
          <button
            style={buttonStyle}
            onClick={() => alert('Fonctionnalité à venir !')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            }}
          >
            ⚙️ Options
          </button>
        </div>
      </div>
    );
  }

  // Sélection du mode
  if (currentScreen === 'modeSelect') {
    return (
      <div style={menuStyle}>
        <h2 style={{ ...titleStyle, fontSize: '3rem' }}>
          Choisissez votre aventure
        </h2>
        
        {/* Sélection du mode de jeu */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Mode de jeu :</h3>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {[
              { mode: 'training' as GameMode, label: '🎓 Entraînement', desc: 'Pas de limite de temps' },
              { mode: 'chrono' as GameMode, label: '⏱️ Chrono', desc: 'Contre la montre' },
              { mode: 'campaign' as GameMode, label: '🏆 Campagne', desc: 'Progression par niveaux' }
            ].map(({ mode, label, desc }) => (
              <button
                key={mode}
                style={{
                  ...buttonStyle,
                  background: selectedMode === mode ? '#4CAF50' : 'rgba(255,255,255,0.9)',
                  color: selectedMode === mode ? 'white' : '#1976d2',
                  minWidth: '180px'
                }}
                onClick={() => setSelectedMode(mode)}
              >
                <div>{label}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sélection du type de question */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Type de défi :</h3>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { type: 'country' as QuestionType, label: '🗺️ Pays', desc: 'Trouvez le pays' },
              { type: 'capital' as QuestionType, label: '🏛️ Capitales', desc: 'Trouvez la capitale' },
              { type: 'flag' as QuestionType, label: '🏳️ Drapeaux', desc: 'Associez drapeaux et pays' },
              { type: 'monument' as QuestionType, label: '🏰 Monuments', desc: 'Localisez les monuments' }
            ].map(({ type, label, desc }) => (
              <button
                key={type}
                style={{
                  ...buttonStyle,
                  background: selectedType === type ? '#FF9800' : 'rgba(255,255,255,0.9)',
                  color: selectedType === type ? 'white' : '#1976d2',
                  minWidth: '160px',
                  padding: '12px 20px'
                }}
                onClick={() => setSelectedType(type)}
              >
                <div>{label}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sélection du continent */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Région :</h3>
          <select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
            style={{
              ...buttonStyle,
              minWidth: '250px',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px',
              paddingRight: '40px'
            }}
          >
            {continents.map(continent => (
              <option key={continent} value={continent}>{continent}</option>
            ))}
          </select>
        </div>

        {/* Boutons d'action */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <button
            style={buttonStyle}
            onClick={() => onScreenChange('menu')}
          >
            ← Retour
          </button>
          <button
            style={{
              ...buttonStyle,
              background: '#4CAF50',
              color: 'white',
              fontSize: '20px',
              padding: '15px 40px'
            }}
            onClick={() => onGameStart(selectedMode, selectedType, selectedContinent)}
          >
            🚀 Commencer !
          </button>
        </div>
      </div>
    );
  }

  // Menu pause
  if (currentScreen === 'pause') {
    return (
      <div style={menuStyle}>
        <h2 style={{ ...titleStyle, fontSize: '3rem' }}>
          ⏸️ Pause
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={buttonStyle} onClick={onResume}>
            ▶️ Reprendre
          </button>
          <button style={buttonStyle} onClick={onRestart}>
            🔄 Recommencer
          </button>
          <button style={buttonStyle} onClick={onMainMenu}>
            🏠 Menu principal
          </button>
        </div>
      </div>
    );
  }

  // Écran de fin de partie
  if (currentScreen === 'gameOver') {
    const percentage = totalQuestions > 0 ? Math.round((score / (totalQuestions * 100)) * 100) : 0;
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;

    return (
      <div style={menuStyle}>
        <h2 style={{ ...titleStyle, fontSize: '3rem' }}>
          🏁 Fin de partie !
        </h2>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '30px',
          borderRadius: '20px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>
            {percentage >= 80 ? '🌟' : percentage >= 60 ? '👏' : percentage >= 40 ? '👍' : '💪'}
          </div>
          <div style={{ fontSize: '24px', marginBottom: '15px' }}>
            Score : {score} points
          </div>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>
            Questions réussies : {Math.round(score / 100)}/{totalQuestions}
          </div>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>
            Précision : {percentage}%
          </div>
          <div style={{ fontSize: '18px' }}>
            Temps : {minutes}m {seconds}s
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button style={buttonStyle} onClick={onRestart}>
            🔄 Rejouer
          </button>
          <button style={buttonStyle} onClick={() => onScreenChange('modeSelect')}>
            🎮 Changer de mode
          </button>
          <button style={buttonStyle} onClick={onMainMenu}>
            🏠 Menu principal
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default MenuScreen;