import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import MatchInfos from './MatchInfos.jsx';
import MatchScore from './MatchScore.jsx';

import { Matches } from '../../api/Matches.js';

// MatchHistory component - Represents the list of the last matches played by the player
class Match extends React.Component {
  test() {
    console.log(Matches.find());
    return;
  }

  parseMatch(match_id) {
     Meteor.apply("getMatchDetails", [match_id],
       function(error, results) {
         if(results) {
           console.log(results.content);
         //console.log(results.data); //results.data should be a JSON object
           Matches.insert(results.data);
           console.log("Match " + match_id + " saved into the database");
           return;
         } else {
           console.log(error);
         }
     });
  }

  getMatchInfos(match_id) {
    var m_id = Number(match_id);
    //var match_details = Matches.find({result: {$elemMatch: {'match_id': m_id}}}).fetch();
    //console.log(match_details);
    var match_details = Matches.find({'result.match_id': m_id}, {limit: 1}).fetch();
    var match_details = Matches.findOne({'result.match_id': m_id});
    console.log(match_details);
    //var match_details = Matches.find().fetch();
    //console.log(match_details);
    if(match_details) {
      return <MatchInfos key={match_details._id} matchInfos={match_details} />;
    }
  }

  getMatchScore(match_id) {
    var m_id = Number(match_id);
    //var match_details = Matches.find({result: {$elemMatch: {'match_id': m_id}}}).fetch();
    //console.log(match_details);
    var match_details = Matches.findOne({'result.match_id': m_id});
    console.log(match_details);
    //var match_details = Matches.find().fetch();
    //console.log(match_details);
    if(match_details) {
      return <MatchScore key={match_details.result.match_id} matchScore={match_details} />;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="match-infos-container">
          {this.getMatchInfos(this.props.params.match_id)}
          <button type="submit" onClick={() => {this.parseMatch(this.props.params.match_id)}}>Parse Match</button>
        </div>
        {this.getMatchScore(this.props.params.match_id)}
        <div>
        </div>
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
