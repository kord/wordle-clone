import {WordleRules} from "./wordleRules";


export enum WordleGuessErrorCode {
    OK,
    GUESS_WRONG_LENGTH,
    GAME_ALREADY_OVER,
    NOT_IN_DICT
}

export type WordleGuessResult = {
    errorCode: WordleGuessErrorCode,
    guessedWord: string,
    correctlyPlacedCorrectLetters: Array<number>,
    misplacedCorrectLetters: Array<number>,
    usedGuesses: number,
}

export class WordleGame {
    private static invalidGuessPartial = {
        correctlyPlacedCorrectLetters: [],
        misplacedCorrectLetters: [],
    };

    private guessResults: Array<WordleGuessResult>;
    gameIsOver: boolean;
    gameSuccess: boolean;
    gameFailed: boolean;

    constructor(public rules: WordleRules) {
        if (rules.trueWord.length !== rules.wordLength) throw new Error(`Wrong wordlength for WordleGameLogic init.`);
        if (rules.maxGuessCount < 2) throw new Error(`maxGuessCount must be at least 2.`);

        this.guessResults = new Array<WordleGuessResult>();
        this.gameIsOver = false;
        this.gameSuccess = false;
        this.gameFailed = false;
    }

    get completedGuesses(): number {
        return this.guessResults.length;
    }

    public performGuess(guess: string): WordleGuessResult {
        const wordTooLong = guess.length !== this.rules.wordLength;
        const noGuessesLeft = this.completedGuesses === this.rules.maxGuessCount;
        const notInDict = this.rules.dictionary && !this.rules.dictionary.hasWord(guess);
        if (wordTooLong) return {
            guessedWord: guess,
            errorCode: WordleGuessErrorCode.GUESS_WRONG_LENGTH,
            usedGuesses: this.completedGuesses,
            ...WordleGame.invalidGuessPartial
        };
        if (this.gameIsOver)
            return {
                guessedWord: guess,
                errorCode: WordleGuessErrorCode.GAME_ALREADY_OVER,
                usedGuesses: this.completedGuesses,
                ...WordleGame.invalidGuessPartial
            };
        if (notInDict) return {
            guessedWord: guess,
            errorCode: WordleGuessErrorCode.NOT_IN_DICT,
            usedGuesses: this.completedGuesses,
            ...WordleGame.invalidGuessPartial
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

        const guessResult: WordleGuessResult = {
            errorCode: WordleGuessErrorCode.OK,
            usedGuesses: this.completedGuesses + 1,
            guessedWord: guess,
            correctlyPlacedCorrectLetters: correctlyPlacedCorrectLetters,
            misplacedCorrectLetters: misplacedCorrectLetters,
        }
        this.guessResults.push(guessResult);

        // Check if the game is over.
        if (correctlyPlacedCorrectLetters.length === this.rules.wordLength) {
            this.gameIsOver = true;
            this.gameSuccess = true;
        } else if (this.completedGuesses === this.rules.maxGuessCount) {
            this.gameIsOver = true;
            this.gameFailed = true;
        }
        return guessResult;
    }
}

