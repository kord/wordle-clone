import React from 'react';
import {WordleGame} from "../game/wordle";
import {GuessPanel} from "./guessPanel";
import {ControllerFunctions, WordleGameController} from "../game/gameController";
import 'react-simple-keyboard/build/css/index.css';
import '../css/gamePanel.css';
import {KeyboardPanel} from "./keyboard";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {SuccessPanel} from "./successPanel";

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
        const fns: ControllerFunctions = {
            refreshFn: () => {
                this.forceUpdate();
            },
            submitFailFn: msg => {
                toast.error(msg);
            },
        }
        this.state.gameController.setControllerFns(fns)
        this.state.gameController.startRandomGame();
        this.forceUpdate()
    }


    kbFunctions = () => {
        return {
            backspaceFn: this.state.gameController.backspace,
            enterCharacterFn: this.state.gameController.enterCharacter,
            submitGuessFn: this.state.gameController.submitGuess,
        }
    }

    render() {
        return (
            <div>
                <div className={'new-game-button'}
                     onClick={() => this.restartGame()}>New Game
                </div>
                <div className={'help-button'}>Help</div>
                <ToastContainer
                    position="top-center"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                />

                <div className={'gameplay-items'}>
                    <div className={'spacer-panel'}></div>
                    <GuessPanel gameState={this.state.gameController.gameState}/>
                    <SuccessPanel gameState={this.state.gameController.gameState}/>
                    <KeyboardPanel
                        kbFns={this.kbFunctions()}
                        correctLetters={this.state.gameController.gameState.correctLetters}
                        incorrectLetters={this.state.gameController.gameState.incorrectLetters}
                        misplacedLetters={this.state.gameController.gameState.misplacedLetters}
                    />
                </div>
            </div>
        );
    }


}

export default GamePanel;