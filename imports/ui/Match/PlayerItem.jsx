import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class PlayerItem extends Component {
  constructor(props) {
    super(props);
  }

  /*
  * Returns the url of the hero pic asset on the server
  * Calculated from the hero id
  */
  getHeroPic() {
    return "/heroes/"+this.props.playerItem.hero_id+"/hero_icon.jpg";
  }

  /*
  * Takes a big value ( network, damage output, etc. ) and clens it
  * Example with net worth: takes XX.YYY and returns it like this: XX.Yk
  */
  clean_big_value(nw) {
    if(nw>1000) {
      return ((nw-nw%1000)/1000) + "." + Math.round((nw%1000)/100) + "k";
    } else {
      return nw;
    }
  }

  /*
  * Generates a link to /players/:player_id: if the profile is public
  * Dota 2 api returns account_id = 4294967295 for anonymous players
  * so this function just checks if account_id == this id
  * If it's anonymous, we display "anonymous", else we display the
  * id in a link redirecting to the player page
  */
  generateProfileURL(account_id) {
    if (Number(account_id) == 4294967295) {
      return "Anonymous";
    } else {
      var url = "/players/" + account_id;
      return <a href={url}>{account_id}</a>;
    }
  }

  render() {
    return (
      <tr className="player">
        <td className="hero-pic">
          <img src={this.getHeroPic()}></img>
        </td>
        <td className="level">
          {this.props.playerItem.level}
        </td>
        <td className="player-name">
          {this.generateProfileURL(this.props.playerItem.account_id)}
        </td>
        <td className="kills">
          {this.props.playerItem.kills}
        </td>
        <td className="deaths">
          {this.props.playerItem.deaths}
        </td>
        <td className="assists">
          {this.props.playerItem.assists}
        </td>
        <td className="net-worth">
          {this.clean_big_value(this.props.playerItem.gold_spent)}
          <p className="tooltip">
            {this.clean_big_value(Math.round(this.props.playerItem.gold_per_min*(this.props.match.result.duration/60)))}
          </p>
        </td>
        <td className="gpm">
          {this.props.playerItem.gold_per_min}
        </td>
        <td className="xpm">
          {this.props.playerItem.xp_per_min}
        </td>
        <td className="lh">
          {this.props.playerItem.last_hits}
        </td>
        <td className="denies">
          {this.props.playerItem.denies}
        </td>
        <td className="dmg">
          {this.clean_big_value(this.props.playerItem.scaled_hero_damage)}
        </td>
        <td className="heal">
          {this.clean_big_value(this.props.playerItem.scaled_hero_healing)}
        </td>
        <td className="building">
          {this.clean_big_value(this.props.playerItem.tower_damage)}
        </td>
      </tr>
    );
  }
}

PlayerItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  playerItem: PropTypes.object.isRequired,
};
