import React from 'react';
import {WordleGame} from "../game/wordle";
import {GuessPanel} from "./guessPanel";
import {getRandomWordleGame} from "../game/wordleRules";

interface GamePanelProps {
}

interface GamePanelState {
    activeGame?: WordleGame,
}

class GamePanel extends React.Component<GamePanelProps, GamePanelState> {
    constructor(props: GamePanelProps) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div>
                <div className={'new-game-button'}
                     onClick={() => this.setState({activeGame: getRandomWordleGame()})}>New Game
                </div>
                <div className={'help-button'}>Help</div>

                <GuessPanel/>

                <div>Keyboard here</div>

            </div>
        );
    }
}

export default GamePanel;