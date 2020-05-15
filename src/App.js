import React, { Component, useState } from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerOn: false,
            minutes: 0,
            seconds: 0,
            recover: 0,
            mins: 0,
            secs: 0,
            rec: 0,
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
            const { seconds, minutes, recover, secs, mins, rec, timerOn } = this.state
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
                    }))
                }
                else if (minutes === 0 && recover === 0) {
                    clearInterval(this.myInterval)
                }
                else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
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

    render() {
        const { minutes, seconds, recover, timerOn } = this.state
        return (
            <div className="App container ">

                <div className="row">
                    <div className="col-lg-4 col-md- col-sm-12">
                        <label>Minute:</label> <input type="text" value={this.state.mins} onChange={this.getMinutes} />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <label>Seconds:</label> <input type="text" value={this.state.secs} onChange={this.getSeconds} />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <label>Recover:</label> <input type="text" value={this.state.rec} onChange={this.getRecover} />
                    </div>
                </div>



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
                                    : (minutes === 0 && seconds === 0 ? <span>{minutes}:{recover < 10 ? `0${recover}` : recover}</span>
                                        : <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>))
                            }
                        </div>
                        <div className="col-3 start-btn">
                            {!timerOn ? <button onClick={this.updateTimer}>START</button> : <button onClick={this.stopTimer}>stop</button>}
                        </div>
                    </div>
                    <div className="gif-frame">
                    </div>
                </div>
            </div>
        )
    }
}
export default App;
