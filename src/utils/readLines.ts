import { indexRelative } from "./indexRelative.ts";
import { splitInputLines } from "./splitInputLines.ts";
import { parse } from "https://deno.land/std@0.208.0/yaml/mod.ts";

export default async function readLines(filePath: string) {
  const text = await Deno.readTextFile(indexRelative(filePath));

  return splitInputLines(text);
}

export async function readInputLines() {
  return await readLines("input.txt");
}

export async function readYaml(filePath: string) {
  const text = await Deno.readTextFile(indexRelative(filePath));
  return parse(text);
}

export async function readInputYaml() {
  return await readYaml("input.yml");
}

export async function readDelimitedData(filePath: string, delimiter: string) {
  return await (await readLines(filePath)).map((line) => line.split(delimiter));
}

export async function readDelimitedInputData(delimiter: string) {
  return await readDelimitedData("input.txt", delimiter);
}

export async function readInputCsv() {
  return await readDelimitedData("input.csv", ",");
}
