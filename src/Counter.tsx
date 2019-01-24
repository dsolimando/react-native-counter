import React, {Component} from 'react';
import {Text} from 'react-native';
// @ts-ignore
import eases from 'eases';

interface Props {
    start?: number;
    end: number;
    digits?: number;
    time?: number;
    easing?: string;
    onComplete?: () => void;
    style?: any;
}

export default class Counter extends Component<Props> {

    static defaultProps = {
        start: 0,
        digits: 0,
        time: 1000,
        easing: 'linear',
    };

    state = {value: this.props.start};

    private startTime = 0;
    private stop: any;

    componentDidMount = () => {
        this.startTime = Date.now();
        requestAnimationFrame(this.animate);
    };

    animate = () => {
        const {onComplete} = this.props;

        if (this.stop) {
            if (onComplete) onComplete();
            return;
        }

        requestAnimationFrame(this.animate);
        this.draw();
    };

    draw = () => {
        const {time = 1000, start = 0, end, easing} = this.props;

        const now = Date.now();
        if (now - this.startTime >= time) this.stop = true;
        const percentage = Math.min((now - this.startTime) / time, 1);
        const easeVal = eases[easing](percentage);
        const value = start + (end - start) * easeVal;

        this.setState({value});
    };

    render = () => {
        const {digits, style} = this.props;
        const {value = 0} = this.state;

        return (
            <Text style={style}>{value.toFixed(digits)}</Text>
        );
    };
}
