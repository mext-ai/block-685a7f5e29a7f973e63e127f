import { Country, GameQuestion, QuestionType } from '../types';

export const generateQuestion = (
  countries: Country[], 
  questionType: QuestionType, 
  usedCountries: Set<string> = new Set()
): GameQuestion | null => {
  // Filtrer les pays non utilisés
  const availableCountries = countries.filter(country => !usedCountries.has(country.code));
  
  if (availableCountries.length === 0) {
    return null; // Plus de pays disponibles
  }

  // Filtrer selon le type de question
  let eligibleCountries = availableCountries;
  
  if (questionType === 'monument') {
    eligibleCountries = availableCountries.filter(country => country.monument);
  }

  if (eligibleCountries.length === 0) {
    return null; // Pas de pays éligibles pour ce type de question
  }

  const randomCountry = eligibleCountries[Math.floor(Math.random() * eligibleCountries.length)];

  switch (questionType) {
    case 'country':
      return {
        type: 'country',
        question: `Où se trouve le pays : ${randomCountry.name} ?`,
        correctAnswer: randomCountry
      };

    case 'capital':
      return {
        type: 'capital',
        question: `Où se trouve la capitale : ${randomCountry.capital} ?`,
        correctAnswer: randomCountry
      };

    case 'flag':
      return {
        type: 'flag',
        question: `Quel pays a ce drapeau ?`,
        correctAnswer: randomCountry
      };

    case 'monument':
      return {
        type: 'monument',
        question: `Dans quel pays se trouve : ${randomCountry.monument} ?`,
        correctAnswer: randomCountry
      };

    default:
      return null;
  }
};

export const calculateScore = (
  isCorrect: boolean, 
  timeBonus: number = 0, 
  baseScore: number = 100
): number => {
  if (!isCorrect) return 0;
  
  // Score de base + bonus de temps
  return Math.round(baseScore + timeBonus);
};

export const getTimeBonus = (timeLeft: number, maxTime: number): number => {
  if (maxTime <= 0) return 0;
  
  // Bonus basé sur le temps restant (max 50 points)
  const timeRatio = timeLeft / maxTime;
  return Math.round(timeRatio * 50);
};

export const isCountryMatch = (
  clickedCountry: Country | null, 
  correctCountry: Country
): boolean => {
  return clickedCountry?.code === correctCountry.code;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateMultipleChoiceOptions = (
  correctAnswer: Country,
  allCountries: Country[],
  count: number = 4
): Country[] => {
  const options = [correctAnswer];
  const otherCountries = allCountries.filter(c => c.code !== correctAnswer.code);
  const shuffledOthers = shuffleArray(otherCountries);
  
  // Ajouter des options incorrectes
  for (let i = 0; i < count - 1 && i < shuffledOthers.length; i++) {
    options.push(shuffledOthers[i]);
  }
  
  return shuffleArray(options);
};

export const getDifficultySettings = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy':
      return {
        timePerQuestion: 30,
        totalQuestions: 10,
        tolerance: 5 // Rayon de tolérance pour les clics
      };
    case 'medium':
      return {
        timePerQuestion: 20,
        totalQuestions: 15,
        tolerance: 3
      };
    case 'hard':
      return {
        timePerQuestion: 15,
        totalQuestions: 20,
        tolerance: 2
      };
    default:
      return {
        timePerQuestion: 25,
        totalQuestions: 12,
        tolerance: 4
      };
  }
};

export const getCongratulatoryMessage = (score: number, totalQuestions: number): string => {
  const percentage = (score / (totalQuestions * 100)) * 100;
  
  if (percentage >= 90) {
    return "🌟 Extraordinaire ! Vous êtes un vrai globe-trotter !";
  } else if (percentage >= 80) {
    return "🎉 Excellent ! Vos connaissances géographiques sont impressionnantes !";
  } else if (percentage >= 70) {
    return "👏 Très bien ! Vous maîtrisez bien la géographie mondiale !";
  } else if (percentage >= 60) {
    return "👍 Bien joué ! Continuez à explorer le monde !";
  } else if (percentage >= 40) {
    return "💪 Pas mal ! Avec un peu plus d'entraînement, vous serez au top !";
  } else {
    return "🗺️ C'est un début ! L'exploration du monde ne fait que commencer !";
  }
};

export const playSound = (type: 'correct' | 'incorrect' | 'click' | 'timeup', volume: number = 0.5) => {
  // Simulation de sons avec des bips courts
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  
  switch (type) {
    case 'correct':
      // Son de succès (note montante)
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
      break;
      
    case 'incorrect':
      // Son d'erreur (note descendante)
      oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime); // F4
      oscillator.frequency.setValueAtTime(293.66, audioContext.currentTime + 0.2); // D4
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
      break;
      
    case 'click':
      // Son de clic court
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
      break;
      
    case 'timeup':
      // Son de fin de temps (alarme)
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      break;
  }
};