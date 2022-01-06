import {WordleRules} from "./wordleRules";

type WordleGuessResult = {
    validGuess: boolean,
    guessedWord: string,
    correctlyPlacedCorrectLetters: Array<number>,
    misplacedCorrectLetters: Array<number>,
    usedGuesses: number,
}

export class WordleGameLogic {
    private static invalidGuessPartial = {
        validGuess: false,
        correctlyPlacedCorrectLetters: [],
        misplacedCorrectLetters: [],
    };

    private guessResults: Array<WordleGuessResult> = new Array<WordleGuessResult>();
    private completedGuesses: number;

    constructor(public rules: WordleRules) {
        if (rules.trueWord.length !== rules.wordLength) throw new Error(`Wrong wordlength for WordleGameLogic init.`);
        this.completedGuesses = 0;
    }

    public performGuess(guess: string): WordleGuessResult {
        const wordTooLong = guess.length !== this.rules.wordLength;
        const noGuessesLeft = this.completedGuesses === this.rules.maxGuessCount;
        if (wordTooLong || noGuessesLeft) return {
            guessedWord: guess,
            usedGuesses: this.completedGuesses,
            ...WordleGameLogic.invalidGuessPartial
        };

        let correctlyPlacedCorrectLetters = [];
        for (let i = 0; i < this.rules.wordLength; i += 1) {
            if (guess[i] === this.rules.trueWord[i])
                correctlyPlacedCorrectLetters.push(i);
        }
        let trueExcludingCorrect = this.rules.trueWord.split('');
        let guessExcludingCorrect = guess.split('');
        correctlyPlacedCorrectLetters.forEach(loc => {
            trueExcludingCorrect[loc] = '';
            guessExcludingCorrect[loc] = ''
        });

        let misplacedCorrectLetters = [];
        for (let i = 0; i < this.rules.wordLength; i += 1) {
            const guessedLetter = guessExcludingCorrect[i];
            // Skip if we've already edited the guess letter out.
            if (guessedLetter.length != 1) continue;

            let found = false;
            let foundLoc = -1;
            for (let j = 0; j < trueExcludingCorrect.length; j += 1) {
                if (trueExcludingCorrect[j] === guessedLetter) {
                    found = true;
                    foundLoc = j;
                    break;
                }
            }
            if (found) {
                misplacedCorrectLetters.push(i);
                // Cipher out the found misplaced letter so we don't match it again.
                trueExcludingCorrect[foundLoc] = '';
            }
        }

        this.completedGuesses += 1;
        return {
            validGuess: true,
            usedGuesses: this.completedGuesses,
            guessedWord: guess,
            correctlyPlacedCorrectLetters: correctlyPlacedCorrectLetters,
            misplacedCorrectLetters: misplacedCorrectLetters,
        }
    }
}