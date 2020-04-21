import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  button: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  body: {
    textAlign: 'left'
  }
});

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      screen: 0,
    }
    //COMMENTING THIS OUT MEANS THAT THE WEBSITE ISN'T USING COOKIES ANYMORE, SO YOU HAVE TO START OVER 
    //PROGRESS IS NOT RECORDED  
   // this.checkCookies();
  }

  checkCookies = () => {
    if (this.props.cookies.get("started")) {
      console.log("Game detected.");
      this.state = {
        screen: -1
      }
    }
  }

  nextScreen = () => {
    if (this.state.screen === -1) {
      this.props.clearCookies();
    }
    if (this.state.screen === 2) {
      this.props.nextPage();
    }
    this.setState((state) => {return {screen: state.screen + 1}})
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.screen === -1 ? 
          <div>
            <h2>Welcome back {this.props.cookies.get("name")}</h2>
            We have detected that you have previously begun a game with Denise on this computer.
            <img src={require(`../../img/denise.jpg`)} width="80%" alt="Denise"/>
            <br/>
            Click continue to load your previous game or start over to begin a new game.
          </div>
        : ""}
        {this.state.screen === 0 ? 
          <div>
            Thanks for volunteering to help us test our program! This should take approximately 10-20 minutes. 
            <br /><br />
            Meet Denise, your teammate for today.
            <img src={require(`../../img/denise.jpg`)} width="80%" alt="Denise"/>
            <br/>
            Note that you must be playing the game on a computer/laptop (the site does not load correctly on mobile).
          </div> : ""}
        {this.state.screen === 1 ?
          <div>
            You and Denise will be representing the Interaction Lab in the Robot Olympics. 
            <br/>
            You will be serving as Denise’s teammate, working together with her to score as many points as possible.
            <br/>
            You will help Denise decide which feats to attempt.
            <br/>
            <img src={require(`../../img/robot_olympics.png`)} width="80%" alt="robot_olympics"/>
            <br/>
            Denise comes in a few flavors, each with its own strategy and capabilities.
            <br/> 
            <strong>Denise is aware of her own capabilities.</strong>
            <br/>
            We don’t know what version you’ll be working with, but we’re sure that you’re going to do great.
            </div> : ""}
        {this.state.screen === 2 ?
          <div>
          <p>
          The Olympics work in two stages. 
          Your team will be shown a few different challenges for Denise to attempt. 
          <br/>
          Each challenge, if completed successfully, will win a specified number of points for your team. 
          Failed attempts earn zero points.
          <br/><br/> 
          When you’re ready, we’ll show you the different challenges. 
          But first, let us know what your name is and whether it's your first time playing!
          </p>
          <strong>
          Please do not hit the back button in your browser. Your progress will be saved in your browser cookies if you need to leave in the middle.
          </strong>
          <br/>
          <TextField
            id="outlined-name"
            label="Name"
            defaultValue=""
            className={classes.textField}
            margin="normal"
            onChange={this.props.setName('name')}
            variant="outlined"
          />
          <br />
          <br />
          <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={this.props.validData}
              color="primary"
            />
          }
          label="This is my first time playing this game"
        />
          <br />
        </div> : ""}
        {this.state.screen === -1 ? 
        <Button variant="contained" color="primary" className={classes.button}
            onClick={this.props.loadCookies}>
            Continue
        </Button> : "" }
        <Button variant="contained" color="primary" className={classes.button}
            onClick={this.nextScreen}
            disabled={this.props.name.length <= 2 && this.state.screen === 2} >
            {this.state.screen === -1 ? "Start Over" : "Continue"}
          </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Intro);

