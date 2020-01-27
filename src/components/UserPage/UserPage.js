import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_DETAILS'});
  }

  goToSetRoundDetails = () => {
    this.props.history.push('/new-round')
  }

  goToRoundDetails = (event, id) => {
    this.props.dispatch({type: 'GET_ROUND_DETAILS', payload: id})
    this.props.dispatch({type: 'GET_SCORE_TOTALS', payload: id})
    this.props.history.push('/details')
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.props.user.username}</h1><br/>
          <div className="button-container" >
            <Button onClick={this.goToSetRoundDetails} variant="contained" style={{backgroundColor: "#11aa44", fontSize: "20px"}}>
              Play golf
            </Button>
          </div>
          {/* {JSON.stringify(this.props.user)}<br/>
          {JSON.stringify(this.props.details)} */}
          <h3>Round History</h3>
          <div className="round-card-box">
          {this.props.details.map(round => (
            <div className="round-card" key={round.round_id}  onClick={(event) => this.goToRoundDetails(event, round.round_id)}>
              <CardContent >
                <b>{round.score}</b><br/><b>{round.name}</b>
              </CardContent>
            </div>
          ))}
          </div>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
  details: reduxStore.details,
  user: reduxStore.user
})

export default connect(putReduxStateOnProps)(UserPage);
