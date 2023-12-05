import { card } from "./parser.ts";

export function countWinners(card: card) {
  let count = 0;
  //console.log(card);
  card.actual.forEach((n) => {
    if (card.winners.includes(n)) {
      count++;
    }
  });
  //console.log(count);
  return count;
}
