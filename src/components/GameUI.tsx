import React from 'react';
import { GameState, Country } from '../types';

interface GameUIProps {
  gameState: GameState;
  onAnswerClick?: (country: Country) => void;
  showOptions?: boolean;
  options?: Country[];
}

const GameUI: React.FC<GameUIProps> = ({ gameState, onAnswerClick, showOptions, options = [] }) => {
  const { currentQuestion, score, questionsAnswered, totalQuestions, timeLeft, mode } = gameState;

  if (!currentQuestion) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '20px',
      background: 'linear-gradient(to bottom, rgba(25,118,210,0.95), rgba(25,118,210,0.8))',
      color: 'white',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      {/* Barre d'informations */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            Score: {score}
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            Question: {questionsAnswered + 1}/{totalQuestions}
          </div>
        </div>
        
        {mode === 'chrono' && (
          <div style={{
            background: timeLeft < 10 ? 'rgba(244,67,54,0.8)' : 'rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '18px',
            animation: timeLeft < 10 ? 'pulse 1s infinite' : 'none'
          }}>
            ⏱️ {timeLeft}s
          </div>
        )}
      </div>

      {/* Question */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          {currentQuestion.question}
        </h2>
        
        {currentQuestion.type === 'flag' && (
          <div style={{
            fontSize: '48px',
            margin: '15px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            {currentQuestion.correctAnswer.flag}
          </div>
        )}
        
        {currentQuestion.type === 'monument' && currentQuestion.correctAnswer.monument && (
          <div style={{
            fontSize: '18px',
            margin: '10px 0',
            fontStyle: 'italic',
            opacity: 0.9
          }}>
            Monument: {currentQuestion.correctAnswer.monument}
          </div>
        )}
      </div>

      {/* Options (pour certains modes) */}
      {showOptions && options.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap',
          marginTop: '20px'
        }}>
          {options.map((country) => (
            <button
              key={country.code}
              onClick={() => onAnswerClick?.(country)}
              style={{
                background: 'rgba(255,255,255,0.9)',
                color: '#1976d2',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
            >
              {currentQuestion.type === 'flag' ? country.flag + ' ' + country.name : 
               currentQuestion.type === 'capital' ? country.capital :
               country.name}
            </button>
          ))}
        </div>
      )}

      {/* Instructions */}
      {!showOptions && (
        <div style={{
          textAlign: 'center',
          fontSize: '16px',
          opacity: 0.9,
          fontStyle: 'italic'
        }}>
          {currentQuestion.type === 'country' && '👆 Cliquez sur le pays sur la carte'}
          {currentQuestion.type === 'capital' && '👆 Cliquez sur la capitale sur la carte'}
          {currentQuestion.type === 'flag' && '👆 Cliquez sur le pays correspondant au drapeau'}
          {currentQuestion.type === 'monument' && '👆 Cliquez sur le pays où se trouve ce monument'}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GameUI;