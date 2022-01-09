import {ReadOnlyDictionary} from "../words/prefixDict";
import {permissiveDicts, randomCommonWordByLength} from "../words/wordProcessing";
import {WordleGame} from "./wordle";

export type WordleRules = {
    wordLength: number,
    lettersOnly: boolean,
    maxGuessCount: number,
    goalWord: string,
    dictionary?: ReadOnlyDictionary,
}

const defaultWordLength = 5;

const defaultWordleRules: WordleRules = {
    goalWord: '',
    maxGuessCount: 6,
    wordLength: defaultWordLength,
    dictionary: permissiveDicts[defaultWordLength],
    lettersOnly: true,
}

export function getRandomWordleGame(wordLength: number) {
    const rules = {
        ...defaultWordleRules,
        wordLength: wordLength,
        dictionary: permissiveDicts[wordLength],
        maxGuessCount: Math.min(wordLength + 1, 6),
        goalWord: randomCommonWordByLength(wordLength),
    }
    console.log(`Secret word: ${rules.goalWord}`)
    return new WordleGame(rules)
}