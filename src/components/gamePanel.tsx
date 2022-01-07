import React from 'react';
import {WordleGame} from "../game/wordle";
import {GuessPanel} from "./guessPanel";
import {getRandomWordleGame} from "../game/wordleRules";
import {WordleGameController} from "../game/gameController";

interface GamePanelProps {
}

interface GamePanelState {
    activeGame?: WordleGame,
    gameController: WordleGameController,
}

class GamePanel extends React.Component<GamePanelProps, GamePanelState> {
    constructor(props: GamePanelProps) {
        super(props);
        this.state = {gameController: new WordleGameController()};

    }


    restartGame = (game?: WordleGame) => {
        this.setState({activeGame: game || getRandomWordleGame()});
    }

    render() {
        return (
            <div>
                <div className={'new-game-button'}
                     onClick={() => this.restartGame()}>New Game
                </div>
                <div className={'help-button'}>Help</div>

                <div className={'gameplay-items'}>
                    <GuessPanel/>
                    <div className={'keyboard-panel'}>Keyboard here</div>
                </div>
            </div>
        );
    }
}

export default GamePanel;