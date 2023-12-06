import { readInputLines } from "../utils/readLines.ts";
import { countWinningStrategies } from "./logic.ts";
import { readRaces } from "./parser.ts";


const lines = await readInputLines();

const races = readRaces(lines)

const results = countWinningStrategies(races)
const multi = results.reduce((p,c) => p*c)
console.log(multi)