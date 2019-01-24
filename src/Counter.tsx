// @ts-ignore
import eases from 'eases';
import React, { Component } from 'react';
import { Text } from 'react-native';

interface IProps {
  start?: number;
  end: number;
  digits?: number;
  time?: number;
  easing?: string;
  template?: (value: string) => string;
  onComplete?: () => void;
  style?: (value: number) => any | any;
}

interface IState {
  value: number;
}

export default class Counter extends Component<IProps, IState> {
  static defaultProps = {
    digits: 0,
    easing: 'linear',
    start: 0,
    time: 1000,
  };

  state = { value: this.props.start } as IState;

  private startTime = 0;
  private stop: any;

  componentDidMount = () => {
    this.startTime = Date.now();
    requestAnimationFrame(this.animate);
  };

  animate = () => {
    const { onComplete } = this.props;

    if (this.stop) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    requestAnimationFrame(this.animate);
    this.draw();
  };

  draw = () => {
    const { time = 1000, start = 0, end, easing } = this.props;

    const now = Date.now();
    if (now - this.startTime >= time) {
      this.stop = true;
    }
    const percentage = Math.min((now - this.startTime) / time, 1);
    const easeVal = eases[easing](percentage);
    const value = start + (end - start) * easeVal;

    this.setState({ value } as IState);
  };

  render = () => {
    const { digits, style } = this.props;
    const { value = 0 } = this.state;

    const toFixed = value.toFixed(digits);

    return (
      <Text style={typeof style === 'function' ? style(value) : style}>
        {this.props.template ? this.props.template(toFixed) : toFixed}
      </Text>
    );
  };
}
