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
  * Takes a network like this: XX.YYY and returns it like this: XX.Yk
  */
  clean_netWorth(nw) {
    return ((nw-nw%1000)/1000) + "." + Math.round((nw%1000)/100) + "k";
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
          {this.clean_netWorth(this.props.playerItem.gold_spent)}
          <p className="tooltip">
            {this.clean_netWorth(Math.round(this.props.playerItem.gold_per_min*(this.props.match.result.duration/60)))}
          </p>
        </td>
        <td className="gpm">
          {this.props.playerItem.gold_per_min}
        </td>
        <td className="xpm">
          {this.props.playerItem.xp_per_min}
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
