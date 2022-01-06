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

function justLetters(w: string): boolean {
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

const cleanWords = getCleanWordlist();

function wordListByLength(n: number) {
    return cleanWords.filter(w => w.length === n).sort();
}


let simpleLists: Array<Array<string>> = new Array<Array<string>>();
for (let k = 0; k < 10; k += 1)
    simpleLists.push(wordListByLength(k));


simpleLists.forEach((ls, size) => {
        let byteLength = JSON.stringify(ls).length;
        console.log(`There are ${ls.length} words of length ${size} making ${Math.ceil(byteLength / 1024)}kB`);
        // console.log(letterCounts(ls));
        const pl = PrefixDict.from(ls);

        console.log(`word 20: ${pl.WordList[20]}`);
        let plByteLength = JSON.stringify(pl).length;
        // console.log(`PrefixDict size: ${Math.ceil(plByteLength / 1024)}kB`);

    }
);



