import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Details extends Component {
  
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
          {JSON.stringify(this.props.user)}<br/>
          {JSON.stringify(this.props.details)}
          <h3>Course played:</h3>
          <h3>Total Score:</h3>
          <h3>Total Par:</h3>
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
            <tr key={hole.hole_id}>
              <td>{hole.number}</td><td>{hole.par}</td><td>{hole.score}</td><td>{hole.comments}</td>
              <td><button onClick={(event) => this.editHoleDetails(hole.hole_id)}>Edit</button></td>
            </tr>
            )
          })}
        </tbody>
      </table>
      <br/>
      <Button onClick={this.handleClickOpen} variant="contained">Delete Round</Button>
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
              Deleting this round will permanently remove it from your history.  I am sure I would like to delete this round.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              No
            </Button>
            <Button onClick={(event) => this.deleteRound(this.props.details[0].id)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
      </Dialog>
      <Button onClick={() => this.props.history.push('/home')} variant="contained">Return Home</Button>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  details: reduxStore.details,
  user: reduxStore.user
})

export default connect(putReduxStateOnProps)(Details);