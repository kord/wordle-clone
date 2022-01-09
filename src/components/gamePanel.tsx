import React, {ChangeEvent} from 'react';
import {GuessPanel} from "./guessPanel";
import {ControllerFunctions, WordleGameController} from "../game/gameController";
import 'react-simple-keyboard/build/css/index.css';
import '../css/gamePanel.css';
import {KeyboardPanel} from "./keyboard";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {SuccessPanel} from "./successPanel";
import HelpButton from "./helpButton";

interface GamePanelProps {
}

interface GamePanelState {
    gameController: WordleGameController,
    wordLengthChoice: number,
}

class GamePanel extends React.Component<GamePanelProps, GamePanelState> {
    constructor(props: GamePanelProps) {
        super(props);
        let gameController = new WordleGameController();
        this.state = {
            gameController: gameController,
            wordLengthChoice: 5,
        };

    }


    restartGame = () => {
        const fns: ControllerFunctions = {
            refreshFn: () => {
                this.forceUpdate();
            },
            submitFailFn: msg => {
                toast.error(msg);
            },
        }
        this.state.gameController.setControllerFns(fns)
        this.state.gameController.startRandomGame(this.state.wordLengthChoice);
        toast.info('Good Luck!', {
            autoClose: 2000,
            hideProgressBar: true,
        });
        this.forceUpdate()
    }


    kbFunctions = () => {
        return {
            backspaceFn: this.state.gameController.backspace,
            enterCharacterFn: this.state.gameController.enterCharacter,
            submitGuessFn: this.state.gameController.submitGuess,
        }
    }

    onChangeWordLengthChoice = (e: ChangeEvent<HTMLSelectElement>) => {
        const wordLengthChoice = Number.parseInt(e.target.value);
        this.setState({wordLengthChoice: wordLengthChoice});
    }

    render() {
        return (
            <div>

                {/*<div className={'new-game-button'}>*/}
                <div className={'new-game-button'}
                     onClick={() => this.restartGame()}>
                    New Game
                </div>

                <div className={'word-length'}>
                    Word Length&nbsp;
                    <select className={"word-length__select"} id={"wordLengthChoice"}
                            value={this.state.wordLengthChoice} onChange={this.onChangeWordLengthChoice}>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>

                {/*<p className={'new-game-item'}*/}
                {/*   onClick={() => this.restartGame(4)}>*/}
                {/*    New Game 4*/}
                {/*</p>*/}
                {/*<p className={'new-game-item'}*/}
                {/*   onClick={() => this.restartGame(5)}>*/}
                {/*    New Game 5*/}
                {/*</p>*/}
                {/*<p className={'new-game-item'}*/}
                {/*   onClick={() => this.restartGame(6)}>*/}
                {/*    New Game 6*/}
                {/*</p>*/}
                {/*<p className={'new-game-item'}*/}
                {/*   onClick={() => this.restartGame(7)}>*/}
                {/*    New Game 7*/}
                {/*</p>*/}
                {/*</div>*/}
                <HelpButton/>
                <div className={'toaster'}>
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
                </div>

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