import { readInputLines } from "../utils/readlines.ts";
import myCoolNumberFunc from "./numberstuff.ts";


const input = await readInputLines()

const result = myCoolNumberFunc(input);

console.log(result)