import React from "react";

interface GuessPanelProps {
}

interface GuessPanelState {
}

export class GuessPanel extends React.Component<GuessPanelProps, GuessPanelState> {
    constructor(props: GuessPanelProps) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className={'guess-panel'}>
                Guesses go here
            </div>
        );
    }
}