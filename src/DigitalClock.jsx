import React, { useState, useEffect } from "react";

function DigitalClock(){
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [timer, setTimer] = useState(15); // minutes
    const [seconds, setSeconds] = useState(0); // separate state for seconds
    const [isRunning, setIsRunning] = useState(false);

    //useEffect helps manages side effects. takes in a callback and dependency ([] means onyl on mount, no array means every render)
    useEffect(() =>{
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000); //updates the time every second. setInterval shcedules a callback every x milliseconds

        return () => {
            clearInterval(intervalId); //whne the component unmounts, we want to clear it
        }
    } , []); //used when teh componenent mounts, renders, or some value updates. start timer only when we mount the component

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => {
            clearInterval(intervalId);
        }
    })

    // Timer countdown effect
    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setSeconds(() => {
                    if (seconds === 0) {
                        setTimer(() => {
                            if (timer === 0) {
                                setIsRunning(false);
                                return 0;
                            }
                            return timer - 1;
                        });
                        return 59;
                    }
                    return seconds - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, seconds, timer]);

    function formatDate(){
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${padZero(month)} , ${padZero(day)} , ${padZero(year)}`
    }

    function formatTime(){
        let hours = time.getHours(); //military time
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}` //backtick allows you to concatenate. $ allows you to embed variables
    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number //help pad teh zeroes so it looks better
    }

    function startTimer() {
        if (timer > 0) {
            setIsRunning(true);
        }
    }

    function pauseTimer() {
        setIsRunning(false);
    }

    function resetTimer() {
        setIsRunning(false);
        setTimer(15);
        setSeconds(0);
    }

    function handleTimerChange(e) {
        const value = parseInt(e.target.value) || 0;
        setTimer(Math.max(0, value));
        setSeconds(0);
    }

    // Format timer display in MM:SS
    function formatTimer() {
        return `${padZero(timer)}:${padZero(seconds)}`;
    }

    return(
        <div className="clock-container">
            <div className="clock-display">
                <span>{formatDate()}</span>
                <br></br>
                <span>{formatTime()}</span>
            </div>

            <div className="pomodoro-container">
                <div className="pomodoro-timer">
                    <input 
                        type="number" 
                        value={timer} 
                        onChange={handleTimerChange}
                        disabled={isRunning}
                        min="0"
                    />
                    <div className="timer-display">{formatTimer()}</div>
                    <button onClick={startTimer} disabled={isRunning || (timer === 0 && seconds === 0)}>Start</button>
                    <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
                    <button onClick={resetTimer}>Reset</button>
                </div>                    
            </div>
        </div> 
    )
}

export default DigitalClock;