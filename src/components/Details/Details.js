import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
          {JSON.stringify(this.props.details)}<br/>
          {JSON.stringify(this.props.total)}
          <h3>Course played:</h3>
          <h3>Total Score: {this.props.total.score}</h3>
          <h3>Total Par: {this.props.total.par}</h3>
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
      </div>
      <div className="round-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hole #</TableCell>
            <TableCell>Par</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.details.map(hole => {
            return (
            <TableRow key={hole.hole_id}>
              <TableCell>{hole.number}</TableCell>
              <TableCell>{hole.par}</TableCell>
              <TableCell>{hole.score}</TableCell>
              <TableCell>{hole.comments}</TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </div>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  details: reduxStore.details,
  user: reduxStore.user,
  total: reduxStore.totals,
})

export default connect(putReduxStateOnProps)(Details);