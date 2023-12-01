export default function myCoolNumberFunc(input: string[]) {
  let total = 0;
  input.forEach((rawline) => {
    const line = replaceStringsWithNumber(rawline)
    let first, last;

    for (const char of line) {
      const num = parseInt(char);
      if (!isNaN(num)) {
        if (!first) first = num;
        last = num;
      }
    }

    const combo = `${first}${last}`;
    console.log(combo)
    total += parseInt(combo);
  });
  return total;
}

function replaceStringsWithNumber(input: string): string {

  for (let i = 0; i < input.length; i++) {
    for (let j = 1; j < 10; j++) {
      const token = numberArray[j];
      const search = input.substring(i, i+token.length);
      if (token === search) {
        input = input.substring(0,i) + j + input.substring(i+1)
      }
    }
  }

  for (let i = 1; i < 10; i++) {
    input = input.replace(numberArray[i], i.toString())
  }
  return input;

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
