import {ReadOnlyDictionary} from "../words/prefixDict";
import {commonWordsByLength, permissiveDicts, randomCommonWordByLength} from "../words/wordProcessing";
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

export function getRandomWordleGame() {
    const validWordCount = commonWordsByLength[defaultWordleRules.wordLength];
    Math.random()
    const rules = {
        ...defaultWordleRules,
        goalWord: randomCommonWordByLength(defaultWordleRules.wordLength),
    }
    console.log(`Secret word: ${rules.goalWord}`)
    return new WordleGame(rules)
}