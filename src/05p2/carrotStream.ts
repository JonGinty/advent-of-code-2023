import { readInputLines } from "../utils/readLines.ts";
import { loadMaps } from "./parser.ts";
import { findResult } from "./seedLogic.ts";


const inputLines = await readInputLines()
const almanac = loadMaps(inputLines)


let total = 0;
almanac.seedList.forEach(r => {
    total += r[1]
})

// this doesn't actually work, also takes about 20 minutes, it'll take some more work
const result = findResult(almanac.seedList, almanac) //almanac.seedList.map(s => findResult(s, almanac)) //= findResult(79, almanac)
console.log(result)

//console.log(Math.min(...result))
//console.log(almanac)
//console.log(total)