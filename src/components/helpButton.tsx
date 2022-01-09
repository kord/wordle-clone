import React, {Component} from 'react';
import Swal from "sweetalert2";

class HelpButton extends Component {

    popper = () => {
        Swal.fire({
            title: 'Rules',
            text: 'There is a secret word. Try to guess it',
            icon: 'error',
            confirmButtonText: 'Cool'
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