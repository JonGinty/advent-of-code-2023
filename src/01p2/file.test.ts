import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { numberToString } from "../01p2/numberstuff.ts";



Deno.test("still works", () => {
    assertEquals(numberToString(3), "three")
})