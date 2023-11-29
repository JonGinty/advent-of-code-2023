import * as path from "https://deno.land/std@0.208.0/path/mod.ts";

export const workingFolder = path.dirname(path.fromFileUrl(Deno.mainModule));

export function indexRelative(p: string): string {
  return path.join(workingFolder, p);
}
