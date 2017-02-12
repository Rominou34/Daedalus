import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class PlayerItem extends Component {
  constructor(props) {
    super(props);
  }

  getHeroPic() {
    return "/heroes/"+this.props.playerItem.hero_id+"/hero_icon.jpg";
  }

  render() {
    return (
      <tr className="player">
        <td className="hero-pic">
          <img src={this.getHeroPic()}></img>
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
        <td className="gpm">
          {this.props.playerItem.gold_per_min}
        </td>
        <td className="xpm">
          {this.props.playerItem.gold_per_min}
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
