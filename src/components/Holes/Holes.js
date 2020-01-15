import React, {Component} from 'react';
import { connect } from 'react-redux';

class Hole1 extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_COURSE_HOLES'});
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.props.holes)}
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
   holes: reduxStore.holes,
})

export default connect(putReduxStateOnProps)(Hole1);