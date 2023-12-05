export function splitInputLines(lines: string): string[] {
  return lines.split("\n").map((s) => s.trimEnd()); // more cross-platform
}
