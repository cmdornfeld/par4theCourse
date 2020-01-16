import React, {Component} from 'react';
import { connect } from 'react-redux';

class NewRound extends Component {

  state = {
    course: "",
    tee: "",
  }

  selectCourse = (event) => {
    this.setState({
      course: event.target.value
    });
    this.props.dispatch({type: 'GET_COURSE_TEES', payload: event.target.value});
    this.props.dispatch({type: 'GET_COURSE_HOLES', payload: event.target.value});
  }

  selectTee = (event) => {
    this.setState({
      tee: event.target.value
    })
  }

  startRound = () => {
    let round = {course: this.state.course, tee: this.state.tee};
    console.log('round info =', round);
    this.props.dispatch({type: 'SET_ROUND', payload: round});
    this.props.history.push('/new-round/hole-1');
  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_COURSES'});
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state)}
        <p>Courses:</p> {JSON.stringify(this.props.courses)}
        <br/>
        <select onChange={(event) => {this.selectCourse(event)}}>
          <option value="default"></option>
          {this.props.courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <br/>
          <label>9 holes</label><input type="radio" name="holes" value="9 Holes"/>
          <label>18 holes</label><input type="radio" name="holes" value="18 Holes"/>
        <br/>
        {JSON.stringify(this.props.tees)}
        <select onChange={(event) => {this.selectTee(event)}}>
          <option value="default"></option>
          {this.props.tees.map(tee => (
            <option key={tee.id} value={tee.id}>
              {tee.name} (distance: {tee.distance})
            </option>
          ))}
        </select>
        <button onClick={this.startRound}>Start New Round</button>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
   courses: reduxStore.courses,
   tees: reduxStore.tees,
})

export default connect(putReduxStateOnProps)(NewRound);