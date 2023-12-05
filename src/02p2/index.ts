import { readInputLines } from "../utils/readLines.ts";
import { isGameValid, minValues, power } from "./gameLogic.ts";
import { parseLine, round } from "./parser.ts";

const input = await readInputLines();

let sum = 0;
input
  .map((line) => parseLine(line))
  .forEach((game) => (sum += power(minValues(game))));

console.log(sum);
