




export type race = {
    record: number;
    duration: number;
}


export function readRaces(input: string[]): race[]  {
    const duration = parseInt(input[0].split(/[^\d]+/).filter(s => s).reduce((p, c) => p+c));
    const record = parseInt(input[1].split(/[^\d]+/).filter(s => s).reduce((p, c) => p+c));

    return [
        {
            record, duration
        }
    ]
}