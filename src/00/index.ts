import {
  readInputCsv,
  readInputLines,
  readInputYaml,
} from "../utils/readLines.ts";

const input = await readInputLines();

console.log(input[0]);

const iy = await readInputYaml();
console.log(iy);

const csv = await readInputCsv();
const numbers = csv.map((l) => l.map((n) => parseInt(n)));
console.log(numbers);
