
import React from 'react';
import './Loader.css';

class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { visible: false };
        this.showLoader = this.showLoader.bind(this);
    }

    showLoader(status) {
        this.setState({ visible: status });
    }

    render () {
        return (
            <div id="loader"
                className={`float-right ${ this.state.visible ? '' : 'd-none' }`}>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <p>Loading...</p>
            </div>
        );
    }
}

export default Loader;