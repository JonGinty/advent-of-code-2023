export function parseLine(line: string): game {
  const [gameName, allRounds] = line.split(":");
  const [_, idString] = gameName.split(" ");
  const id = parseInt(idString);
  const rounds = allRounds.split(";").map((round) => roundFromString(round));
  return {
    id,
    rounds,
  };
}

export function roundFromString(roundMoves: string): round {
  const r: round = {
    red: 0,
    green: 0,
    blue: 0,
  };
  roundMoves
    .trim()
    .split(",")
    .forEach((m) => {
      m = m.trim();
      const [numString, colour] = m.split(" ");
      const num = parseInt(numString);
      const val = r[colour];
      if (typeof val !== "number") {
        throw new Error(
          "You messed up bro :'(, I don't know what " + colour + " is."
        );
      }
      r[colour] = val + num;
    });
  return r;
}

export type game = {
  id: number;
  rounds: round[];
};

export type round = {
  red: number;
  green: number;
  blue: number;
  [index: string]: number;
};
