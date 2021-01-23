import React from 'react';
import './App.scss';
import data from './data.json';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        for (var i = 0; i < data.stars; i++) {
            ctx.fillRect(randInt(1, this.width), randInt(1, this.height), 4, 4);
        }
    };

    componentDidMount() {
        // Set background size
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas);

        this.nameTimer = setInterval(() => {
            // Stop the typing if end of the string
            if (this.nameCount > data.name.length) {
                clearInterval(this.nameTimer);
                return;
            }

            // Get the substring of the current name count
            var subName = data.name.substring(0, ++this.nameCount);

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
                <div className="info">
                    <div className="info-item about">{data.about}</div>
                    <div className="info-item earth-spacer">
                        <img
                            className="earth"
                            src="https://api.michaelzhao.xyz/images/michaelzhao/earth.png"
                            alt=""
                        ></img>
                    </div>
                    <div className="info-item links">
                        <a href={data.email}>Email</a><br />
                        <a href={data.github}>Github</a><br />
                        <a href={data.linkedin}>Linkedin</a><br />
                    </div>
                </div>
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
