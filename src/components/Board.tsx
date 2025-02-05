import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import Square from './Square';
import DifficultySelector from './DifficultySelector';
import { Board as BoardType, DifficultyLevel, GameResult } from '../types/game';
import { checkWinner, getBestMove } from '../utils/minimax';

const ROASTS = [
  "Noob, first time?",
  "I've seen screensavers play better tic-tac-toe than that! 🎮",
  "Breaking news: AI wins again, humans consider returning to rock-paper-scissors 📰",
  "My code was written in crayon and I still managed to win 🖍️",
  "Is this your first time using a computer? Just checking... 💻",
  "That's a creative way to lose! Never seen that one before 🎨",
  "Are you playing blindfolded? Because that would explain a lot 🙈",
  "Error 404: Player skill not found 🔍",
  "Have you considered a career in making AI feel overconfident? 🎯",
  "I've seen random number generators make better moves 🎲",
  "Is this what humans call 'strategic losing'? Fascinating! 🤔",
];

const Board: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameEndMessage, setGameEndMessage] = useState<string>('');
  const [gameResult, setGameResult] = useState<GameResult>(null);

  useEffect(() => {
    if (!isXNext && !gameOver) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove([...board], difficulty);
        handleClick(bestMove);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, difficulty, gameOver]);

  const handleClick = (i: number) => {
    if (board[i] || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);
    if (result) {
      setGameResult(result);
      setGameOver(true);
      setScore(prev => ({
        ...prev,
        [result.winner as keyof typeof prev]: prev[result.winner as keyof typeof prev] + 1
      }));

      if (result.winner === 'X') {
        setShowConfetti(true);
        setGameEndMessage("Congratulations! You've won! 🎉");
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        const randomRoast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
        setGameEndMessage(randomRoast);
      }
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
      setGameEndMessage("It's a draw! Would you like to try again? 🤝");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setShowConfetti(false);
    setGameEndMessage('');
    setGameResult(null);
  };

  const status = gameOver 
    ? gameEndMessage 
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center justify-center ">
      {showConfetti && <Confetti />}

      <motion.div
        className="h-16 mb-4 flex items-center justify-center"
      >
        <motion.p
          className={`px-6 py-3 rounded-lg text-xl font-bold shadow-md ${
            gameEndMessage.includes('Congratulations')
              ? 'bg-green-100 text-green-600 border border-green-300'
              : gameEndMessage.includes('Beaten')
              ? 'bg-red-100 text-red-600 border border-red-300'
              : 'bg-blue-100 text-blue-600 border border-blue-300'
          }`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          {status}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <DifficultySelector
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />

        <div className="flex justify-between mb-4">
          <div className="text-lg">Player X: {score.X}</div>
          <div className="text-lg">AI O: {score.O}</div>
        </div>

        <motion.div
          className="grid grid-cols-3 gap-1 bg-gray-300 p-1 rounded"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {board.map((square, i) => (
            <Square 
              key={i} 
              value={square} 
              onClick={() => handleClick(i)}
              isWinning={gameResult?.line.includes(i)}
            />
          ))}
        </motion.div>

        {gameOver && (
          <motion.button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 transition-colors"
            onClick={resetGame}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Board;