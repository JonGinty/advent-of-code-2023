
export type play = {
    hand:string;
    bid:number;
    score: number;
}


export function sortHands(input: string[][]): play[] {
    const plays: play[] = input.map(play => ({hand: play[0], bid: parseInt(play[1]), score: scoreHand(play[0])}))
    return plays.toSorted((a, b) => {
        if (a.score !== b.score) return a.score - b.score;
        for (let i = 0; i < a.hand.length; i++) {
            const aCar = a.hand[i], bCar = b.hand[i];
            if (aCar === bCar) continue;
            return cardRanks.indexOf(aCar) - cardRanks.indexOf(bCar)
        }
        return 0
    });
}


const cardRanks = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A"
]

function scoreHand(hand: string): number {
    const groups: Record<string, number> = {};

    for (let i = 0; i < hand.length; i++) {
        const char = hand[i];
        if (char in groups) continue;
        let total = 0;
        for (let j = 0; j < hand.length; j ++) {
            if (hand[j] === char) total++;
        }
        if (total > 1) groups[char] = total;
    }

    const groupNames = Object.keys(groups);
    const groupcount = groupNames.length;
    if (groupcount === 0) return 0; // high card
    else if (groupcount === 1) {
        const groupSize = groups[groupNames[0]]
        switch (groupSize) {
            case 2: return 1;
            case 3: return 3;
            case 4: return 5;
            case 5: return 6;
            default: 
                throw "you messed up mate"
        }
    } else if (groupcount === 2) {
        for (const card in groups) {
            if (groups[card] === 3) return 4
        }
        return 2
    } else {
        throw "you messed up but in a different way lol"
    }
}

export function calculateWinnings(plays: play[]): number {
    let total = 0;
    plays.forEach((play, index) => {
        total += (index + 1) * play.bid
    })
    return total;
}