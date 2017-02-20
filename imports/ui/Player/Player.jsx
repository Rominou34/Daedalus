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
  * Converts the Dota 2 account id to the Steam id
  * Dota 2 id is 32 bits while Steam id is 64 bits so we just convert it
  */
  getSteam64ID(account_id) {
    var s_id = Number(account_id)+61197960265728;
    var st_id = "";
    st_id += "765" + s_id;
    return st_id;
  }

  /*
  * Renders the component
  */
  render() {
    return (
      <div>
        <span>Steam ID: {this.getSteam64ID(this.props.params.player_id)}</span>
        <MatchHistory playerId={this.props.params.player_id} page={this.props.params.page}/>
      </div>
    );
  }
}

Player.propTypes = {

};

export default createContainer(() => {
    return {

    };
}, Player);
