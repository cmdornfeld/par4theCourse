import React, {Component} from 'react';
import { connect } from 'react-redux';

class Courses extends Component{

  componentDidMount(){
    this.props.dispatch({type: 'GET_COURSES'});
  }

  render(){
    return(
      <div>
        <div>
          <p>
            <b>This page has all of the courses listed in the application</b>
          </p>
        </div>
        <div>
          {/* <ul>
          {this.props.courses.map(course => {
              <li>{course.name}</li>
          })}
          </ul> */}
        </div>
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  courses: reduxStore.courses,
})

export default connect(putReduxStateOnProps)(Courses);
