import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class MatchInfos extends Component {
  lobbyType() {
    var types = [
      "Invalid",
      "Public matchmaking",
      "Practice",
      "Tournament",
      "Tutorial",
      "Co-op with AI",
      "Team match",
      "Solo queue",
      "Ranked matchmaking",
      "Solo Mid 1 vs 1"
    ];
    return types[this.props.matchInfos.result.lobby_type+1];
  }

  gameMode() {
    var modes = [
      "Unknown",
      "All Pick",
      "Captain’s Mode",
      "Random Draft",
      "Single Draft",
      "All Random",
      "Intro",
      "Diretide",
      "Reverse Captain’s Mode",
      "The Greeviling",
      "Tutorial",
      "Mid Only",
      "Least Played",
      "New Player Pool",
      "Compendium Matchmaking",
      "Custom",
      "Captains Draft",
      "Balanced Draft",
      "Ability Draft",
      "Event",
      "All Random Death Match",
      "Solo Mid 1 vs 1",
      "Ranked All Pick"
    ];
    return modes[this.props.matchInfos.result.game_mode];
  }

  render() {
    return (
      <div className="match-infos">
        <div>Match {this.props.matchInfos.result.match_id}</div>
        <div>{this.lobbyType()}</div>
        <div>{this.gameMode()}</div>
      </div>
    );
  }
}

MatchInfos.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  matchInfos: PropTypes.object.isRequired,
};
