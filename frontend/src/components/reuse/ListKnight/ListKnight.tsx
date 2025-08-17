import { useState, useEffect } from "react"
import style from "./ListKnight.module.scss"
import ahir from "../../../assets/images/ahir-png.png"
import classNames from "classnames/bind"
import CountDownTime from "../CountDownTime/CountDownTime"
const cx = classNames.bind(style)

interface DataKnight {
  dna: string
  excitementPoint: string
  gender: string
  level: string
  lostCount: string
  name: string
  readyTime: string
  sexTime: string
  winCount: string
}
type Props = {
  data: DataKnight[] | undefined
}

const ListKnight = ({ data }: Props) => {
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
                  <p> {knight.gender == "1" ? "Male" : "Famale"}</p>
                </div>
                <div className={cx("info")}>
                  <h4> Level </h4>
                  <p> {knight.level}</p>
                </div>
                <div className={cx("info")}>
                  <h4>Attack Time</h4>
                  <CountDownTime time={knight.readyTime}></CountDownTime>
                </div>
              </div>
              <div className={cx("card-submit", "flex-card")}>
                <button className={cx("card-button", "active")}>Details info</button>
                <button className={cx("card-button")}>History</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListKnight
