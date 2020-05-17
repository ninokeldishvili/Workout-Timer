import React, { Component, useState } from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerOn: false,
            recoveryTime: false,
            minutes: 0,
            seconds: 0,
            recover: 0,
            mins: 0,
            secs: 0,
            rec: 0,
            randomGif: 0,
        };
        this.updateTimer = this.updateTimer.bind(this);
        this.countdown = this.countdown.bind(this);
        this.getMinutes = this.getMinutes.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    updateTimer = () => {
        this.setState({
            timerOn: true,
        });
        this.countdown();
    };

    countdown = () => {
        this.myInterval = setInterval(() => {
            const { seconds, minutes, recover, secs, mins, rec, timerOn, recoveryTime } = this.state
            if (secs === 0 && mins === 0 && rec === 0) {
                clearInterval(this.myInterval)
            }
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1,
                }))
            }
            if (seconds === 0) {
                if (minutes === 0 && recover > 0) {
                    this.setState(({ recover }) => ({
                        recover: recover - 1,
                        recoveryTime: true,
                    }))
                }
                else if (minutes === 0 && recover === 0) {
                    clearInterval(this.myInterval)
                    this.setState({
                        recoveryTime: false,
                        randomGif: this.getRandomGif(),
                    })
                }
                else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59,
                        recoveryTime: false,
                    }))
                }
            }

            if (seconds === 0 && minutes === 0 && recover === 0 && timerOn) {
                this.setState({
                    seconds: secs,
                    minutes: mins,
                    recover: rec,
                });
                this.countdown();
            }

        }, 1000)
    };

    getMinutes = (e) => {
        this.setState({
            mins: e.target.value,
            minutes: e.target.value,
        })
    };

    getSeconds = (e) => {
        this.setState({
            seconds: e.target.value,
            secs: e.target.value
        })
    }

    getRecover = (e) => {
        this.setState({
            recover: e.target.value,
            rec: e.target.value
        })
    }

    stopTimer = () => {
        this.setState({
            minutes: 0,
            seconds: 0,
            recover: 0,
            mins: 0,
            secs: 0,
            rec: 0,
            timerOn: false,
        })

    }

    getRandomGif = () =>{
        //returns random number from 0 to 20
       return Math.floor(Math.random() * Math.floor(19))+1;
    }

    render() {
        const { minutes, seconds, recover, timerOn, recoveryTime } = this.state
        return (
            <div className="App container">
                <div className="row">
                    <div className="timer-container row">
                        <div className="glass-hour col-3">
                            <img src={require('./images/hourglass.png')} />
                        </div>
                        <div className="timer col-6">
                            {!timerOn && '0:00'}
                            {timerOn &&
                                (minutes === 0 && seconds === 0 && recover === 0
                                    ? '0:00'
                                    : (recoveryTime ? <span className="recover-time">{minutes}:{recover < 10 ? `0${recover}` : recover}</span>
                                        : <span className="workout-time">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>))
                            }
                        </div>
                        <div className="col-3 action-continer">
                            Minutes:<input className="time-input" type="number" value={this.state.mins} onChange={this.getMinutes} /><hr />
                            Seconds:<input className="time-input" type="number" value={this.state.secs} onChange={this.getSeconds} /><hr />
                            Recover:<input className="time-input" type="number" value={this.state.rec} onChange={this.getRecover} /><hr />
                            {!timerOn ? <button className="start-btn" onClick={this.updateTimer}>START</button> 
                            : <button className="stop-btn" onClick={this.stopTimer}>STOP</button>}
                        </div>
                    </div>
                    <div className="gif-frame">
                            {recoveryTime ? 
                            <img src={require(`./images/gifs/recovery.gif`)}/>
                            : <img src={require(`./images/gifs/${this.state.randomGif}.gif`)} />}
                    </div>
                </div>
            </div>
        )
    }
}
export default App;
