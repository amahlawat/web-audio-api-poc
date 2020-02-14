import React from 'react';

class AudioAnanlyser extends React.Component{
    constructor(props){
        super(props);
        this.state = { audioData: new Uint8Array(0) };
        this.tick = this.tick.bind(this);
    }
    componentDidMount(){
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
    }
    componentWillUnmount(){
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }
    tick(){
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.setState({ audioData: this.dataArray });
        this.rafId = requestAnimationFrame(this.tick);
    }
    render(){
        return <textarea value={this.state.audioData} />;
    }
}

export default AudioAnanlyser;