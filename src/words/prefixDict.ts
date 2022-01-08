export interface ReadOnlyDictionary {
    hasWord(word: string): boolean,

    Size: number,
}

export class PrefixDict implements ReadOnlyDictionary {
    private firstLetter: Map<string, PrefixDict>;
    private isWord = false;

    constructor() {
        this.firstLetter = new Map<string, PrefixDict>();
    }

    /**
     * Get all the words
     * @constructor
     */
    get WordList(): Array<string> {
        // If this terminates a word, we return the empty word here.
        const ls = this.isWord ? [''] : [];
        this.firstLetter.forEach((v, prefix) => {
            v.WordList.forEach(w => ls.push(prefix + w));
        });
        return ls;
    }

    /**
     * Build a PrefixDict from a list of arbitrary words.
     * @param words
     */
    static from(words: Array<string>) {
        // console.log(`Making PrefixDict for ${words.length} words...`);
        const ret = new PrefixDict();
        words.forEach(w => ret.addWord(w));
        return ret;
    }

    /**
     * Scan through a PrefixDict to check whether a particular word is in it.
     * @param word
     */
    public hasWord(word: string): boolean {
        let currdict: PrefixDict = this;
        for (let i = 0; i < word.length; i += 1) {
            const currletter = word[i];
            if (currdict && currdict.firstLetter.has(currletter)) {
                currdict = currdict.firstLetter.get(currletter)!;
            } else return false;
        }
        return currdict.isWord;
    }

    // How many words are in the dictionary.
    public get Size(): number {
        let tot = 0;
        this.firstLetter.forEach(v => tot += v.Size);
        return tot + (this.isWord ? 1 : 0);
    }

    /**
     * Add a single word to this PrefixDict
     * @param word
     */
    public addWord(word: string) {
        const l = word.length;
        if (l === 0) {
            this.isWord = true;
            return;
        }
        const firstLetter = word[0];
        const remainder = word.substring(1);
        if (this.firstLetter.has(firstLetter)) {
            this.firstLetter.get(firstLetter)!.addWord(remainder);
        } else {
            const subdict = new PrefixDict();
            subdict.addWord(remainder);
            this.firstLetter.set(firstLetter, subdict);
        }
    }

    // public toString() : string {
    //     return JSON.stringify(this.firstLetter)
    // }
}