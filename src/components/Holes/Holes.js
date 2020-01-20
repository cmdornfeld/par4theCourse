import React, {Component} from 'react';
import { connect } from 'react-redux';

class Holes extends Component {

  state = {
    score: "",
    comments: "",
  }

  handleChange = (event, propertyName) => {
    this.setState({
      [propertyName]: event.target.value
    })
  }

  submitHoleInfo = ()=> {
    console.log('NEXT ROUND')
    let holeInfo = {hole: this.props.holes.holeData[this.props.holes.holeIndex].id, score: this.state.score, 
      comments: this.state.comments, roundId: this.props.round.id}
    console.log('logging holeInfo:', holeInfo);
    this.props.dispatch({type: 'POST_HOLE_INFO', payload: holeInfo})
    this.props.dispatch({type: 'SET_HOLE_INDEX', payload: this.props.holes.holeIndex+1});
    this.setState({
      score: "",
      comments: ""
    });
  }

  render() {
    return (
        <div>
            <h1>Hole {this.props.holes.holeData[this.props.holes.holeIndex].number}</h1>
            {JSON.stringify(this.props.holes)}
            {JSON.stringify(this.state)}
            <label>My score</label>
            <input type="number" min="1" max="10" placeholder="enter your score" value={this.state.score}
              onChange={(event) => this.handleChange(event, 'score')}/><br/>
            <label>Par:</label><span>{this.props.holes.holeData[this.props.holes.holeIndex].par}</span><br/>
            <label>Comments:</label>
            <textarea value={this.state.comments} onChange={(event) => this.handleChange(event, 'comments')}>Enter hole comments</textarea><br/>
            <button>Cancel Round</button>
            <button onClick={this.submitHoleInfo}>Submit Score</button>
        </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
   holes: reduxStore.holes,
   round: reduxStore.round,
})

export default connect(putReduxStateOnProps)(Holes);