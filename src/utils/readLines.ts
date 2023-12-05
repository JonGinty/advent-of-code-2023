import { indexRelative } from "./indexRelative.ts";
import { splitInputLines } from "./splitInputLines.ts";

export default async function readLines(filePath: string) {
  const text = await Deno.readTextFile(indexRelative(filePath));

  return splitInputLines(text);
}

export async function readInputLines() {
  return await readLines("input.txt");
}
