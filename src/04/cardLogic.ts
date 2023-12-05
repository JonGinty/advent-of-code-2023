import { card } from "./parser.ts";

export function countWinners(card: card) {
  let count = 0;
  //console.log(card);
  card.actual.forEach((n) => {
    if (card.winners.includes(n)) {
      if (count === 0) {
        count = 1;
      } else {
        count *= 2;
      }
    }
  });
  //console.log(count);
  return count;
}
