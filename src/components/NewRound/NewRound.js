import React, {Component} from 'react';
import { connect } from 'react-redux';

class NewRound extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_COURSES'});
  }

  render() {
    return (
      <div>
        <p>Courses:</p> {JSON.stringify(this.props.courses)}
        <br/>
        <select>
          {this.props.courses.map(course => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <br/>
          <input type="radio" value="9 Holes"/> 9 holes
          <input type="radio" value="18 Holes"/> 18 holes
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
   courses: reduxStore.courses,
})

export default connect(putReduxStateOnProps)(NewRound);