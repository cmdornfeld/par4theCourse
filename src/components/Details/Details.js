import React, {Component} from 'react';
import { connect } from 'react-redux';


class Details extends Component {
  

  render() {
    return (
      <>
      <div>
        <h1>Hello, <b>{this.props.user.username}</b></h1><br/>
          {JSON.stringify(this.props.user)}<br/>
          {JSON.stringify(this.props.details)}
      </div>
      <table>
        <thead>
          <tr>
            <th>Hole #</th><th>Par</th><th>Score</th><th>Comments</th><th>&nbsp;</th><th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {/* {this.props.details.map(hole => {
            <tr>
              <td>{hole.number}</td><td>{hole.par}</td><td>{hole.score}</td><td>{hole.comments}</td>
            </tr>
          })} */}
        </tbody>
      </table>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  details: reduxStore.details,
  user: reduxStore.user
})

export default connect(putReduxStateOnProps)(Details);