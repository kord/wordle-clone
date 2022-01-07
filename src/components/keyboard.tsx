import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import '../css/gamePanel.css';
import '../css/keyboard.css';

interface KeyboardFunctions {
    enterCharacterFn: (c: string) => void,
    backspaceFn: VoidFunction,
    submitGuessFn: VoidFunction,
}

interface KeyboardProps {
    kbFns: KeyboardFunctions,
    correctLetters: Array<string>,
    incorrectLetters: Array<string>,
    misplacedLetters: Array<string>,
}

interface KeyboardState {
}

export class KeyboardPanel extends React.Component<KeyboardProps, KeyboardState> {
    kbLayout = {
        'default': [
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            'Z X C V B N M',
            '{backspace} {submit}',
            // ' ',
        ],
    }
    kbDisplay = {
        '{backspace}': 'backspace',
        '{submit}': 'submit',
    }

    constructor(props: KeyboardProps) {
        super(props);
    }

// componentWillMount deprecated in React 16.3
    componentDidMount() {
        window.addEventListener('keydown', this.keyPressHandler, false)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyPressHandler, false)
    }

    buttonTheme = () => {
        const ret = [];
        if (this.props.misplacedLetters.length > 0) {
            console.log(this.props.misplacedLetters, 'this.props.misplacedLetters')
            ret.push({
                class: "hg__misplaced-correct",
                buttons: this.props.misplacedLetters.join(' ').toUpperCase(),
            });
        }
        if (this.props.correctLetters.length > 0) {
            console.log(this.props.correctLetters, 'this.props.correctLetters')
            ret.push({
                class: "hg__correctly-placed-correct",
                buttons: this.props.correctLetters.join(' ').toUpperCase(),
            });
        }
        if (this.props.incorrectLetters.length > 0) {
            console.log(this.props.incorrectLetters, 'this.props.incorrectLetters')
            ret.push({
                class: "hg__incorrect",
                buttons: this.props.incorrectLetters.join(' ').toUpperCase(),
            });
        }
        // [
        //     // {
        //     //     class: "hg__misplaced-correct",
        //     //     buttons: this.props.misplacedLetters.join(' ').toUpperCase(),
        //     // },
        //     // {
        //     //     class: "hg__correctly-placed-correct",
        //     //     buttons: this.props.correctLetters.join(' ').toUpperCase(),
        //     // },
        //     {
        //         class: "hg-red",
        //         buttons: 'F f',
        //         // buttons: this.props.incorrectLetters.join(' ').toUpperCase(),
        //     }
        // ]
        return ret;
    }

    render() {
        return (
            <div className={'keyboard-panel'}>
                <Keyboard
                    // onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    layout={this.kbLayout}
                    display={this.kbDisplay}
                    // theme={"hg-theme-default hg-layout-default myTheme"}
                    buttonTheme={this.buttonTheme()}
                />
            </div>
        );
    }


    onKeyPress = (button: string) => {
        console.log("Onscreen KB Button pressed", button);
        if (button === '{submit}') {
            this.props.kbFns.submitGuessFn();
        } else if (button === '{backspace}') {
            this.props.kbFns.backspaceFn();
        } else {
            this.props.kbFns.enterCharacterFn(button);
        }
    }

    keyPressHandler = (e: KeyboardEvent) => {
        console.log(`"${e.key}" pressed`);

        if (e.key.length === 1) {
            this.props.kbFns.enterCharacterFn(e.key);
        } else if (e.key === 'Backspace') {
            this.props.kbFns.backspaceFn();
        } else if (e.key === 'Enter') {
            this.props.kbFns.submitGuessFn();
        }
    }


}

export default KeyboardPanel;