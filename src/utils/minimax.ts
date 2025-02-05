import { Board, DifficultyLevel, GameResult } from '../types/game';

export const checkWinner = (board: Board): GameResult => {
  const winningCombinations = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
  ];

  for (const line of winningCombinations) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  return null;
};

export const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number => {
  const result = checkWinner(board);

  if (result?.winner === 'O') return 10 - depth;
  if (result?.winner === 'X') return depth - 10;
  if (!board.includes(null)) return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false, alpha, beta);
        board[i] = null;
        maxEval = Math.max(maxEval, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true, alpha, beta);
        board[i] = null;
        minEval = Math.min(minEval, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
};

const difficultyRandomMoveChance: Record<DifficultyLevel, number> = {
  'easy': 0.7,
  'medium': 0.3,
  'hard': 0
};

export const getBestMove = (
  board: Board,
  difficulty: DifficultyLevel  
): number => {
  let bestScore = -Infinity;
  let bestMove = -1;

  const randomMoveChance = difficultyRandomMoveChance[difficulty];

  if (Math.random() < randomMoveChance) {
    const availableMoves = board
      .map((square, index) => (square === null ? index : -1))
      .filter((index) => index !== -1);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
};