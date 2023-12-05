import { almanac, thingMap } from "./parser.ts";



export function findResult(seedNumber: number, al: almanac): number {
    let current = seedNumber;
    al.maps.forEach(map => {
        current = singleMapStep(current, map)
        //console.log(current)
    })
    return current;
}


export function singleMapStep(inputNumber: number, map: thingMap): number {
    for (const line of map.lines) {
        if (inputNumber >= line.source && inputNumber <= line.source + line.range ) {
            const offset = inputNumber - line.source;
            return line.dest + offset;
        }
    }
    return inputNumber;
}