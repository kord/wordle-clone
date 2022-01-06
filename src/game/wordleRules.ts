import {ReadOnlyDictionary} from "../words/prefixDict";

export type WordleRules = {
    wordLength: number,
    lettersOnly: boolean,
    maxGuessCount: number,
    trueWord: string,
    dictionary?: ReadOnlyDictionary,
}
const defaultWordleRules: WordleRules = {
    trueWord: '',
    maxGuessCount: 5,
    wordLength: 5,
    dictionary: undefined,
    lettersOnly: true,
}