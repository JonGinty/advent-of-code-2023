export default function myCoolNumberFunc(input: string[]) {
  let total = 0;
  input.forEach((line) => {
    

    let first, last;

    for (const char of line) {
      const num = parseInt(char);
      if (!isNaN(num)) {
        if (!first) first = num;
        last = num;
      }
    }

    const combo = `${first}${last}`;
    total += parseInt(combo);
  });
  return total;
}


const numberArray = [
    "a horrible string that will never match hopefully",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
]

export function numberToString(input: number): string {
    return numberArray[input]
}



export function idkSomeTestStuff() {}
