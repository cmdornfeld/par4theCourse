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

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_DETAILS'});
  }

  goToSetRoundDetails = () => {
    this.props.history.push('/new-round')
  }

  render() {
    return (
      <div>
        <p>Hello, <b>{this.props.user.username}</b></p><br/>
          <Button onClick={this.goToSetRoundDetails} className={this.props.classes.button} variant="contained">
            Start New Round
          </Button><br/>
          {JSON.stringify(this.props.user)}<br/>
          {JSON.stringify(this.props.details)}
          <div className="card">
          {this.props.details.map(round => (
            <Card key={round.round_id} className={this.props.classes.card}>
              <CardContent>
                {round.score}<br/>{round.name}<br/> Round ID: {round.round_id}
              </CardContent>
            </Card>
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

export default connect(putReduxStateOnProps)(withStyles(styles)(InfoPage));
