import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


class Courses extends Component{

  componentDidMount(){
    this.props.dispatch({type: 'GET_COURSES'});
  }

  render(){
    return(
      <div>
        <div>
          <h3>
            Participating Courses
          </h3>
        </div>
        <div className="course-card-box">
          {this.props.courses.map(course => {
              return (
                <div className="course-card" key={course.id}>
                  <div className="card-background"></div>
                  <CardContent><b>{course.name}, {course.location}, {course.holes}</b>
                  </CardContent>
                </div>
              )
          })}
        </div>
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  courses: reduxStore.courses,
})

export default connect(putReduxStateOnProps)(Courses);
