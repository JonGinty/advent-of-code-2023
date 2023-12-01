import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";



Deno.test("works", () => {
    assertEquals(isNaN(parseInt("a")), true)
})