import { race } from "./parser.ts";


export function countWinningStrategies(races: race[]): number[] {
    return races.map(r => countWinningStrategiesForRace(r))
}

function countWinningStrategiesForRace(race: race): number {
    let count = 0;
    for (let i = 0; i <= race.duration; i++) {
        const runTime = race.duration - i;
        const distance = runTime * i;
        if (distance > race.record) count++
    }
    return count;
}