import React, { Component, PropTypes } from 'react';

import { Matches } from '../../api/Matches.js';

// Task component - represents a single todo item
export default class MatchItem extends Component {
  displayWinner() {
    if(this.props.matchItem.result.radiant_win) {
      return "Radiant victory";
    } else {
      return "Dire victory";
    }
  }

  getWinner(match_id) {
    var m_id = Number(match_id);
    var match = Matches.findOne({'result.match_id': m_id});
    if(match) {
      if(match.result.radiant_win) {
        return "Radiant";
      } else {
        return "Dire";
      }
    }
  }

  matchUrl() {
    return "/matches/"+this.props.matchItem.match_id;
  }

  render() {
    return (
      <a href={this.matchUrl()} className="match-item">
        <p>{this.getWinner(this.props.matchItem.match_id)}</p>
        <p>{this.props.matchItem.match_id}</p>
      </a>
    );
  }
  // render() {
  //   return (
  //     <div className="match-item">
  //       <p>{this.props.matchItem.match_id}</p>
  //     </div>
  //   )
  // }
}

MatchItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  matchItem: PropTypes.object.isRequired,
};
