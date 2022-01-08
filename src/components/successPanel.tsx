import React from "react";
import {GameStatus, WordleGameState} from "../game/gameState";
import '../css/successPanel.css';

interface SuccessPanelProps {
    gameState: WordleGameState,
}

interface SuccessPanelState {
}

export class SuccessPanel extends React.Component<SuccessPanelProps, SuccessPanelState> {
    constructor(props: SuccessPanelProps) {
        super(props);
        this.state = {};
    }

    render() {
        switch (this.props.gameState.gameStatus) {
            case GameStatus.GAME_UNSTARTED:
                return <div className={'success-panel'}/>
            case GameStatus.GAME_IN_PROGRESS:
                return <div className={'success-panel'}/>
            case GameStatus.GAME_FAILURE:
                return <div className={'success-panel success-panel__failure'}>
                    Better luck next time. The word was "{this.props.gameState.goalWord.toUpperCase()}".
                </div>
            case GameStatus.GAME_SUCCESS:
                return <div className={'success-panel success-panel__success'}>
                    You win!
                </div>
        }
        return <></>;
    }
}