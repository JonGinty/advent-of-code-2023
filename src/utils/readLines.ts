import { indexRelative } from "./indexRelative.ts";

export default async function readLines(filePath: string) {
  const text = await Deno.readTextFile(indexRelative(filePath));

  return text.split("\r\n")//.map(s => s.trimEnd());
}

export async function readInputLines() {
  return await readLines("input.txt");
}
