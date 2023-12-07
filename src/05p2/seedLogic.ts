import { almanac, seedRange, thingMap } from "./parser.ts";

export function findResult(seedList: seedRange[], al: almanac): number {
  // let total = 0;
  // seedList.forEach((r) => {
  //   total += r[1];
  // });

  // let globalCount = 0;

  // //const results: number[] = [];
  // let min = findResultOld(seedList[0][0], al);

  // for (let i = 0; i < seedList.length; i++) {
  //   const sr = seedList[i];
  //   for (let j = sr[0]; j < sr[0] + sr[1]; j++) {
  //     if (globalCount++ % 1000000 === 0) {
  //       console.log(
  //         `done ${globalCount} out of ${total}. Current lowest is ${min}`
  //       );
  //     }
  //     min = Math.min(min, findResultOld(j, al));
  //     //results.push(findResultOld(j, al))
  //   }
  // }
  const results = findResultRange(seedList, al);
  console.log(`
  
  
  `);
  console.log(results);
  return Math.min(...results.map((r) => r[0]));
}

export function findResultRange(seeds: seedRange[], al: almanac): seedRange[] {
  let ranges = seeds;
  al.maps.forEach((map) => {
    ranges = ranges
      .map((range) => singleMapStepRange(range, map))
      .reduce((p, c) => [...p, ...c]);
  });
  return ranges;
}

export function singleMapStepRange(
  seeds: seedRange,
  map: thingMap
): seedRange[] {
  console.log(`input ${seeds}`);
  const processedRanges: seedRange[] = [];
  for (const line of map.lines) {
    const seedStart = seeds[0];
    const seedEnd = seedStart + seeds[1] - 1;
    const mapEnd = line.source + line.range - 1;
    const offset = line.dest - line.source;
    if (seedStart >= line.source && seedStart <= mapEnd) {
      if (seedEnd >= line.source && seedEnd <= mapEnd) {
        // entire range is contained
        processedRanges.push([seedStart + offset, seeds[1]]);
        // console.log(`output ${processedRanges.join("---")}`);
        // console.log("entire");
        // console.log(map);
        return processedRanges;
      }
      seeds = [mapEnd + 1, seedEnd - mapEnd]; // new unprocessed range
      processedRanges.push([seedStart + offset, mapEnd + 1 - seedStart]);
    } else if (seedEnd >= line.source && seedEnd <= mapEnd) {
      // trailing overlap
      seeds = [seedStart, line.source - seedStart];
      processedRanges.push([line.source + offset, seedEnd - line.source + 1]);
    }
  }

  processedRanges.push(seeds);
  // console.log(`output ${processedRanges.join("---")}`);
  // console.log("partial");
  // console.log(map);
  return processedRanges;
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
