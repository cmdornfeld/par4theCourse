import React, {Component} from 'react';
import { connect } from 'react-redux';


class Details extends Component {

  deleteRound = (event, id) => {
    this.props.dispatch({type: 'DELETE_ROUND', payload: id})
  }
  

  render() {
    return (
      <>
      <div>
        <h1><b>Round Details</b></h1><br/>
          {JSON.stringify(this.props.user)}<br/>
          {JSON.stringify(this.props.details)}
      </div>
      <div>

      </div>
      <table>
        <thead>
          <tr>
            <th>Hole #</th><th>Par</th><th>Score</th><th>Comments</th><th>&nbsp;</th><th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.props.details.map(hole => {
            return (
            <tr key={hole.id}>
              <td>{hole.number}</td><td>{hole.par}</td><td>{hole.score}</td><td>{hole.comments}</td>
              <td><button>Edit</button></td>
            </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={(event) => this.deleteRound(event, id)}>Delete Round</button>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  details: reduxStore.details,
  user: reduxStore.user
})

export default connect(putReduxStateOnProps)(Details);