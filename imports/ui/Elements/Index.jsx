import React, { Component } from 'react';
import { Matches } from '../../api/Matches.js';
import { MatchShort } from '../../api/MatchShort.js';

export default class Index extends React.Component {
  render() {
    return (
      <article id="home">
        <h1>Welcome to Daedalus, the worst Dota stats parser ever</h1>
        <p>
          This website is an open-source stats parser for Dota 2, that takes
          player data from the Steam API and saves it into a database, then displays
          it with a nice interface ( like Dotabuff or Opendota but with less features ).
        </p>
        <p>
        The website is running on NodeJS and is powered by Meteor and React.<br/>
        This version ( the dev one ) is hosted by a Heroku free plan.
        </p>
        <p>
          If you want to see an example of it,
          <a href="https://daedalus-dota.herokuapp.com/players/153324485">check my profile</a>,
            as I'm pretty much the only player with registered data on the website.
        </p>
      </article>
    );
  }
}
