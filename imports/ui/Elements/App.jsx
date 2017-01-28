import React, { Component } from 'react';
import { MatchShort } from '../../api/MatchShort.js';
import { Matches } from '../../api/Matches.js';

export default class App extends React.Component {
  test() {
    console.log(MatchShort.find().fetch());
    return;
  }
  render() {
    return (
      <div>{this.props.children}</div>

    );
  }
}
