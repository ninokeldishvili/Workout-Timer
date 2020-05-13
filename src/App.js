import React, {Component,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        showButton: true,
        minutes: 0,
        seconds: 0,
        recover: 0,
    };
    this.updateTimer = this.updateTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.getMinutes=this.getMinutes.bind(this);
  }

  updateTimer = () =>{
    this.setState({
      showButton:false,
    });
    this.countdown();
  };

  countdown= () => {
    this.myInterval = setInterval(() => {
        const { seconds, minutes, recover } = this.state
        if (seconds===0 && minutes===0 && recover===0){
          clearInterval(this.myInterval)
        }

        if (seconds===0 && minutes===0){
          this.setState({ seconds:recover });
          this.countdown();
        }
        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(this.myInterval)
            } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
        } 
    }, 1000)
  };

  getMinutes= (e) => {
    this.setState({
      minutes: e.target.value
    })
  };

  getSeconds = (e) => {
    this.setState({
      seconds: e.target.value
    })
  }

  getRecover = (e) => {
    this.setState({
      recover: e.target.value
    })
  }

  stopTimer = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      recover: 0,
      showButton: true,
    })

  }

  render(){
    const { minutes, seconds, showButton } = this.state
    return(
      <div className="App container ">

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label>Minute:</label> <input type="text" value={this.state.minutes} onChange={this.getMinutes}/>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label>Seconds:</label> <input type="text" value={this.state.seconds} onChange={this.getSeconds}/>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <label>Recover:</label> <input type="text" value={this.state.recover} onChange={this.getRecover}/>
          </div>
        </div>
       

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="gif-frame">

            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="timer">
              {showButton && <button onClick={this.updateTimer}>START</button>}
              {!showButton && 
               (minutes === 0 && seconds === 0
                    ? <h1>Busted!</h1>
                    : <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>)
              }
               <button onClick={this.stopTimer}>stop</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
