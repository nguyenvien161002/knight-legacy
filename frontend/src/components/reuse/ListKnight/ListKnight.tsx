import { useState, useEffect } from "react";
import style from "./ListKnight.module.scss";
import ahir from "../../../assets/images/ahir-png.png";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface DataKnight {
  dna: string,
  excitementPoint: string,
  gender: string,
  level: string,
  lostCount: string,
  name:string,
  readyTime: string,
  sexTime: string,
  winCount: string,
}
type Props = {
  data: DataKnight[] | undefined;
};
const TimeDown = (props :any) => {
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
      let D = parseInt(props.time) + 86400 - now ;
      let days = Math.floor(D/(60*60*24));
      let hours = Math.floor(D/(60*60));
      let minutes = Math.floor(D/(60));
      let seconds = Math.floor(D);
  
      hours %= 24;
      minutes %= 60;
      seconds %= 60;
      
      console.log(seconds , D)
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

const ListKnight = ({ data }: Props) => {
  console.log(data);
  return (
    <div className={cx("card-container")}>
      {data?.map((knight) => {
        return (
          <div key={knight.dna} className={cx("card-item")}>
            <div className={cx("card-image")}>
              <img src={ahir} height="100%" alt="" />
            </div>
            <div className={cx("card-content")}>
              <div className={cx("card-title", "flex-card")}>
                <h1>{knight.name}</h1>
                <h3>65</h3>
              </div>
              <div className={cx("card-info")}>
                <div className={cx("info")}>
                    <h4> Gender </h4>
                    <p> { knight.gender == "1" ? "Male" : "Famale" }</p>
                </div>
                <div className={cx("info")}>
                    <h4> Level </h4>
                    <p> { knight.level}</p>
                </div>
                <div className={cx("info")}>
                    <h4>Attack Time</h4>
                    <TimeDown time={knight.readyTime}></TimeDown>
                </div>
              </div>
              <div className={cx("card-submit", "flex-card")}>
                <button className={cx("card-button", "active")}>
                  Details info 
                </button>
                <button className={cx("card-button")}>
                  History
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListKnight;
