import {commonWordsByLength, permissiveDicts} from "./wordProcessing";

function matchstring(guess: string, target: string) {
    let matched = [];
    let found = [];
    let ret = '';
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === target[i]) {
            ret += 'x';
            continue;
        }
        if (target.indexOf(guess[i]) != -1) {
            ret += 'o';
            continue;
        }
        ret += ' ';
        //
        //
        // matched.push((guess[i] === target[i]));
        // found.push(target.indexOf(guess[i]) != -1);
    }
    return ret;
}

// BEST FIRST GUESS WORDS
//
// 4: common "SALE" permissive "EASI"
// 5: common "ARISE" permissive "RAISE"
// 6: common "ISREAL" permissive "ISREAL"
// 7: common "RENTALS" permissive "israel"
//

// Best guess for length 2 is ac
//  Worst case you need to distinguish between 7.87% of the lexicon.
//  Toughest bucket:   : 310
//  Best guess for length 3 is sea
//  Worst case you need to distinguish between 4.13% of the lexicon.
//  Toughest bucket:    : 274
//  Best guess for length 4 is sale
//  Worst case you need to distinguish between 1.6% of the lexicon.
//  Toughest bucket:     : 150
//  Best guess for length 5 is arise
//  Worst case you need to distinguish between 0.55% of the lexicon.
//  Toughest bucket:    oo: 66
//  Best guess for length 6 is ratios
//  Worst case you need to distinguish between 0.28% of the lexicon.
//  Toughest bucket:     o : 36
//  Best guess for length 7 is pirates
//  Worst case you need to distinguish between 0.18% of the lexicon.
//  Toughest bucket:  o o   : 22
//  Best guess for length 8 is articles
//  Worst case you need to distinguish between 0.1% of the lexicon.
//      Toughest bucket: o oo    : 11
//  Best guess for length 9 is creations
//  Worst case you need to distinguish between 0.07% of the lexicon.
//      Toughest bucket:   oooooo : 6
//  Toughest bucket:   o oooo : 6
//  Toughest bucket:  o ooooo : 6
//  Best guess for length 10 is colleagues
//  Worst case you need to distinguish between 0.1% of the lexicon.
//    Toughest bucket: o oooo  o : 6
//    Toughest bucket: o   oo  o : 6
//    Toughest bucket:     oo  ox: 6


function evaluateWord(lexicon: string[], guess: string) {
    const buckets = new Map<string, number>();
    for (let target of lexicon) {
        const result = matchstring(guess, target);

        const val = buckets.get(result);
        if (val) buckets.set(result, val + 1)
        else buckets.set(result, 1);
    }
    return buckets;
}

function BucketQuality(buckets: Map<string, number>) {
    let worstbucket = 0;
    let wordcount = 0;
    buckets.forEach((v, k) => {
        if (v > worstbucket) worstbucket = v;
        wordcount += v;
    });

    const worstBucketSize = wordcount / worstbucket
    return worstBucketSize;
}

export function findBestFirstWords(len: number, useBig = false) {
    const wordlist = useBig ?
        permissiveDicts[len].WordList :
        commonWordsByLength[len];

    let bestWorstBucket = Number.MAX_VALUE;
    let bestBuckets: Map<string, number>;
    let bestWord = 'SHOULD NOT HAPPEN';

    // const organizedBuckets = wordlist
    //     .map(w => evaluateWord(wordlist, w))
    //     .sort((a, b) => BucketQuality(a) - BucketQuality(a));
    // for (let i = 0; i <= reportCount && i < organizedBuckets.length; i++) {
    //     const bucket = organizedBuckets[i];
    //     const quality = BucketQuality(bucket);
    //     console.log(`Word #${i+1} size reduction ${(100*(1-quality)).toFixed(1)}%`)
    // }

    for (let guess of wordlist) {
        // const buckets = new Map<string, number>();
        // for (let target of wordlist) {
        //     const result = matchstring(guess, target);
        //
        //     const val = buckets.get(result);
        //     if (val) buckets.set(result, val + 1)
        //     else buckets.set(result, 1);
        // }
        //
        // let worstbucket = 0;
        // buckets.forEach(v => {
        //     if (v > worstbucket) worstbucket = v;
        // });
        const buckets = evaluateWord(wordlist, guess);
        const worstbucket = -BucketQuality(buckets);

        if (worstbucket < bestWorstBucket) {
            bestWorstBucket = worstbucket;
            bestBuckets = buckets;
            bestWord = guess;
        }

    }

    console.log(`Best guess for length ${len} is ${bestWord}`);
    const proportion = Math.ceil(1000 * (-bestWorstBucket) / wordlist.length) / 100;
    console.log(`Worst case you need to distinguish between ${proportion}% of the lexicon.`)

    bestBuckets!.forEach((v, k) => {
        if (v == bestWorstBucket)
            console.log(`Toughest bucket: ${k}: ${v}`)
    });
    // bestBuckets!.forEach((v,k) => console.log(`${k}: ${v}`));
}