export type play = {
  hand: string;
  bid: number;
  score: number;
};

export function sortHands(input: string[][]): play[] {
  const plays: play[] = input.map((play) => ({
    hand: play[0],
    bid: parseInt(play[1]),
    score: scoreHand(play[0]),
  }));
  return plays.toSorted((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    for (let i = 0; i < a.hand.length; i++) {
      const aCar = a.hand[i],
        bCar = b.hand[i];
      if (aCar === bCar) continue;
      return cardRanks.indexOf(aCar) - cardRanks.indexOf(bCar);
    }
    return 0;
  });
}

const cardRanks = [
  "J",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

function scoreHand(hand: string): number {
  const groups: Record<string, number> = {};

  for (let i = 0; i < hand.length; i++) {
    const char = hand[i];
    if (char === "J" || char in groups) continue;
    let total = 0;
    for (let j = 0; j < hand.length; j++) {
      if (hand[j] === char) total++;
    }
    if (total > 1) groups[char] = total;
  }

  const jCount = hand.length - hand.replaceAll("J", "").length;

  const groupNames = Object.keys(groups);
  const groupcount = groupNames.length;
  if (groupcount === 0) {
    switch (jCount) {
      case 0:
        return 0; // high card
      case 1:
        return 1; // 1 pair
      case 2:
        return 3; // 3 of a kind
      case 3:
        return 5; // 4 of a kind
      case 4:
      case 5:
        return 6; // 5 of a kind
    }
    return 0; // high card
  } else if (groupcount === 1) {
    const groupSize = groups[groupNames[0]];
    const withJGroupSize = groupSize + jCount;
    switch (withJGroupSize) {
      case 2:
        return 1; // 1 pair
      case 3:
        return 3; // 3 of a kind
      case 4:
        return 5; // 4 of a kind
      case 5:
        return 6; // 5 of a kind
      default:
        throw "you messed up mate";
    }
  } else if (groupcount === 2) {
    if (jCount > 0) return 4; // full house
    for (const card in groups) {
      if (groups[card] === 3) return 4;
    }
    return 2; // 2 pairs
  } else {
    throw "you messed up but in a different way lol";
  }
}

export function calculateWinnings(plays: play[]): number {
  let total = 0;
  plays.forEach((play, index) => {
    total += (index + 1) * play.bid;
  });
  return total;
}
