import {ReadOnlyDictionary} from "../words/prefixDict";
import {prefixDictByLength, randomWordByLength, wordsByLength} from "../words/wordProcessing";
import {WordleGame} from "./wordle";

export type WordleRules = {
    wordLength: number,
    lettersOnly: boolean,
    maxGuessCount: number,
    trueWord: string,
    dictionary?: ReadOnlyDictionary,
}

export const defaultWordleRules: WordleRules = {
    trueWord: '',
    maxGuessCount: 6,
    wordLength: 5,
    dictionary: prefixDictByLength[5],
    lettersOnly: true,
}

export function getRandomWordleGame() {
    const validWordCount = wordsByLength[defaultWordleRules.wordLength];
    Math.random()
    const rules = {
        ...defaultWordleRules,
        trueWord: randomWordByLength(defaultWordleRules.wordLength)
    }
    return new WordleGame(rules)
}