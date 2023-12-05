import { almanac, seedRange, thingMap } from "./parser.ts";

export function findResult(seedList: seedRange[], al: almanac): number {
  let total = 0;
  seedList.forEach((r) => {
    total += r[1];
  });

  let globalCount = 0;

  //const results: number[] = [];
  let min = findResultOld(seedList[0][0], al);

  for (let i = 0; i < seedList.length; i++) {
    const sr = seedList[i];
    for (let j = sr[0]; j < sr[0] + sr[1]; j++) {
      if (globalCount++ % 1000000 === 0) {
        console.log(
          `done ${globalCount} out of ${total}. Current lowest is ${min}`
        );
      }
      min = Math.min(min, findResultOld(j, al));
      //results.push(findResultOld(j, al))
    }
  }

  return min;
}

export function findResultOld(seedNumber: number, al: almanac): number {
  let current = seedNumber;
  al.maps.forEach((map) => {
    current = singleMapStep(current, map);
    //console.log(current)
  });
  return current;
}

export function singleMapStep(inputNumber: number, map: thingMap): number {
  for (const line of map.lines) {
    if (inputNumber >= line.source && inputNumber <= line.source + line.range) {
      const offset = inputNumber - line.source;
      return line.dest + offset;
    }
  }
  return inputNumber;
}
