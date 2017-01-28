import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Matches } from '../../api/Matches.js';
import { MatchShort } from '../../api/MatchShort.js';

class About extends React.Component {
  countMatches() {
    var c = Matches.find().count();
    console.log(c);
    if(c>0) {
      return c;
    }
  }

  render() {
    return (
      <h2>{this.props.matches} matches parsed</h2>
    );
  }
}

About.propTypes = {
   matches: PropTypes.number.isRequired,
};

export default createContainer(() => {
    return {
      matches: Matches.find({}).count()
    };
}, About);
