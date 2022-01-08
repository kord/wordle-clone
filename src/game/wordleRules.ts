import {ReadOnlyDictionary} from "../words/prefixDict";
import {commonWordsByLength, permissiveDicts, randomCommonWordByLength} from "../words/wordProcessing";
import {WordleGame} from "./wordle";

export type WordleRules = {
    wordLength: number,
    lettersOnly: boolean,
    maxGuessCount: number,
    trueWord: string,
    dictionary?: ReadOnlyDictionary,
}

const defaultWordLength = 5;

export const defaultWordleRules: WordleRules = {
    trueWord: '',
    maxGuessCount: 6,
    wordLength: defaultWordLength,
    dictionary: permissiveDicts[defaultWordLength],
    lettersOnly: true,
}

export function getRandomWordleGame() {
    const validWordCount = commonWordsByLength[defaultWordleRules.wordLength];
    Math.random()
    const rules = {
        ...defaultWordleRules,
        trueWord: randomCommonWordByLength(defaultWordleRules.wordLength),
    }
    console.log(`Secret word: ${rules.trueWord}`)
    return new WordleGame(rules)
}