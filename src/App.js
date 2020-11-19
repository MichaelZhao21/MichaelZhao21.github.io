import React from 'react';
import './App.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.name = 'Michael Zhao';
        this.nameCount = 0;
        this.nameTimer = null;
    }

    componentDidMount() {
        this.nameTimer = setInterval(() => {
            // Stop the typing if end of the string
            if (this.nameCount > this.name.length) {
                clearInterval(this.nameTimer);
                return;
            }

            // Get the substring of the current name count
            var subName = this.name.substring(0, ++this.nameCount);
            
            // LOL replace U+0020 with U+2009 if the string ends in space
            // That's because HTML doesn't display trailing spaces (U+0020)
            if (subName.endsWith(' ')) subName = subName.replace(' ', ' ');

            // Set the state to change the name typing display
            this.setState({ name: subName });
        }, 200);
    }

    render() {
        return (
            <div className="App">
                <div className="spacer"></div>
                <div className="name">{this.state.name}</div>
                <img className="earth" src="https://api.michaelzhao.xyz/images/michaelzhao/earth.png" alt=""></img>
            </div>
        );
    }
}

export default App;
