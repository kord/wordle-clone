import {WordleGame, WordleGuessErrorCode, WordleGuessResult} from "./wordle";
import {getRandomWordleGame} from "./wordleRules";
import {justLetters} from "../words/wordProcessing";
import {defaultEmptyGameState, GameStatus, LetterStatus, RowState, RowStatus, WordleGameState} from "./gameState";

export class WordleGameController {
    currentGame?: WordleGame;
    caretLoc: number;
    guessText: Array<string>;
    refreshFn?: VoidFunction;
    completedGuesses: Array<WordleGuessResult>;
    // Refresh causes an update of this, which can be read out for free at any time.
    gameState: WordleGameState;

    constructor() {
        this.caretLoc = 0;
        this.guessText = new Array<string>();
        this.completedGuesses = new Array<WordleGuessResult>();
        this.gameState = defaultEmptyGameState;
    }

    setRefreshFn(refreshFn: VoidFunction) {
        this.refreshFn = refreshFn;
    }

    refresh() {
        if (!this.currentGame) {
            console.error(`No current game, so you can't refresh anything.`);
            return;
        }

        let gameStatus: GameStatus = GameStatus.GAME_UNSTARTED;
        if (this.currentGame?.gameIsOver) {
            if (this.currentGame.gameFailed) gameStatus = GameStatus.GAME_FAILURE;
            if (this.currentGame.gameSuccess) gameStatus = GameStatus.GAME_SUCCESS;
        } else {
            gameStatus = GameStatus.GAME_IN_PROGRESS;
        }
        if (!this.currentGame) gameStatus = GameStatus.GAME_UNSTARTED;

        // Rows of completed guesses.
        let guessRows: RowState[] = this.completedGuesses.map(guess => {
            return {
                rowState: RowStatus.COMPLETED_LOCKED_IN_ROW,
                letters: guess.guessedWord.split('').map((letter, i) => {
                    let letterStatus: LetterStatus = LetterStatus.INCORRECT_LETTER;
                    if (guess.misplacedCorrectLetters.some(gi => gi === i)) letterStatus = LetterStatus.MISPLACED_CORRECT_LETTER;
                    if (guess.correctlyPlacedCorrectLetters.some(gi => gi === i)) letterStatus = LetterStatus.CORRECTLY_PLACED_CORRECT_LETTER;
                    return {
                        rowStatus: RowStatus.COMPLETED_LOCKED_IN_ROW,
                        letterStatus: letterStatus,
                        isCurrentEntryBox: false,
                        entryBoxContent: letter,
                    }
                })
            }
        });
        // Push the current guess row if the game is in progress.
        if (gameStatus === GameStatus.GAME_IN_PROGRESS)
            guessRows.push({
                rowState: RowStatus.GUESS_IN_PROGRESS_ROW,
                letters: this.guessText.map((letter, i) => {
                    return {
                        entryBoxContent: letter,
                        isCurrentEntryBox: this.caretLoc === i,
                        letterStatus: LetterStatus.GUESS_IN_PROGRESS_LETTER,
                        rowStatus: RowStatus.GUESS_IN_PROGRESS_ROW,
                    }
                })
            });
        // Push dummy empty rows for later untaken guesses.
        while (guessRows.length < this.currentGame?.rules.maxGuessCount) {
            guessRows.push({
                rowState: RowStatus.FUTURE_UNUSED_ROW,
                letters: this.currentGame.rules.trueWord.split('').map(letter => {
                    return {
                        rowStatus: RowStatus.FUTURE_UNUSED_ROW,
                        letterStatus: LetterStatus.FUTURE_UNUSED_LETTER,
                        isCurrentEntryBox: false,
                        entryBoxContent: ' '
                    };
                }),
            });
        }

        this.gameState = {
            gameStatus: gameStatus,
            guessRows: guessRows,
        }

        // Ask for the newly calculated game state to get displayed.
        if (this.refreshFn) this.refreshFn();
    }

    startRandomGame() {
        this.currentGame = getRandomWordleGame();
        this.clearGuess(true);
        this.completedGuesses = new Array<WordleGuessResult>();
        this.refresh();
    }

    // moveCaret(loc: number, suppressRefresh = false) {
    //     if (!this.currentGame || loc < 0 || loc >= this.currentGame.rules.wordLength) {
    //         console.error(`${loc} invalid caret location now`);
    //         return;
    //     }
    //     if (this.caretLoc != loc) {
    //         this.caretLoc = loc;
    //         if (!suppressRefresh) this.refresh();
    //     }
    //
    // }

    enterCharacter(char: string, suppressRefresh = false) {
        if (!this.currentGame) {
            console.error(`No current game, so you can't enter a character.`);
            return;
        }
        if (this.currentGame.gameIsOver) {
            console.error(`Game is finished, so you can't enter a character.`)
            return;
        }
        if (char.length !== 1) {
            console.error(`Input needs to be one character at a time, not "${char}"`);
            return;
        }
        if (this.currentGame.rules.lettersOnly && !justLetters(char)) {
            console.error(`Input needs to be regular letters, not "${char}"`);
            return;
        }
        if (this.caretLoc >= this.currentGame.rules.wordLength) {
            console.error(`Words are only ${this.currentGame.rules.wordLength} letters long.`);
            return;
        }

        this.guessText[this.caretLoc] = char;
        this.caretLoc += 1;
        if (!suppressRefresh) this.refresh();
    }

    backspace(suppressRefresh = false) {
        if (!this.currentGame) {
            console.error(`No current game, so you can't backspace.`);
            return;
        }
        if (this.currentGame.gameIsOver) {
            console.error(`Game is finished, so you can't backspace.`)
            return;
        }
        if (this.caretLoc === 0) {
            console.error(`Guess input is already blank.`)
            return;
        }

        this.caretLoc -= 1;
        this.guessText[this.caretLoc] = '';
        if (!suppressRefresh) this.refresh();
    }

    submitGuess(suppressRefresh = false) {
        if (!this.currentGame) {
            console.error(`No current game, so you can't submit a guess.`);
            return;
        }
        const guess = this.guessText.join('');
        const result = this.currentGame.performGuess(guess);

        switch (result.errorCode) {
            case WordleGuessErrorCode.OK:
                this.clearGuess(true);
                this.completedGuesses.push(result);
                break;
            default:
                console.error(`There was an error: ${result}`);
                break;
        }

        if (!suppressRefresh) this.refresh();
    }

    clearGuess(suppressRefresh = false) {
        if (!this.currentGame) {
            console.error(`No current game, so you can't clear a guess.`);
            return;
        }

        this.guessText = new Array<string>();
        for (let i = 0; i < this.currentGame.rules.wordLength; i += 1)
            this.guessText.push('');
        this.caretLoc = 0;

        if (!suppressRefresh) this.refresh();
    }
}