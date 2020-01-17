import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {
  pos: {
    marginBottom: 12,
  },
};

class NewRound extends Component {

  state = {
    course: "",
    holes: "",
    tee: "",
  }

  selectCourse = (event) => {
    this.setState({
      course: event.target.value
    });
    this.props.dispatch({type: 'GET_COURSE_TEES', payload: event.target.value});
    this.props.dispatch({type: 'GET_COURSE_HOLES', payload: event.target.value});
  }

  selectHoles = (event) => {
    this.setState({
      holes: event.target.value
    })
  }

  selectTee = (event) => {
    this.setState({
      tee: event.target.value
    })
  }

  startNewRound = () => {
    let newRound = {course: this.state.course, holes: this.state.holes, tee: this.state.tee, user: this.props.user.id};
    console.log('round info =', newRound);
    this.props.dispatch({type: 'SET_ROUND_DETAILS', payload: newRound});
    this.props.history.push('/new-round/hole');
  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_COURSES'});
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state)}
        {JSON.stringify(this.props.user)}
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
          <label>9 holes</label><input onChange={(event) => {this.selectHoles(event)}} type="radio" name="holes" value="9"/>
          <label>18 holes</label><input onChange={(event) => {this.selectHoles(event)}} type="radio" name="holes" value="18"/>
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
        <Button onClick={this.startNewRound} variant="contained">
          Start Round
        </Button>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
   courses: reduxStore.courses,
   tees: reduxStore.tees,
   user: reduxStore.user
})

export default connect(putReduxStateOnProps)(withStyles(styles)(NewRound));