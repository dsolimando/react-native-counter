import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  Counter  from './Counter';

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Counter end={1000} template={(value) => `Hello ${value}`} style={ val => val > 500?{color:'red'}:{}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
