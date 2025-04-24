import React, { useState, useEffect } from "react";


function DigitalClock(){

    const [time, setTime] = useState(new Date());



    //useEffect helps manages side effects. takes in a callback and dependency ([] means onyl on mount, no array means every render)
    useEffect(() =>{
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000); //updates the time every second. setInterval shcedules a callback every x milliseconds

        return () => {
            clearInterval(intervalId); //whne the component unmounts, we want to clear it
        }
    } , []); //used when teh componenent mounts, renders, or some value updates. start timer only when we mount the component



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

    return(
        <div className="clock-container">
            <div className="clock-display">
                <span>{formatTime()}</span>
            </div>
        </div> 
    )
}

export default DigitalClock;