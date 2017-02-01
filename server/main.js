import { Meteor } from 'meteor/meteor';
import { Matches } from '../imports/api/Matches.js';
import { MatchShort } from '../imports/api/MatchShort.js';

Meteor.startup(() => {
  //code to run on server at startup
  // Meteor.publish("matches", function () {
  //   return Matches.find();
  // });
  // Meteor.publish("matchshort", function () {
  //   return MatchShort.find();
  // });
});

Meteor.methods({
  httpRequest: function (url) {
    try {
      r = HTTP.call("GET", url);
      return r;
    } catch (er) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      return er;
    }
  },

  getMatchHistory: function(player_id) {
    var api = Meteor.settings.apiKey;
    try {
      r = HTTP.call("GET", "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?account_id="+player_id+"&key="+api);
      return r;
    } catch (er) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      return er;
    }
  },

  getMatchDetails: function(match_id) {
    var api = Meteor.settings.apiKey;
    try {
      r = HTTP.call("GET", "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+match_id+"&key="+api);
      return r;
    } catch (er) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      return er;
    }
  },

  saveMatchDetails: function(match_id) {
    var api = Meteor.settings.apiKey;
    try {
      r = HTTP.call("GET", "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+match_id+"&key="+api);
      Matches.insert(r.data);
      return "Match "+match_id+" added to the database";
    } catch (er) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      return new Meteor.Error("test");
    }
  },

  getMatchesByPlayer: function (player_id) {
    //var us = Meteor.call("getLog", user_1);
    var ma = Matches.find(
      { players: player_id}
    ).map(function(matches){return matches;});

    // var player_name = Players.find({
    //   name: {$not: {$in: us}}
    // },{limit: 1}).map(function(play){return play.name;});
    // return player_name[0];
  },

  getMatches: function () {
    //var ma = Matches.find().map(function(matches){return matches;});
    return Matches.find();
  },

  getMatchShort: function() {
    return MatchShort.find();
  },

  saveMatch(match) {
    Matches.insert(match);
  }
});
