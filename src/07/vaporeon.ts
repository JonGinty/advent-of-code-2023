import { readDelimitedInputData } from "../utils/readLines.ts";
import { calculateWinnings, sortHands } from "./cairdLogic.ts";
 
const input = await readDelimitedInputData(" ");


//console.log(input)

const scored = sortHands(input);

const winnings = calculateWinnings(scored);
console.log(winnings)
//console.log(scored)