import { readInputLines } from "../utils/readLines.ts";
import { countWinners } from "./cardLogic.ts";
import { readCard } from "./parser.ts";

const cards = (await readInputLines())
  .map((l) => l.replaceAll("  ", " 0"))
  .map(readCard);

const trackedCards: number[] = cards.map((_) => 1);

let sum = 0;

cards.forEach((card, index) => {
  const modifier = trackedCards[index];
  const score = countWinners(card);
  for (let i = 1; i <= score; i++) {
    trackedCards[index + i] += modifier;
  }
  sum += modifier;
});

console.log(sum);
