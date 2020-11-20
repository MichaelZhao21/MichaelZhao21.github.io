import React from 'react';
import './App.scss';

const STARS = 100;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.name = 'Michael Zhao';
        this.nameCount = 0;
        this.nameTimer = null;
        this.canvas = React.createRef();
        this.root = React.createRef();
    }

    resizeCanvas = () => {
        this.height = this.root.current.clientHeight;
        this.width = this.root.current.clientWidth;
		this.canvas.current.height = this.height;
        this.canvas.current.width = this.width;

        var ctx = this.canvas.current.getContext('2d');
        ctx.fillStyle = '#EEEEEE';
        for (var i = 0; i < STARS; i++) {
            ctx.fillRect(randInt(1, this.width), randInt(1, this.height), 4, 4);
        }
    }

    componentDidMount() {
        // Set background size
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas);

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
            <div className="App" ref={this.root}>
                <canvas className="background" ref={this.canvas}></canvas>
                <div className="spacer"></div>
                <div className="name">{this.state.name}</div>
                <img className="earth" src="https://api.michaelzhao.xyz/images/michaelzhao/earth.png" alt=""></img>
            </div>
        );
    }
}

/**
 * Generates a pseudorandom number in the range [min,max)
 * @param {number} min Minimum Value (inclusive)
 * @param {number} max Maximum Value (exclusive)
 */
function randInt(min, max) {
    return Math.random() * (max - min) + min;
}

export default App;
