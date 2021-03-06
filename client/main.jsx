import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MatchHistory from '../imports/ui/Player/MatchHistory.jsx';
import MatchItem from '../imports/ui/Player/MatchItem.jsx';
import Player from '../imports/ui/Player/Player.jsx';
import Match from '../imports/ui/Match/Match.jsx';
import App from '../imports/ui/Elements/App.jsx';
import Home from '../imports/ui/Elements/Index.jsx';
import About from '../imports/ui/Elements/About.jsx';

// import { Matches } from '../imports/api/Matches.js';
// import { MatchShort } from '../imports/api/MatchShort.js';
//
// Meteor.subscribe("matches");
// Meteor.subscribe("matchshort");

// export const renderRoutes = () => (
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={ Index } />
//       <Route path="players/:player_id" component={MatchHistory}/>
//       <Route path="matches/:match_id" component={Match}/>
//     </Route>
//   </Router>
// );

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ Home } />
        <Route path="players/:player_id" component={Player}/>
        <Route path="players/:player_id/:page" component={Player}/>
        <Route path="matches/:match_id" component={Match}/>
        <Route path="about" component={About}></Route>
    </Route>
  </Router>
);

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('content'));


// Meteor.call("httpRequest", function(error, response) {
//     console.log(response.data.result); //results.data should be a JSON object
//     //console.log(error.content);
// });
});
