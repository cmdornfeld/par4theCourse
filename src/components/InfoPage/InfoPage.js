import React, {Component} from 'react';
import { connect } from 'react-redux';

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_DETAILS'});
  }

  render() {
    return (
      <div>
        <p>Currently logged in as <b>{this.props.user.username}</b></p>
        <ul>
          {this.props.details.map(round => (
            <li>
              User ID: {round.user_id}, Course ID: {round.course_id}, Tee ID: {round.tee_id}
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
