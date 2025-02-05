import React from 'react';
import { motion } from 'framer-motion';
import { DifficultyLevel } from '../types/game';

interface DifficultySelectorProps {
  difficulty: DifficultyLevel;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onDifficultyChange,
}) => {
  return (
    <div className="mb-6">
      <label className="mr-2 text-gray-700">Difficulty:</label>
      <motion.select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as DifficultyLevel)}
        className="p-2 border rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        whileHover={{ scale: 1.05 }}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </motion.select>
    </div>
  );
};

export default DifficultySelector;