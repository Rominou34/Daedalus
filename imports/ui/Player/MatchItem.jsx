import React, { Component, PropTypes } from 'react';

import { Matches } from '../../api/Matches.js';

// Task component - represents a single todo item
export default class MatchItem extends Component {
  constructor(props) {
    super(props);
  }

  displayWinner() {
    if(this.props.matchItem.result.radiant_win) {
      return "Radiant victory";
    } else {
      return "Dire victory";
    }
  }

  // Return whether the match was a victory or a defeat
  getWinner(match_id, m) {
    var m_id = Number(match_id);
    // var match = Matches.findOne({'result.match_id': m_id});
    console.log(m);
    var p_id = this.props.playerId;
    if(m) {
      // We look into what team the player was
      var playerList = m.result.players;
      console.log(playerList);
      var playerPos = null;
      for(var i=0; i<playerList.length; i++) {
        if(playerList[i].account_id == this.props.playerId) {
          playerPos = playerList[i].player_slot;
          i = playerList.length;
        }
      }

      if(m.result.radiant_win) {
        if(playerPos < 10) {
          return "victory"; // Radiant won and player was on radiant
        } else {
          return "defeat"; // Radiant won but player was on dire
        }
      } else {
        if(playerPos > 10) {
          return "victory"; // Dire won and player was on dire
        } else {
          return "defeat"; // Dire won but player was on radiant
        }
      }
      return;
    }
  }

  getPlayerKills(m) {
    var p_id = this.props.playerId;
    if(m) {
      // We look into what team the player was
      var playerList = m.result.players;
      console.log(playerList);
      var playerKills = 0;
      for(var i=0; i<playerList.length; i++) {
        if(playerList[i].account_id == this.props.playerId) {
          playerKills = playerList[i].kills;
          i = playerList.length;
        }
      }
      return playerKills;
    }
  }

  getPlayerDeaths(m) {
    var p_id = this.props.playerId;
    if(m) {
      // We look into what team the player was
      var playerList = m.result.players;
      console.log(playerList);
      var playerDeaths = 0;
      for(var i=0; i<playerList.length; i++) {
        if(playerList[i].account_id == this.props.playerId) {
          playerDeaths = playerList[i].deaths;
          i = playerList.length;
        }
      }
      return playerDeaths;
    }
  }

  getPlayerAssists(m) {
    var p_id = this.props.playerId;
    if(m) {
      // We look into what team the player was
      var playerList = m.result.players;
      console.log(playerList);
      var playerAssists = 0;
      for(var i=0; i<playerList.length; i++) {
        if(playerList[i].account_id == this.props.playerId) {
          playerAssists = playerList[i].assists;
          i = playerList.length;
        }
      }
      return playerAssists;
    }
  }

  matchUrl() {
    return "/matches/"+this.props.matchItem.match_id;
  }

  render() {
    // We get the match from the database here, instead of calling the database
    // in each function
    var match = Matches.findOne({'result.match_id': this.props.matchItem.match_id});
    console.log(match);
    return (
      <a href={this.matchUrl()} className="match-item" data-win={this.getWinner(this.props.matchItem.match_id, match)}>
        <p>{this.getWinner(this.props.matchItem.match_id, match)}</p>
        <p>{this.props.matchItem.match_id}</p>
        <p>
          <span>{this.getPlayerKills(match)}</span> /
          <span>{this.getPlayerDeaths(match)}</span> /
          <span>{this.getPlayerAssists(match)}</span>
        </p>
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
