import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Matches } from '../../api/Matches.js';

// MatchHistory component - Represents the list of the last matches played by the player
export default class Match extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Match {this.props.params.match_id}</h1>
        <div>

        </div>
      </div>
    );
  }
}
