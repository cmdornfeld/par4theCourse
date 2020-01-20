import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

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
        <div className="course-card">
          {this.props.courses.map(course => {
              return (
                <Card key={course.id}>
                  <CardContent>{course.name}, {course.location}, {course.holes}
                  </CardContent>
                </Card>
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

export default connect(putReduxStateOnProps)(withStyles(styles)(Courses));
