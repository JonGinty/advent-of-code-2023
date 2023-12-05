import { readInputLines } from "../utils/readLines.ts";
import { countWinners } from "./cardLogic.ts";
import { readCard } from "./parser.ts";

const cards = (await readInputLines())
  .map((l) => l.replaceAll("  ", " 0"))
  .map(readCard)
  .map(countWinners);

let sum = 0;
cards.forEach((c) => (sum += c));

console.log(sum);
