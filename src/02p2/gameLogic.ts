import { game, round } from "./parser.ts";

export function isGameValid(game: game, limits: round): boolean {
  for (const round of game.rounds) {
    for (const key in limits) {
      if (round[key] > limits[key]) return false;
    }
  }
  return true;
}

export function minValues(game: game): round {
  const minValues: round = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const round of game.rounds) {
    for (const key in round) {
      if (round[key] > minValues[key]) {
        minValues[key] = round[key];
      }
    }
  }
  return minValues;
}

export function power(round: round): number {
  return round.red * round.green * round.blue;
}
