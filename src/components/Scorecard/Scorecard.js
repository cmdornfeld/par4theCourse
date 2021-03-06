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


class Scorecard extends Component {
  
  state = {
    deleteOpen: false,
    submitOpen: false,
  };

  componentDidUpdate(prevProps){
      if(this.props.round !== prevProps.round){
      if(this.props.round.length === 9){
          this.setState({
              holeData: {
                hole1: {score: '', comments: '', id: this.props.round[0].id},
                hole2: {score: '', comments: '', id: this.props.round[1].id},
                hole3: {score: '', comments: '', id: this.props.round[2].id},
                hole4: {score: '', comments: '', id: this.props.round[3].id},
                hole5: {score: '', comments: '', id: this.props.round[4].id},
                hole6: {score: '', comments: '', id: this.props.round[5].id},
                hole7: {score: '', comments: '', id: this.props.round[6].id},
                hole8: {score: '', comments: '', id: this.props.round[7].id},
                hole9: {score: '', comments: '', id: this.props.round[8].id},
              }
          })
      }
      else {
        this.setState({
            holeData: {
                hole1: {score: '', comments: '', id: this.props.round[0].id},
                hole2: {score: '', comments: '', id: this.props.round[1].id},
                hole3: {score: '', comments: '', id: this.props.round[2].id},
                hole4: {score: '', comments: '', id: this.props.round[3].id},
                hole5: {score: '', comments: '', id: this.props.round[4].id},
                hole6: {score: '', comments: '', id: this.props.round[5].id},
                hole7: {score: '', comments: '', id: this.props.round[6].id},
                hole8: {score: '', comments: '', id: this.props.round[7].id},
                hole9: {score: '', comments: '', id: this.props.round[8].id},
                hole10: {score: '', comments: '', id: this.props.round[9].id},
                hole11: {score: '', comments: '', id: this.props.round[10].id},
                hole12: {score: '', comments: '', id: this.props.round[11].id},
                hole13: {score: '', comments: '', id: this.props.round[12].id},
                hole14: {score: '', comments: '', id: this.props.round[13].id},
                hole15: {score: '', comments: '', id: this.props.round[14].id},
                hole16: {score: '', comments: '', id: this.props.round[15].id},
                hole17: {score: '', comments: '', id: this.props.round[16].id},
                hole18: {score: '', comments: '', id: this.props.round[17].id},
            }
        })
      }

      }
  }

  deleteRound = (id) => {
    console.log('Deleting id:', id);
    this.props.dispatch({type: 'DELETE_ROUND', payload: id});
    this.props.history.push('/new-round');
  }

  submitRound = (id) => {
    this.handleClose();
    let objectToSend = this.state.holeData;
    console.log('logging objectToSend:', objectToSend);
    console.log('Submitting info for round:', id);
    this.props.dispatch({type: 'UPDATE_ROUND', payload: {holeData: objectToSend, id: id}});
    this.props.history.push('/new-round');
  }

  handleCancelOpen = () => {
    this.setState({ deleteOpen: true });
  };

  handleSubmitOpen = () => {
    this.setState({ submitOpen: true });
  };

  handleClose = () => {
    this.setState({ deleteOpen: false, submitOpen: false });
  };

  handleChange = (value, holeNumber, propertyName) => {
      console.log('logging change for propertyName:', propertyName);
      this.setState(prevState => {
        return {
          holeData: {
            ...prevState.holeData,
            [holeNumber]: {
              ...prevState.holeData[holeNumber],
              [propertyName]: value,
            }
          }
        };
      });
  }


  render() {
    return (
      <>
      <div>
          {/* {JSON.stringify(this.state)} */}
        <h1><b>Scorecard</b></h1><br/>
          {/* {JSON.stringify(this.props.round)}<br/>
          {JSON.stringify(this.props.round.length)} */}
          {/* <h3>Course: {this.props.round.name}</h3> */}
      </div>
      <div className="round-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hole</TableCell>
            <TableCell>Par</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.round.map(hole => {
            return (
            <TableRow key={hole.id}>
              <TableCell>{hole.number}</TableCell>
              <TableCell>{hole.par}</TableCell>
              <TableCell><input onChange={(event) => this.handleChange(event.target.value, `hole${hole.number}`, 'score')} type="number"
                min="1" max="10" width="25"/></TableCell>
              <TableCell><input onChange={(event) => this.handleChange(event.target.value, `hole${hole.number}`, 'comments')}type="text" /></TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </div><br/>
      <div className="button-container" >
      <Button onClick={this.handleCancelOpen} variant="contained" style={{backgroundColor: "#ff6666"}}>
        Cancel Round
      </Button>
      <Dialog open={this.state.deleteOpen} onClose={this.handleClose} aria-labelledby="cancel-dialog-title"
          aria-describedby="cancel-dialog-description">
        <DialogTitle id="cancel-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="cancel-dialog-description">
              Canceling this round will permanently remove it from your history.  I am sure I would like to cancel this round.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              No
            </Button>
            <Button onClick={(event) => this.deleteRound(this.props.round[0].round_id)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
      </Dialog>
      <Button onClick={this.handleSubmitOpen} variant="contained" style={{backgroundColor: "#11aa44"}}>
        Submit Round
      </Button>
      <Dialog open={this.state.submitOpen} onClose={this.handleClose} aria-labelledby="submit-dialog-title"
          aria-describedby="submit-dialog-description">
        <DialogTitle id="submit-dialog-title">{"Submit round?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="submit-dialog-description">
              Once submitted, round details cannot be changed.  The information entered is accurate and I wish to submit.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              No
            </Button>
            <Button onClick={(event) => this.submitRound(this.props.round[0].round_id)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
      </Dialog>
      </div>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  round: reduxStore.round
})

export default connect(putReduxStateOnProps)(Scorecard);