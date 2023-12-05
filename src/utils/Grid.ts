export function toGrid(inputLines: string) {}

export type coord = [number, number];
export type gridItem<T> = [number, number, T];
export type range = { minX: number; minY: number; maxX: number; maxY: number };

export class Grid<T> {
  // this can be more performant to use an object than a sparse array
  private items: Record<string, Record<string, T>> = {};
  private range: RangeTracker = new RangeTracker();

  public set(x: number, y: number, value: T): void {
    this.range.log(x, y);
    const { xKey, yKey } = keyStrings(x, y);
    if (!this.items[xKey]) {
      this.items[xKey] = {};
    }
    this.items[xKey][yKey] = value;
  }

  public get(x: number, y: number): T | null {
    const { xKey, yKey } = keyStrings(x, y);
    const xRow = this.items[xKey];
    if (!xRow) return null;
    if (!Object.hasOwn(xRow, yKey)) return null;
    return xRow[yKey];
  }

  public loadLine(line: string, y: number) {
    for (let x = 0; x < line.length; x++) {
      this.set(x, y, line[x] as T);
    }
  }

  public loadLines(lines: string[]) {
    for (let y = 0; y < lines.length; y++) {
      this.loadLine(lines[y], y);
    }
  }

  public toString(range?: range): string {
    if (!range) {
      range = this.determineRange();
    }
    let output = "";

    for (let y = range.minY; y <= range.maxY; y++) {
      for (let x = range.minX; x <= range.maxX; x++) {
        output += this.get(x, y) ?? " ";
      }
      output += "\n";
    }
    return output.trimEnd();
  }

  public determineRange(): range {
    return this.range.range();
  }
}

class RangeTracker {
  minX: number | undefined = undefined;
  minY: number | undefined = undefined;
  maxX: number | undefined = undefined;
  maxY: number | undefined = undefined;

  logX(x: number) {
    if (typeof this.minX === "undefined" || x < this.minX) {
      this.minX = x;
    }
    if (typeof this.maxX === "undefined" || x > this.maxX) {
      this.maxX = x;
    }
  }

  logY(y: number) {
    if (typeof this.minY === "undefined" || y < this.minY) {
      this.minY = y;
    }
    if (typeof this.maxY === "undefined" || y > this.maxY) {
      this.maxY = y;
    }
  }

  log(x: number, y: number) {
    this.logX(x);
    this.logY(y);
  }

  range(): range {
    return {
      minX: this.minX ?? 0,
      minY: this.minY ?? 0,
      maxX: this.maxX ?? 0,
      maxY: this.maxY ?? 0,
    };
  }
}

function keyStrings(x: number, y: number): { xKey: string; yKey: string } {
  return { xKey: x.toString(), yKey: y.toString() };
}
