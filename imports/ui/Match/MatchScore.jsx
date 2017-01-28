import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class MatchScore extends Component {
  displayWinner() {
    if(this.props.matchScore.result.radiant_win) {
      return "Radiant victory";
    } else {
      return "Dire victory";
    }
  }

  winner() {
    if(this.props.matchScore.result.radiant_win) {
      return "radiant-win";
    } else {
      return "dire-win";
    }
  }

  calcDuration() {
    var h = Math.floor(this.props.matchScore.result.duration/3600);
    var m = Math.floor((this.props.matchScore.result.duration%3600)/60);
    var s = this.props.matchScore.result.duration%60;
    return h+":"+m+":"+s;
  }

  render() {
    return (
      <div className="match-score">
        <div>
          <span>{this.props.matchScore.result.radiant_score}</span>
          <span className={this.winner()}>{this.displayWinner()}</span>
          <span>{this.props.matchScore.result.dire_score}</span>
        </div>
        <div className="match-duration">{this.calcDuration()}</div>
      </div>
    );
  }
}

MatchScore.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  matchScore: PropTypes.object.isRequired,
};
