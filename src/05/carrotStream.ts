import { readInputLines } from "../utils/readLines.ts";
import { loadMaps } from "./parser.ts";
import { findResult } from "./seedLogic.ts";


const inputLines = await readInputLines()
const almanac = loadMaps(inputLines)



const result = almanac.seedList.map(s => findResult(s, almanac)) //= findResult(79, almanac)
console.log(result)
console.log(Math.min(...result))
//console.log(almanac)