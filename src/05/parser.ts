

export type thingMap = {
    source: string;
    dest: string;
    lines: sourceMapping[]
}

export type sourceMapping = {
    source: number;
    dest: number;
    range: number;
}

export type almanac = {
    seedList: number[]
    maps: thingMap[]
}

export function loadMap(input: string[]): thingMap {
    const title = input[0]
    const [mapname, _] = title.split(" ");
    const [source, __, dest] = mapname.split("-")
    const lines: sourceMapping[] = [];
    for (let i = 1; i < input.length; i++) {
        lines.push(loadLine(input[i]))
    }
    return {
        source, dest, lines
    }
}

export function loadLine(input: string): sourceMapping {
    const [dest, source, range] = input.split(" ").map(v => parseInt(v))
    return {
        dest, source, range
    }
}

export function loadSeedList(input: string): number[] {
    const [_, ...values] = input.split(" ");
    return values.map(v => parseInt(v))
}

export function loadMaps(fullInput: string[]): almanac {
    const r :almanac = {
        seedList: loadSeedList(fullInput[0]),
        maps: []
    }

    let latestThing: string[] = []
    for (let i = 2; i < fullInput.length; i++) {
        if (!fullInput[i]) {
            r.maps.push(loadMap(latestThing))
            latestThing = [];
        } else {
            latestThing.push(fullInput[i])
        }
    }
    r.maps.push(loadMap(latestThing))

    return r;
}