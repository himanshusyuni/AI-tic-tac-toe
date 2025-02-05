import React from 'react';
import { motion } from 'framer-motion';
import Board from './components/Board';

const App: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-gray-600">
            Challenge the AI at different difficulty levels!
          </p>
        </motion.header>

        <main className="flex justify-center">
          <Board />
        </main>
{/* 
        <footer className="text-center mt-8 text-gray-600">
          <p>Created with React, TypeScript, and Tailwind CSS</p>
        </footer> */}
      </div>
    </motion.div>
  );
};

export default App;