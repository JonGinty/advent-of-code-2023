import { readInputLines } from "../utils/readLines.ts";
import { isGameValid } from "./gameLogic.ts";
import { parseLine, round } from "./parser.ts";

const input = await readInputLines();
const limit: round = {
  red: 12,
  green: 13,
  blue: 14,
};
let sum = 0;
input
  .map((line) => parseLine(line))
  .filter((game) => isGameValid(game, limit))
  .forEach((game) => (sum += game.id)); // can't remember if there's a collect / aggregate in JS

console.log(sum);
