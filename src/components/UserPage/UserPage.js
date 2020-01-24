import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class InfoPage extends Component {
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
        <h1>Hello, <b>{this.props.user.username}</b></h1><br/>
          <button onClick={this.goToSetRoundDetails} className="start-button">
            Play golf
          </button><br/>
          {/* {JSON.stringify(this.props.user)}<br/>
          {JSON.stringify(this.props.details)} */}
          <div className="round-card-box">
          {this.props.details.map(round => (
            <div className="round-card" key={round.round_id}  onClick={(event) => this.goToRoundDetails(event, round.round_id)}>
              <CardContent >
                {round.score}<br/>{round.name}<br/>
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

export default connect(putReduxStateOnProps)(InfoPage);
