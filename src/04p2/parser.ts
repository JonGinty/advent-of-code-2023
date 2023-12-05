export type card = {
  identifier: string;
  actual: number[];
  winners: number[];
};

export function readCard(line: string) {
  const [identifier, cards] = line.split(": ");
  const [winners, actual] = cards
    .split(" | ")
    .map((c) => c.split(" ").map((n) => parseInt(n)));
  return {
    identifier,
    actual,
    winners,
  };
}
