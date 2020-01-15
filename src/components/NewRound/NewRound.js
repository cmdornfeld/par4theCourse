import React, {Component} from 'react';
import { connect } from 'react-redux';

class NewRound extends Component {

  state = {
    course: "",
  }

  selectCourse = (event) => {
    this.setState({
      course: event.target.value
    });
    this.props.dispatch({type: 'GET_COURSE_TEES', payload: event.target.value});
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
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <br/>
          <label>9 holes</label><input type="radio" name="holes" value="9 Holes"/>
          <label>18 holes</label><input type="radio" name="holes" value="18 Holes"/>
        <br/>
        {JSON.stringify(this.props.tees)}
        <select>
          {this.props.tees.map(tee => (
            <option key={tee.id} value={tee.name}>
              {tee.name} (distance: {tee.distance})
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
   courses: reduxStore.courses,
   tees: reduxStore.tees,
})

export default connect(putReduxStateOnProps)(NewRound);