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
    //console.log(m);
    var p_id = this.props.playerId;
    if(m) {
      // We look into what team the player was
      var playerList = m.result.players;
      //console.log(playerList);
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
      //console.log(playerList);
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
      //console.log(playerList);
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
      //console.log(playerList);
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

  static getHeroId(m, pl_id) {
    var p_id = Number(pl_id);
    if(m) {
      // We look into what team the player was
      var playerList = m.result.players;
      //console.log(playerList);
      var playerAssists = 0;
      for(var i=0; i<playerList.length; i++) {
        if(playerList[i].account_id == p_id) {
          //console.log(playerList[i].hero_id);
          return playerList[i].hero_id;
        }
      }
    }
  }

  getHeroPic(m, pl_id) {
    var p_id = Number(pl_id);
    return "/heroes/"+MatchItem.getHeroId(m, pl_id)+"/hero_icon.jpg";
  }

  matchUrl() {
    return "/matches/"+this.props.matchItem.result.match_id;
  }

  render() {
    // We get the match from the database here, instead of calling the database
    // in each function
    var match = this.props.matchItem;
    //console.log(match);
    //console.log(this.props.matchItem.result.match_id);
    return (
      <tr className="match-item">
        <td className="hero-icon-container">
          <img src={this.getHeroPic(this.props.matchItem, this.props.playerId)} className="hero-icon"/>
        </td>
        <td className="match-id-container">
          <a href={this.matchUrl()}>
            <div>
              <p className="link">{this.props.matchItem.result.match_id}</p>
              <p className="winner" data-win={this.getWinner(this.props.matchItem.result.match_id, this.props.matchItem)}>{this.getWinner(this.props.matchItem.result.match_id, this.props.matchItem)}</p>
            </div>
          </a>
        </td>
        <td className="kda-container">
          <div>
            <p>
              <span>{this.getPlayerKills(this.props.matchItem)}</span> /
              <span>{this.getPlayerDeaths(this.props.matchItem)}</span> /
              <span>{this.getPlayerAssists(this.props.matchItem)}</span>
            </p>
          </div>
        </td>
      </tr>
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
