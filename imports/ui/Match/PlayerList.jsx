import React, { Component, PropTypes } from 'react';

import PlayerItem from './PlayerItem.jsx';

// Task component - represents a single todo item
export default class PlayerList extends Component {
  constructor(props) {
    super(props);
  }

  renderPlayers() {
    return this.props.playerList.map((player) => (
      <PlayerItem key={player.hero_id} playerItem={player} match={this.props.match}/>
    ));
  }

  render() {
    return (
      <div><h2>{this.props.teamName}</h2>
      <table className="player-list" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th className="hero-pic">Hero</th>
            <th className="level">LVL</th>
            <th className="player-name">Player</th>
            <th className="kills">K</th>
            <th className="deaths">D</th>
            <th className="assists">A</th>
            <th className="net-worth">Gold</th>
            <th className="gpm">GPM</th>
            <th className="xpm">XPM</th>
            <th className="lh">LH</th>
            <th className="denies">DN</th>
            <th className="dmg">DMG</th>
            <th className="heal">HEAL</th>
            <th className="building">BLD</th>
          </tr>
        </thead>
        <tbody>
          {this.renderPlayers()}
        </tbody>
      </table></div>
    );
  }
}

PlayerList.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  playerList: PropTypes.array.isRequired,
};
