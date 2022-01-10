import {scrabbleWordListRaw, wordListLame} from './wordList';
import {PrefixDict} from "./prefixDict";
import {commonWordsList} from "./commonWordsList";
import {excludedWordList} from "./excludedWords";

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

function getCleanWordlist(wordListRaw: string) {
    const separateWords = wordListRaw.split('\n').map(w => w.toLowerCase());

    const blacklist = PrefixDict.from(excludedWordList);
    const postBlacklistWords = separateWords.filter(w => !blacklist.hasWord(w));
    const blacklistPrunedCount = separateWords.length - postBlacklistWords.length;
    console.log(`${blacklistPrunedCount} of ${separateWords.length} words pruned for blacklist...`);

    const alphaWords = postBlacklistWords.filter(w => justLetters(w));
    const prunedCount = postBlacklistWords.length - alphaWords.length;
    console.log(`${prunedCount} of ${postBlacklistWords.length} words pruned for non-alpha characters...`);

    return alphaWords;
}


function wordListByLength(cleanWords: string[], n: number) {
    return cleanWords.filter(w => w.length === n).sort();
}

export function randomCommonWordByLength(n: number) {
    const wl = commonWordsByLength[n];
    const wordCount = wl.length;
    const wordIndex = Math.floor(Math.random() * wordCount);
    return wl[wordIndex];
}


export let commonWordsByLength: Array<Array<string>> = new Array<Array<string>>();
export let permissiveDicts: Array<PrefixDict> = new Array<PrefixDict>();


export function initWordLists() {
    console.log(`Initializing word lists...`);

    const cleanScrabbleWords = getCleanWordlist(scrabbleWordListRaw);
    const cleanCommonWords = getCleanWordlist(commonWordsList);
    const cleanWordsLame = getCleanWordlist(wordListLame);

    for (let size = 0; size <= 10; size += 1) {
        // Make the permissive dicts, including everything of the right length on our word lists.
        let permissiveDict = new PrefixDict();
        for (let wl of [cleanScrabbleWords, cleanCommonWords, cleanWordsLame]) {
            wordListByLength(wl, size).forEach(word => permissiveDict.addWord(word));
        }
        permissiveDicts.push(permissiveDict);

        // Process out the common words for use as puzzles
        const words = wordListByLength(cleanCommonWords, size);
        commonWordsByLength.push(words);
        let byteLength = JSON.stringify(words).length
        console.log(`There are ${wordListByLength(cleanCommonWords, size).length} common words of length ${size} making ${Math.ceil(byteLength / 1024)}kB`);

    }

    //    Show words in scrabble dictionary but not in
    const wlen = 7;
    const list = [];
    const bigdic = PrefixDict.from(wordListByLength(cleanScrabbleWords, wlen));
    for (let w of wordListByLength(cleanCommonWords, wlen)) {
        if (!bigdic.hasWord(w))
            list.push(w);
    }
    console.log(list.join('\n'))

}

