import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../types/game';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinning?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning = false }) => {
  return (
    <motion.button
      className={`w-20 h-20 border border-gray-400 flex items-center justify-center text-4xl font-bold
        ${isWinning 
          ? 'bg-green-200 border-green-500' 
          : 'bg-white hover:bg-gray-100'}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            color: isWinning ? '#059669' : value === 'X' ? '#2563EB' : '#DC2626'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Square;