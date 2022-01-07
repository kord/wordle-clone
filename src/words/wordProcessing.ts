import {wordListRaw} from './wordList';
import {PrefixDict} from "./prefixDict";

function letterCounts(lis: Array<string>) {
    const cnt = new Map<string, number>();
    lis.forEach(w => {
        for (let i = 0; i < w.length; i += 1) {
            const letter = w[i];
            const currentCount = cnt.get(letter);
            if (currentCount !== undefined) cnt.set(letter, currentCount + 1);
            else cnt.set(letter, 1);
        }
    });
    let ret = new Array<string>();
    cnt.forEach((v, k) => ret.push(`${k}: ${v}`));
    return `${ret.length} character types types... ` + ret.join(', ');
}

export function justLetters(w: string): boolean {
    const regex = /^[abcdefghijklmnopqrstuvwxyz]*$/;
    return regex.test(w);
}

function getCleanWordlist() {
    const separateWords = wordListRaw.split('\n').map(w => w.toLowerCase());
    const alphaWords = separateWords.filter(w => justLetters(w));
    const prunedCount = separateWords.length - alphaWords.length;
    console.log(`${prunedCount} of ${separateWords.length} words pruned for non-alpha characters...`);
    return alphaWords;
}


function wordListByLength(cleanWords: string[], n: number) {
    return cleanWords.filter(w => w.length === n).sort();
}

export function randomWordByLength(n: number) {
    const wl = wordsByLength[n];
    const wordCount = wl.length;
    const wordIndex = Math.floor(Math.random() * wordCount);
    return wl[wordIndex];
}


export let wordsByLength: Array<Array<string>> = new Array<Array<string>>();
export let prefixDictByLength: Array<PrefixDict> = new Array<PrefixDict>();


export function initWordLists() {
    console.log(`Initializing word lists...`);

    const cleanWords = getCleanWordlist();

    for (let size = 0; size < 10; size += 1) {
        const words = wordListByLength(cleanWords, size);
        const pl = PrefixDict.from(words);
        wordsByLength.push(words);
        prefixDictByLength.push(pl);

        let byteLength = JSON.stringify(words).length;
        console.log(`There are ${words.length} words of length ${size} making ${Math.ceil(byteLength / 1024)}kB`);

        let plByteLength = JSON.stringify(pl).length;
        console.log(`PrefixDict size: ${Math.ceil(plByteLength / 1024)}kB`);
    }


}

