export enum RowStatus {
    COMPLETED_LOCKED_IN_ROW,
    GUESS_IN_PROGRESS_ROW,
    FUTURE_UNUSED_ROW,
}

export enum LetterStatus {
    INCORRECT_LETTER,
    CORRECTLY_PLACED_CORRECT_LETTER,
    MISPLACED_CORRECT_LETTER,
    GUESS_IN_PROGRESS_LETTER,
    FUTURE_UNUSED_LETTER,
}

export type EntryBoxState = {
    isCurrentEntryBox: boolean,
    entryBoxContent: string,
    rowStatus: RowStatus,
    letterStatus: LetterStatus,
}
export type RowState = {
    rowState: RowStatus,
    letters: EntryBoxState[],
}

export enum GameStatus {
    GAME_UNSTARTED,
    GAME_IN_PROGRESS,
    GAME_SUCCESS,
    GAME_FAILURE,
}

export type WordleGameState = {
    guessRows: RowState[],
    gameStatus: GameStatus,
    correctLetters: Array<string>;
    incorrectLetters: Array<string>;
    misplacedLetters: Array<string>;
}

// Just to make the default easier to read.
function defaultBox(char: string) {
    return {
        entryBoxContent: char,
        isCurrentEntryBox: false,
        letterStatus: LetterStatus.CORRECTLY_PLACED_CORRECT_LETTER,
        rowStatus: RowStatus.COMPLETED_LOCKED_IN_ROW,
    }
}

export const defaultEmptyGameState: WordleGameState = {
    gameStatus: GameStatus.GAME_UNSTARTED,
    guessRows: [{
        rowState: RowStatus.COMPLETED_LOCKED_IN_ROW,
        letters: 'wordle'.split('').map(char => defaultBox(char)),
    },],
    correctLetters: [],
    incorrectLetters: [],
    misplacedLetters: [],
}