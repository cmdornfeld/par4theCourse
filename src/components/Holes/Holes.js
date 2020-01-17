import React, {Component} from 'react';
import { connect } from 'react-redux';

class Hole1 extends Component {

  render() {
    return (
        <div>
            <h1>Hole {this.props.holes[0].number}</h1>
            {JSON.stringify(this.props.holes)}
            <label>My score</label>
            <input type="number" min="1" max="10" placeholder="enter your score" /><br/>
            <label>Par:</label><span>{this.props.holes[0].par}</span><br/>
            <label>Comments:</label>
            <textarea></textarea><br/>
            <button>Cancel Round</button>
            <button>Submit Score</button>
        </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
   holes: reduxStore.holes,
})

export default connect(putReduxStateOnProps)(Hole1);