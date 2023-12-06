




export type race = {
    record: number;
    duration: number;
}


export function readRaces(input: string[])  {
    const durations = input[0].split(/[^\d]+/).filter(s => s).map(r => parseInt(r));
    const records = input[1].split(/[^\d]+/).filter(s => s).map(r => parseInt(r));

    return durations.map((duration, i) => ({
        duration,
        record: records[i]
    }))
}