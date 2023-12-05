import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { Grid } from "./Grid.ts";
import { splitInputLines } from "./splitInputLines.ts";

const inputString = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

Deno.test("grid load from multiline string", () => {
  const g = new Grid();
  g.loadLines(splitInputLines(inputString));
  assertEquals(g.toString(), inputString);
});

const weirdValuesExpected = `x                    
                     
                     
                    y`; // pain
Deno.test("grid with weird values", () => {
  const g = new Grid();

  g.set(-10, -1, "x");
  g.set(10, 2, "y");
  assertEquals(g.toString(), weirdValuesExpected);
});
