import { coord, Grid } from "../utils/Grid.ts";
import { readInputLines } from "../utils/readLines.ts";

const input = await readInputLines();
const g = new Grid<string>();
g.loadLines(input);
const range = g.determineRange();

function findFullNumberString(
  grid: Grid<string>,
  x: number,
  y: number
): string {
  let numString = "";
  let i = 0;
  while (true) {
    const nextVal = grid.get(x + i, y);
    const nextNum = parseInt(nextVal || "");
    if (isNaN(nextNum)) break;
    numString += nextVal;
    i++;
  }
  return numString;
}

type gearEntry = {
  x: number;
  y: number;
  gearKey: string;
  value: string;
};

function findAdjacentSymbol(
  grid: Grid<string>,
  xStart: number,
  yStart: number,
  fullNum: string
): gearEntry | null {
  const numberLen = fullNum.length;
  for (let x = xStart - 1; x <= xStart + numberLen; x++) {
    for (let y = yStart - 1; y <= yStart + 1; y++) {
      const item = grid.get(x, y) || " ";
      if (!item.replace(/\*/, "").length) {
        return {
          x,
          y,
          gearKey: `x${x}y${y}`,
          value: fullNum,
        };
      }
    }
  }
  return null;
}

let sum = 0;

let gearEntries: Record<string, gearEntry[]> = {};

for (let y = range.minY; y <= range.maxY; y++) {
  let found = false;
  for (let x = range.minX; x <= range.maxX; x++) {
    const item = g.get(x, y);
    const num = parseInt(item ?? "");
    if (isNaN(num)) {
      found = false;
      continue; // nothing to do here
    }
    if (found) continue;
    found = true; // don't read sub numbers of this number
    // find full number
    const numString = findFullNumberString(g, x, y);
    const sym = findAdjacentSymbol(g, x, y, numString);

    if (sym !== null) {
      if (!gearEntries[sym.gearKey]) {
        gearEntries[sym.gearKey] = [];
      }
      gearEntries[sym.gearKey].push(sym);
    }
    //console.log(numString, sym);
  }
}

type ratio = {
  key: string;
  ratio: number;
};

const ratios: ratio[] = [];

for (const key in gearEntries) {
  if (gearEntries[key].length > 1) {
    let ratio = 1;
    for (let i = 0; i < gearEntries[key].length; i++) {
      ratio *= parseInt(gearEntries[key][i].value);
    }
    ratios.push({ key, ratio });
  }
}

ratios.forEach((r) => (sum += r.ratio));

console.log(sum);
