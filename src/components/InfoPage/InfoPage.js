import React, {Component} from 'react';
import { connect } from 'react-redux';

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_DETAILS'});
  }

  goToSetRoundDetails = () => {
    this.props.history.push('/new-round')
  }

  render() {
    return (
      <div>
        <p>Hello, <b>{this.props.user.username}</b></p><br/>
        <button onClick={this.goToSetRoundDetails}>Start New Round</button>
        <ul>
          {JSON.stringify(this.props.user)}<br/>
          {JSON.stringify(this.props.details)}
          {this.props.details.map(round => (
            <li key={round.round_id}>
              Score: {round.score}, Course Name: {round.name}, Round ID: {round.round_id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  details: reduxStore.details,
  user: reduxStore.user
})

export default connect(putReduxStateOnProps)(InfoPage);
