import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class MatchItem extends Component {
  displayWinner() {
    if(this.props.matchItem.result.radiant_win) {
      return "Radiant victory";
    } else {
      return "Dire victory";
    }
  }

  matchUrl() {
    return "/matches/"+this.props.matchItem.match_id;
  }

  render() {
    return (
      <a href={this.matchUrl()} className="match-item">
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
