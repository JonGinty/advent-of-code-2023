import { game, round } from "./parser.ts";

export function isGameValid(game: game, limits: round): boolean {
  for (const round of game.rounds) {
    for (const key in limits) {
      if (round[key] > limits[key]) return false;
    }
  }
  return true;
}
