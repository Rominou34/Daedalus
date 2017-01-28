export const API_KEY = Meteor.settings.API_KEY;

// if (Meteor.isServer) {
//   Meteor.methods({
//     httpRequest: function (url) {
//       try {
//         r = HTTP.call("GET", url);
//         return r;
//       } catch (er) {
//         // Got a network error, time-out or HTTP error in the 400 or 500 range.
//         return er;
//       }
//     },
//
//     getMatchesByPlayer: function (player_id) {
//       //var us = Meteor.call("getLog", user_1);
//       var ma = Matches.find(
//         { players: player_id}
//       ).map(function(matches){return matches;});
//
//       // var player_name = Players.find({
//       //   name: {$not: {$in: us}}
//       // },{limit: 1}).map(function(play){return play.name;});
//       // return player_name[0];
//     },
//
//     getMatches: function () {
//       //var ma = Matches.find().map(function(matches){return matches;});
//       return Matches.find();
//     },
//
//     getMatchShort: function() {
//       return MatchShort.find();
//     },
//
//     saveMatch(match) {
//       Matches.insert(match);
//     }
//   });
// }

  /*
  ID HIGHBORDE: 72203285

  HISTORIQUE DES MATCHES PAR JOUEUR
  https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?account_id=153324485&key=B6012F96107A2FEBAF8F263DDFF765A3

  DETAILS D'UN MATCH
  https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=2932857998&key=B6012F96107A2FEBAF8F263DDFF765A3

  AIDE A PROPOS DE L'API
  http://dev.dota2.com/showthread.php?t=58317&highlight=teaminfo
  */
