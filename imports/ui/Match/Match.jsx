import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import MatchInfos from './MatchInfos.jsx';
import MatchScore from './MatchScore.jsx';
import PlayerList from './PlayerList.jsx';
import './Match.css';

import { Matches } from '../../api/Matches.js';

// MatchHistory component - Represents the list of the last matches played by the player
class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchFound: false,
      matchParsed: false
    };
  }

  // static parseMatch(match_id) {
  //    Meteor.apply("getMatchDetails", [match_id],
  //      function(error, results) {
  //        if(results) {
  //          console.log(results);
  //          if(results.statusCode == 503) {
  //            console.log("The Steam Dota 2 API is currently unavailable");
  //            return;
  //          }
  //        //console.log(results.data); //results.data should be a JSON object
  //          Matches.insert(results.data);
  //          console.log("Match " + match_id + " saved into the database");
  //          return;
  //        } else {
  //          console.log(error);
  //        }
  //    });
  // }

  /*
  * This function looks for the match inside the database
  * If it isn't there, it downloads it from the Steam API and adds it in
  * NEEDS TO BE CHANGED BECAUSE IT ACTUALLY REDOWNLOADS THE MATCH EVERY TIME
  * ( The function is too fast so it asks Steam API before having finished lookingin DB )
  */
  // checkMatch(match_id) {
  //   console.log("Searching for match...");
  //   var m_id = Number(match_id);
  //   if(!this.state.matchFound || !this.state.matchParsed) {
  //     var match= Matches.findOne({'result.match_id': m_id});
  //     if(match) {
  //       this.setState({matchFound: true});
  //     } else {
  //       console.log("Match not found, requesting the Steam API");
  //       Match.parseMatch(m_id);
  //     }
  //   }
  //   return;
  // }

  getMatchInfos(match) {
    //var m_id = Number(match_id);
    //var match_details = Matches.find({'result.match_id': m_id}, {limit: 1}).fetch();
    //var match_details = Matches.findOne({'result.match_id': m_id});
    //console.log(match_details);
    //var match_details = Matches.find().fetch();
    //console.log(match_details);
    if(match) {
      return <MatchInfos key={match._id} matchInfos={match} />;
    }
  }

  componentDidMount() {
    //this.checkMatch(this.props.params.match_id);
  }

  getMatchScore(match) {
    //var m_id = Number(match_id);
    //var match_details = Matches.findOne({'result.match_id': m_id});
    //console.log(match_details);
    //var match_details = Matches.find().fetch();
    //console.log(match_details);
    if(match) {
      return <MatchScore key={match.result.match_id} matchScore={match} />;
    }
  }

  renderPlayerList(match, team) {
    if(match) {
      if(team) {
        var players = match.result.players.slice(0,5);
        var team_name = "radiant";
      } else {
        var players = match.result.players.slice(5,10);
        var team_name = "dire";
      }
      console.log(players);
      return <PlayerList key={team_name} playerList={players} />;
      return players.map((player) => (
        <PlayerItem key={player.hero_id} playerItem={player} />
      ));
    }
  }

  render() {
    var match = Matches.findOne({'result.match_id': Number(this.props.params.match_id)});
    console.log(match);
    return (
      <div className="container">
        <div className="match-infos-container">
          {this.getMatchInfos(match)}
          <button type="submit" onClick={() => {Match.parseMatch(this.props.params.match_id)}}>Parse Match</button>
        </div>
        {this.getMatchScore(match)}
        {this.renderPlayerList(match, true)}
        {this.renderPlayerList(match, false)}
      </div>
    );
  }
}

Match.propTypes = {
  matches: PropTypes.array.isRequired,
};

export default createContainer(() => {
   return {
     matches: Matches.find().fetch()
   };
}, Match);
