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
            <div>
                Guesses go here
            </div>
        );
    }
}