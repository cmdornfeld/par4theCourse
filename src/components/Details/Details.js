import React, {Component} from 'react';
import { connect } from 'react-redux';


class Details extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_ROUND_DETAILS'});
  }

  render() {
    return (
      <div>
        <h1>Hello, <b>{this.props.user.username}</b></h1><br/>
          {JSON.stringify(this.props.user)}<br/>
          {JSON.stringify(this.props.details)}
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  details: reduxStore.details,
  user: reduxStore.user
})

export default connect(putReduxStateOnProps)(Details);