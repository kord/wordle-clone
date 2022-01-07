import React from 'react';
import {WordleGame} from "../game/wordle";
import {GuessPanel} from "./guessPanel";
import {WordleGameController} from "../game/gameController";

interface GamePanelProps {
}

interface GamePanelState {
    gameController: WordleGameController,
}

class GamePanel extends React.Component<GamePanelProps, GamePanelState> {
    constructor(props: GamePanelProps) {
        super(props);
        let gameController = new WordleGameController();
        this.state = {gameController: gameController};

    }


    restartGame = (game?: WordleGame) => {
        // this.state.gameController.setRefreshFn(this.forceUpdate)
        this.state.gameController.startRandomGame();
        this.forceUpdate()
    }

    render() {
        return (
            <div onKeyDown={this.keyPressHandler}>
                <div className={'new-game-button'}
                     onClick={() => this.restartGame()}>New Game
                </div>
                <div className={'help-button'}>Help</div>

                <div className={'gameplay-items'}>
                    <GuessPanel gameState={this.state.gameController.gameState}/>
                    <div className={'keyboard-panel'}>Keyboard here</div>
                </div>
            </div>
        );
    }

    private keyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(`${e.key} pressed`);

    }
}

export default GamePanel;