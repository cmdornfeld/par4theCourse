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
    deleteOpen: false,
    submitOpen: false,
  };

  componentDidUpdate(prevProps){
      if(this.props.round !== prevProps.round){
      if(this.props.round.length === 9){
          this.setState({
              holeData: [
                  {hole1score: '', hole1comments: '', id: ''},
                  {hole2score: '', hole2comments: '', id: ''},
                  {hole3score: '', hole3comments: '', id: ''},
                  {hole4score: '', hole4comments: '', id: ''},
                  {hole5score: '', hole5comments: '', id: ''},
                  {hole6score: '', hole6comments: '', id: ''},
                  {hole7score: '', hole7comments: '', id: ''},
                  {hole8score: '', hole8comments: '', id: ''},
                  {hole9score: '', hole9comments: '', id: ''},
              ]
          })
      }
      else {
        this.setState({
            holeData: [
                {hole1score: '', hole1comments: '', id: ''},
                {hole2score: '', hole2comments: '', id: ''},
                {hole3score: '', hole3comments: '', id: ''},
                {hole4score: '', hole4comments: '', id: ''},
                {hole5score: '', hole5comments: '', id: ''},
                {hole6score: '', hole6comments: '', id: ''},
                {hole7score: '', hole7comments: '', id: ''},
                {hole8score: '', hole8comments: '', id: ''},
                {hole9score: '', hole9comments: '', id: ''},
                {hole10score: '', hole10comments: '', id: ''},
                {hole11score: '', hole11comments: '', id: ''},
                {hole12score: '', hole12comments: '', id: ''},
                {hole13score: '', hole13comments: '', id: ''},
                {hole14score: '', hole14comments: '', id: ''},
                {hole15score: '', hole15comments: '', id: ''},
                {hole16score: '', hole16comments: '', id: ''},
                {hole17score: '', hole17comments: '', id: ''},
                {hole18score: '', hole18comments: '', id: ''},
            ]
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
    console.log('Submitting info for round:', id);
    // this.props.dispatch({type: UPDATE_ROUND, payload: this.state.holeData});
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

  handleChange = (event, propertyName, id) => {
      console.log('logging change for propertyName:', propertyName);
      this.setState({
          holeData: {
          [propertyName]: event.target.value,
          id: id
          }
      })
  }
  

  render() {
    return (
      <>
      <div>
          {JSON.stringify(this.state)}
        <h1><b>Round Details</b></h1><br/>
          {JSON.stringify(this.props.round)}<br/>
          {JSON.stringify(this.props.round.length)}
          <h3>Course: {this.props.round.name}</h3>
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
              <td>{hole.number}</td>
              <td>{hole.par}</td>
              <td><input onChange={(event) => this.handleChange(event, `hole${hole.number}score`, hole.id)} type="number" /></td>
              <td><input onChange={(event) => this.handleChange(event, `hole${hole.number}comments`)}type="text" /></td>
            </tr>
            )
          })}
        </tbody>
      </table><br/>
      <Button onClick={this.handleCancelOpen} variant="contained">Cancel Round</Button>
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
      <Button onClick={this.handleSubmitOpen} variant="contained">Submit Round</Button>
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
      
      </>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  round: reduxStore.round
})

export default connect(putReduxStateOnProps)(Scorecard);