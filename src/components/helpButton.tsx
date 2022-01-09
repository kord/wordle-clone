import React, {Component} from 'react';
import Swal from "sweetalert2";
import '../css/helpPanel.css';


class HelpButton extends Component {

    popper = () => {
        Swal.fire({
            title: 'Rules',
            html: `
<p>Guess the word in 6 tries.</p>
<p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
<p>Letters show up <span class="help-panel__correct ">green</span> if they're in the right spot...</p>
<p>and <span class="help-panel__misplaced-correct">yellow</span> if they're in the word but misplaced in your guess.</p>
`,
            icon: 'info',
            confirmButtonText: 'OK'
        })
    }

    render() {
        return (
            <div className={'help-button'}
                 onClick={this.popper}>
                Help
            </div>
        );
    }
}

export default HelpButton;