import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Scorecard extends Component {
  
  state = {
    open: false,
  };

  deleteRound = (id) => {
    console.log('Deleting id:', id);
    this.props.dispatch({type: 'DELETE_ROUND', payload: id});
    this.props.history.push('/home');
  }

  editHoleDetails = (id) => {
    console.log('Updating for hole:', id);
    
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  

  render() {
    return (
      <>
      <div>
        <h1><b>Round Details</b></h1><br/>
          {JSON.stringify(this.props.round)}<br/>
          <h3>Course played:</h3>
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
          {this.props.round.map(hole => {
            return (
            <tr key={hole.id}>
              <td>{hole.number}</td><td>{hole.par}</td><td><input type="text" /></td><td><input type="text" /></td>
              <td><button onClick={(event) => this.editHoleDetails(hole.id)}>Save</button></td>
            </tr>
            )
          })}
        </tbody>
      </table>
      
      </>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  round: reduxStore.round
})

export default connect(putReduxStateOnProps)(Scorecard);