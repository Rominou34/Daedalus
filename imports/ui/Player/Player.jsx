import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import MatchHistory from './MatchHistory.jsx';
import './Player.css';

import { Matches } from '../../api/Matches.js';
import { MatchShort } from '../../api/MatchShort.js';

// MatchHistory component - Represents the list of the last matches played by the player

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: 0
    };
  }

  /*
  * Renders the component
  */
  render() {
    return (
      <MatchHistory playerId={this.props.params.player_id} />
    );
  }
}

Player.propTypes = {

};

export default createContainer(() => {
    return {

    };
}, Player);
