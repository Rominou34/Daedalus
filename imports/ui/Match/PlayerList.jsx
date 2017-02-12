import React, { Component, PropTypes } from 'react';

import PlayerItem from './PlayerItem.jsx';

// Task component - represents a single todo item
export default class PlayerList extends Component {
  constructor(props) {
    super(props);
  }

  renderPlayers() {
    return this.props.playerList.map((player) => (
      <PlayerItem key={player.hero_id} playerItem={player} />
    ));
  }

  render() {
    return (
      <table className="player-list">
        <thead>
          <tr>
            <th>Hero</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Assists</th>
            <th>GPM</th>
            <th>XPM</th>
          </tr>
        </thead>
        <tbody>
          {this.renderPlayers()}
        </tbody>
      </table>
    );
  }
}

PlayerList.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  playerList: PropTypes.array.isRequired,
};
