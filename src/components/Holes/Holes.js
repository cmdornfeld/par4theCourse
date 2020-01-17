import React, {Component} from 'react';
import { connect } from 'react-redux';

class Holes extends Component {

  state = {
    score: "",
    comments: "",
  }

  submitHoleInfo = ()=> {
    console.log('NEXT ROUND')
    this.props.dispatch({type: 'SET_STEP', payload: this.props.holes.step+1})
    this.setState({
      score: "",
      comments: ""
    })
  }

  render() {
    return (
        <div>
            <h1>Hole {this.props.holes.holeData[this.props.holes.step].number}</h1>
            {JSON.stringify(this.props.holes)}
            <label>My score</label>
            <input type="number" min="1" max="10" placeholder="enter your score" /><br/>
            <label>Par:</label><span>{this.props.holes.holeData[this.props.holes.step].par}</span><br/>
            <label>Comments:</label>
            <textarea></textarea><br/>
            <button>Cancel Round</button>
            <button onClick={this.submitHoleInfo}>Submit Score</button>
        </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
   holes: reduxStore.holes,
})

export default connect(putReduxStateOnProps)(Holes);