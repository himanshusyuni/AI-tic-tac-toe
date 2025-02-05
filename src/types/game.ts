export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type GameResult = {
  winner: Player;
  line: number[];
} | null;