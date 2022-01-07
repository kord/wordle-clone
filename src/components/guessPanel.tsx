import React from "react";
import {EntryBoxState, LetterStatus, RowState, RowStatus, WordleGameState} from "../game/gameState";
import '../css/guessPanel.css';

interface GuessPanelProps {
    gameState: WordleGameState,
}

interface GuessPanelState {
}

export class GuessPanel extends React.Component<GuessPanelProps, GuessPanelState> {
    constructor(props: GuessPanelProps) {
        super(props);
        this.state = {};
    }

    makeLetter = (letter: EntryBoxState, letternum: number) => {
        const classes = ['entry-box'];
        switch (letter.letterStatus) {
            case LetterStatus.INCORRECT_LETTER:
                classes.push('entry-box__incorrect');
                break;
            case LetterStatus.CORRECTLY_PLACED_CORRECT_LETTER:
                classes.push('entry-box__correctly-placed-correct');
                break;
            case LetterStatus.MISPLACED_CORRECT_LETTER:
                classes.push('entry-box__misplaced-correct');
                break;
            case LetterStatus.GUESS_IN_PROGRESS_LETTER:
                classes.push('entry-box__in-progress');
                break;
            case LetterStatus.FUTURE_UNUSED_LETTER:
                classes.push('entry-box__unused');
                break;
        }
        if (letter.isCurrentEntryBox) classes.push('entry-box__selected');

        return <div key={`letter-${letternum}`} className={classes.join(' ')}>
            {letter.entryBoxContent}
        </div>

    }

    makeRow = (row: RowState, rownum: number) => {
        const classes = ['guess-row'];
        switch (row.rowState) {
            case RowStatus.COMPLETED_LOCKED_IN_ROW:
                classes.push('guess-row__completed');
                break;
            case RowStatus.FUTURE_UNUSED_ROW:
                classes.push('guess-row__unused');
                break;
            case RowStatus.GUESS_IN_PROGRESS_ROW:
                classes.push('guess-row__in-progress');
                break;
        }
        return <div key={`row-${rownum}`} className={classes.join(' ')}>
            {row.letters.map(this.makeLetter)}
        </div>
    }

    render() {
        return (
            <div className={'guess-panel'}>
                {this.props.gameState.guessRows.map(this.makeRow)}
            </div>
        );
    }
}