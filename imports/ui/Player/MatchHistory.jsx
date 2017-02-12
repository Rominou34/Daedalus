import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MatchItem from './MatchItem.jsx';

import { Matches } from '../../api/Matches.js';
import { MatchShort } from '../../api/MatchShort.js';

// MatchHistory component - Represents the list of the last matches played by the player

class MatchHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: 0
    };
  }

  // OLD
  // renderMatches() {
  //   return this.props.matchshort.map((match) => (
  //     <MatchItem key={match._id} matchItem={match} />
  //   ));
  // }
  //
  // OLD
  // renderMatches() {
  //   return this.props.playerMatches.map((match) => (
  //     <MatchItem key={match._id} matchItem={match} />
  //   ));
  // }

  /*
  * Displays the list of all the matches played by the gamer saved in the database
  */
  renderMatches(p_id) {
    console.log(this.props.playerMatches);
    p_id = Number(p_id);
    var pMatches = MatchShort.find({players: {$elemMatch: {'account_id': p_id}}}).fetch();
    var pMatches = MatchShort.find({players: {$elemMatch: {'account_id': p_id}}}, {sort: {'match_id': -1}}).fetch();
    var pMatches = Matches.find({'result.players': {$elemMatch: {'account_id': p_id}}}, {sort: {'result.match_id': -1}}).fetch();
    //var pMatches = Matches.find().fetch();
    console.log(pMatches);
    console.log(pMatches.length);
    return pMatches.map((match) => (
      <MatchItem key={match._id} matchItem={match} playerId={this.props.playerId} />
    ));
  }

  test_bis() {
    Meteor.apply("getMatchShort", function(error, results) {
        if(results) {
          console.log(results);
          return results;
        } else {
          console.log(errors);
          return errors;
        }
      });
  }

  // INUTILE
  static displayMatches(matches) {
    return matches.map((match) => (
      <MatchItem key={match._id} matchItem={match} />
    ));
  }

  /*
  * Requests the match history from the Steam API ( for now, only the last 100 ),
  * and saves them into the database ( only the ones with small details tho )
  * DEPRECATED
  */
  parseMatches(player_id) {
    Meteor.apply("getMatchHistory", [player_id],
      function(error, results) {
        if(results) {
          console.log(results.content);
          console.log(results.data.result.matches);
          var total_matches = results.data.result.matches.length;
          for(var i=0; i < results.data.result.matches.length; i++) {
            if(MatchHistory.searchMatch(results.data.result.matches[i].match_id) == 0) {
              MatchShort.insert(results.data.result.matches[i]);
            } else {
              console.log("Match "+results.data.result.matches[i].match_id+" already saved");
            }
            //MatchHistory.saveMatch(results.data.result.matches[i].match_id);
            console.log(i + " - Match " + results.data.result.matches[i].match_id + " saved");
          }
          return;
          //this.displayMatches(results.data.result.matches);
          //displayMatches(results.data.result.matches);
          // for (var i=0; i < results.data.result.matches.length; i++) {
          //   this.saveMatch(results.data.result.matches[i].match_id);
          // }
        } else {
          console.log(error);
        }
    });
  }

  /*
  * Requests the server to parse the matches from the player and save them
  * into the database
  */
  parseMatches(player_id) {
    Meteor.apply("saveMatchHistory", [player_id],
      function(error, results) {
        if(results) {
          console.log(results);
        } else {
          console.log(error);
        }
      });
    }

  // DEPRECATED
  saveAllMatches(player_id) {
    Meteor.apply("getMatchHistory", [player_id],
      function(error, results) {
        if(results) {
          var total_matches = results.data.result.matches.length;
          console.log(results.data.result.matches);
          Meteor.apply("saveMatchDetails", [results.data.result.matches[0].match_id],
            function(error, res) {
                if(res) {
                  console.log(res);
                } else {
                  console.log(er);
                }
              }
            );
          }
        }
      );
  }

  /*
  * Counts the number of times a match is registered in the database
  * This function is used when saving matches into the database so we check if they're already there,
  * in order to not have duplicates
  */
  static searchMatch(m_id) {
    return MatchShort.find({match_id: m_id}).fetch().length;
  }

  /*
  * Sauvegarde les infos détaillées d'un match dans la BDD
  * /!\ Cette fonction devra être déplacée dans Match.jsx afin d'enregistrer le Match
  * au moment où le joueur veut voir les infos dessus, plutôt que d'enregistrer tous
  * les matches en même temps
  * Saves the detailed matches infos into the database
  */
  static saveMatch(match_id) {
     Meteor.apply("getMatchDetails", [match_id],
       function(error, results) {
         //console.log(results.data); //results.data should be a JSON object
         Matches.insert(results.data);
         return;
         console.log("Match " + match_id + " saved into the database");
     });
  }

  /*
  * Retourne le nombre de matches du joueur enregistrés dans la BDD
  * Returns the number of matches played by the gamer saved in the database
  */
  countMatches(p_id) {
    p_id = Number(p_id);
    var pMatches = Matches.find({'result.players': {$elemMatch: {'account_id': p_id}}}).fetch();
    return pMatches.length;
  }

  /*
  * INUTILE
  * Affiche le logo dans une balise <img>
  */
  displayLogo() {
    var imgSrc = 'https://my.mixtape.moe/rfhrcn.svg';
    return <img src={imgSrc} />
  }

  /*
  * Renders the component
  */
  render() {
    return (
      <div className="container">
        <h1>{this.props.playerId}</h1>
        <h1>Matches list ( {this.props.playerId} ) - {this.countMatches(this.props.playerId)}</h1>
        <div>
          <button type="submit" onClick={() => { this.parseMatches(this.props.playerId) }}>Parse Matches</button>
        </div>
        <table className="match-history">
          <tbody>
            {this.renderMatches(this.props.playerId)}
          </tbody>
        </table>
      </div>
    );
  }
}

MatchHistory.propTypes = {
   matchshort: PropTypes.array.isRequired,
   matches: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
      matchshort: MatchShort.find({}).fetch(),
      matches: Matches.find({}).fetch()
    };
}, MatchHistory);
