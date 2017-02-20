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
  renderMatches(pMatches) {
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
    var pMatches = Matches.find({'result.players': {$elemMatch: {'account_id': p_id}}}).count();
    return pMatches;
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
  * Renders the links at the bottom of the match history
  * allowing you to navigate through the pages to see
  * the first 20 matches, the next 20, etc.
  */
  getPages(matches_count, p_id) {
    var url = "/players/"+p_id+"/";
    var ar = [];
    /*
    * We create an array will all the urls so we can
    * use .map() on it
    */
    for(var i=0; (20*i)<matches_count; i++) {
      var uri = url + (i+1);
      // We create a JSON object for each page with the url
      // and page number
      var val = {"num": (i+1), "url": uri, "key": "page"+i};
      ar.push(val);
    }
    console.log(ar);
    return ar.map((val) => (
      <a key={val.key} href={val.url}>{val.num}</a>
    ));
  }

  /*
  * Renders the component
  */
  render() {
    // We get the page number
    var page = this.props.page;
    if(this.props.page == undefined) {
      page = 1;
    }
    var startMatch = (page*20)-20;
    p_id = Number(this.props.playerId);

    // We get the matches
    var player_matches = Matches.find({'result.players': {$elemMatch: {'account_id': p_id}}}, {sort: {'result.match_id': -1}, skip: startMatch, limit: 20}).fetch();
    console.log(player_matches);

    // We count the number of total matches
    var total_matches = Matches.find({'result.players': {$elemMatch: {'account_id': p_id}}}).count();
    console.log(total_matches);
    return (
      <div className="container">
        <h1>{this.props.playerId}</h1>
        <h1>Matches list ( {this.props.playerId} ) - {total_matches}</h1>
        <div>
          <button type="submit" onClick={() => { this.parseMatches(this.props.playerId) }}>Parse Matches</button>
        </div>
        <table className="match-history">
          <tbody>
            {this.renderMatches(player_matches)}
          </tbody>
        </table>
        <div className="page-links">
          {this.getPages(total_matches, this.props.playerId)}
        </div>
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
