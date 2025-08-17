import {useEffect, useState} from 'react'
import style from "./CountDownTime.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
function CountDownTime(props : any) {
    type Time = {
        days: number,
        hours: number,
        minutes: number,
        seconds: number
      }
      const [coolDown, setCoolDown] = useState<Time>();
      useEffect(() => {
        let IDtime =  setInterval(()=>{
          let now = Math.floor(new Date().getTime()/1000);
          let D = (parseInt(props.time) + 86400 - now) < 0 ? 0 : parseInt(props.time) + 86400 - now ;
          let days = Math.floor(D/(60*60*24));
          let hours = Math.floor(D/(60*60));
          let minutes = Math.floor(D/(60));
          let seconds = Math.floor(D);
      
          hours %= 24;
          minutes %= 60;
          seconds %= 60;
          setCoolDown({
            days,
            hours,
            minutes,
            seconds
          })
        },1000)
        return () => {
          clearInterval(IDtime);
        }
      }, [coolDown])
      
      return (
        <div className={cx("time-down")}>
            <p><span id="days">{coolDown?.days}</span>D: </p> 
            <p><span id="hours">{coolDown?.hours}</span>H: </p>
            <p><span id="minutes">{coolDown?.minutes}</span>M: </p>
            <p><span id="minutes">{coolDown?.seconds}</span>S</p>
        </div>
      )
}

export default CountDownTime