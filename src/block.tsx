import React, { useState, useEffect, useRef } from 'react';
import { GameState, GameMode, QuestionType, Country } from './types';
import { countries, getCountriesByContinent } from './data/countries';
import { generateQuestion, calculateScore, getTimeBonus, isCountryMatch, playSound, getCongratulatoryMessage } from './utils/gameLogic';
import WorldMap from './components/WorldMap';
import GameUI from './components/GameUI';
import MenuScreen from './components/MenuScreen';

interface BlockProps {
  title?: string;
  description?: string;
}

const Block: React.FC<BlockProps> = ({ title, description }) => {
  const [gameState, setGameState] = useState<GameState>({
    screen: 'menu',
    mode: 'training',
    questionType: 'country',
    currentQuestion: null,
    score: 0,
    questionsAnswered: 0,
    totalQuestions: 10,
    timeLeft: 30,
    isGameActive: false,
    selectedContinent: 'Monde'
  });

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<Country | null>(null);
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentCountries = getCountriesByContinent(gameState.selectedContinent);

  // Envoyer l'événement de completion
  const sendCompletionEvent = (score: number, totalQuestions: number) => {
    const completionData = {
      type: 'BLOCK_COMPLETION',
      blockId: 'voyageur-express',
      completed: true,
      score: score,
      maxScore: totalQuestions * 100,
      timeSpent: Math.floor((Date.now() - gameStartTime) / 1000),
      data: {
        questionsAnswered: gameState.questionsAnswered,
        totalQuestions: totalQuestions,
        accuracy: Math.round((score / (totalQuestions * 100)) * 100)
      }
    };

    window.postMessage(completionData, '*');
    window.parent?.postMessage(completionData, '*');
  };

  // Timer pour le mode chrono
  useEffect(() => {
    if (gameState.mode === 'chrono' && gameState.isGameActive && gameState.timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (gameState.timeLeft === 0 && gameState.isGameActive) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState.timeLeft, gameState.isGameActive, gameState.mode]);

  // Générer une nouvelle question
  const generateNewQuestion = () => {
    const question = generateQuestion(currentCountries, gameState.questionType, usedCountries);
    
    if (!question) {
      // Plus de questions disponibles, terminer le jeu
      endGame();
      return;
    }

    setGameState(prev => ({ ...prev, currentQuestion: question }));
    setSelectedCountry(null);
    setShowCorrectAnswer(null);
    setIsAnswered(false);
    setQuestionStartTime(Date.now());
    
    // Ajouter le pays aux pays utilisés
    setUsedCountries(prev => new Set([...prev, question.correctAnswer.code]));
  };

  // Démarrer le jeu
  const startGame = (mode: GameMode, questionType: QuestionType, continent: string) => {
    const totalQuestions = mode === 'chrono' ? 15 : mode === 'campaign' ? 20 : 10;
    const timePerQuestion = mode === 'chrono' ? 20 : 30;
    
    setGameState({
      screen: 'game',
      mode,
      questionType,
      currentQuestion: null,
      score: 0,
      questionsAnswered: 0,
      totalQuestions,
      timeLeft: timePerQuestion,
      isGameActive: true,
      selectedContinent: continent
    });

    setUsedCountries(new Set());
    setGameStartTime(Date.now());
    
    // Générer la première question après un petit délai
    setTimeout(() => {
      generateNewQuestion();
    }, 500);
  };

  // Gérer le clic sur un pays
  const handleCountryClick = (clickedCountry: Country | null) => {
    if (!gameState.currentQuestion || !gameState.isGameActive || isAnswered) return;

    playSound('click', 0.3);
    setSelectedCountry(clickedCountry);
    setIsAnswered(true);

    const isCorrect = isCountryMatch(clickedCountry, gameState.currentQuestion.correctAnswer);
    const timeBonus = gameState.mode === 'chrono' ? getTimeBonus(gameState.timeLeft, 20) : 0;
    const points = calculateScore(isCorrect, timeBonus);

    if (isCorrect) {
      playSound('correct', 0.5);
      setGameState(prev => ({ 
        ...prev, 
        score: prev.score + points,
        questionsAnswered: prev.questionsAnswered + 1
      }));
    } else {
      playSound('incorrect', 0.5);
      setShowCorrectAnswer(gameState.currentQuestion.correctAnswer);
      setGameState(prev => ({ 
        ...prev, 
        questionsAnswered: prev.questionsAnswered + 1
      }));
    }

    // Passer à la question suivante
    setTimeout(() => {
      if (gameState.questionsAnswered + 1 >= gameState.totalQuestions) {
        endGame();
      } else {
        generateNewQuestion();
      }
    }, 2000);
  };

  // Gérer la fin du temps
  const handleTimeUp = () => {
    if (!gameState.isGameActive) return;
    
    playSound('timeup', 0.5);
    
    if (gameState.mode === 'chrono') {
      // En mode chrono, le temps global est écoulé
      endGame();
    } else {
      // Question individuelle : montrer la bonne réponse et passer à la suivante
      setIsAnswered(true);
      setShowCorrectAnswer(gameState.currentQuestion?.correctAnswer || null);
      setGameState(prev => ({ 
        ...prev, 
        questionsAnswered: prev.questionsAnswered + 1
      }));

      setTimeout(() => {
        if (gameState.questionsAnswered + 1 >= gameState.totalQuestions) {
          endGame();
        } else {
          generateNewQuestion();
          setGameState(prev => ({ ...prev, timeLeft: 30 })); // Reset timer
        }
      }, 2000);
    }
  };

  // Terminer le jeu
  const endGame = () => {
    setGameState(prev => ({ 
      ...prev, 
      screen: 'gameOver', 
      isGameActive: false 
    }));
    
    // Envoyer l'événement de completion
    sendCompletionEvent(gameState.score, gameState.totalQuestions);
  };

  // Fonctions de navigation
  const handleScreenChange = (screen: 'menu' | 'modeSelect' | 'game' | 'pause' | 'gameOver') => {
    setGameState(prev => ({ ...prev, screen }));
  };

  const handlePause = () => {
    setGameState(prev => ({ ...prev, screen: 'pause', isGameActive: false }));
  };

  const handleResume = () => {
    setGameState(prev => ({ ...prev, screen: 'game', isGameActive: true }));
  };

  const handleRestart = () => {
    startGame(gameState.mode, gameState.questionType, gameState.selectedContinent);
  };

  const handleMainMenu = () => {
    setGameState(prev => ({ 
      ...prev, 
      screen: 'menu', 
      isGameActive: false,
      score: 0,
      questionsAnswered: 0,
      currentQuestion: null
    }));
    setUsedCountries(new Set());
  };

  // Bouton pause flottant pendant le jeu
  const PauseButton = () => {
    if (gameState.screen !== 'game' || !gameState.isGameActive) return null;
    
    return (
      <button
        onClick={handlePause}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1500,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.background = 'rgba(0,0,0,0.9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = 'rgba(0,0,0,0.7)';
        }}
      >
        ⏸️
      </button>
    );
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      background: '#f5f5f5'
    }}>
      {/* Écrans de menu */}
      {(gameState.screen === 'menu' || 
        gameState.screen === 'modeSelect' || 
        gameState.screen === 'pause' || 
        gameState.screen === 'gameOver') && (
        <MenuScreen
          currentScreen={gameState.screen}
          onScreenChange={handleScreenChange}
          onGameStart={startGame}
          onPause={handlePause}
          onResume={handleResume}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
          score={gameState.score}
          questionsAnswered={gameState.questionsAnswered}
          totalQuestions={gameState.totalQuestions}
          timeSpent={gameStartTime > 0 ? Math.floor((Date.now() - gameStartTime) / 1000) : 0}
        />
      )}

      {/* Écran de jeu */}
      {gameState.screen === 'game' && (
        <>
          {/* Interface utilisateur du jeu */}
          <GameUI 
            gameState={gameState}
          />
          
          {/* Carte du monde */}
          <div style={{
            position: 'absolute',
            top: '140px',
            left: '20px',
            right: '20px',
            bottom: '20px'
          }}>
            <WorldMap
              onCountryClick={handleCountryClick}
              countries={currentCountries}
              selectedCountry={selectedCountry}
              showCorrectAnswer={showCorrectAnswer}
              isGameActive={gameState.isGameActive && !isAnswered}
            />
          </div>

          {/* Bouton pause */}
          <PauseButton />

          {/* Message de félicitations temporaire */}
          {showCorrectAnswer && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: selectedCountry === showCorrectAnswer ? 
                'linear-gradient(135deg, #4CAF50, #45a049)' : 
                'linear-gradient(135deg, #f44336, #da190b)',
              color: 'white',
              padding: '20px 30px',
              borderRadius: '15px',
              fontSize: '18px',
              fontWeight: 'bold',
              zIndex: 2000,
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              textAlign: 'center',
              animation: 'fadeInOut 2s ease-in-out'
            }}>
              {selectedCountry === showCorrectAnswer ? (
                <>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎉</div>
                  <div>Correct !</div>
                  <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '5px' }}>
                    {showCorrectAnswer.name} - {showCorrectAnswer.capital}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>❌</div>
                  <div>La bonne réponse était :</div>
                  <div style={{ fontSize: '16px', marginTop: '5px' }}>
                    {showCorrectAnswer.name} - {showCorrectAnswer.capital}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* Styles CSS pour les animations */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          20% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
          80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Block;