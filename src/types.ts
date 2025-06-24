export interface Country {
  name: string;
  code: string;
  capital: string;
  flag: string;
  x: number; // Position X sur la carte (en pourcentage)
  y: number; // Position Y sur la carte (en pourcentage)
  continent: string;
  monument?: string;
}

export interface GameQuestion {
  type: 'country' | 'capital' | 'flag' | 'monument';
  question: string;
  correctAnswer: Country;
  options?: Country[];
}

export type GameMode = 'training' | 'chrono' | 'campaign';
export type QuestionType = 'country' | 'capital' | 'flag' | 'monument';
export type GameScreen = 'menu' | 'modeSelect' | 'game' | 'pause' | 'gameOver';

export interface GameState {
  screen: GameScreen;
  mode: GameMode;
  questionType: QuestionType;
  currentQuestion: GameQuestion | null;
  score: number;
  questionsAnswered: number;
  totalQuestions: number;
  timeLeft: number;
  isGameActive: boolean;
  selectedContinent: string;
}

export interface GameSettings {
  musicVolume: number;
  effectsVolume: number;
  voiceEnabled: boolean;
  language: 'fr' | 'en' | 'es';
  colorBlindMode: boolean;
}