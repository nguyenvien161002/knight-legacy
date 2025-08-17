import { useState, useEffect } from "react"
import style from "./ListKnight.module.scss"
import classNames from "classnames/bind"
import CountDownTime from "../CountDownTime/CountDownTime"
const cx = classNames.bind(style)

interface DataKnight {
  _id: string
  name: string
  owner: string
  knightID: number
  tokenURI: string
  dna: string
  image: string
  createdAt: string
  updatedAt: string
  attackTime: number
  level: number
  lostCount: number
  sexTime: number
  winCount: number
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
              <img src={knight.image} height="100%" alt="" />
            </div>
            <div className={cx("card-content")}>
              <div className={cx("card-title", "flex-card")}>
                <h1>{knight.name}</h1>
                <h3>{knight.knightID}</h3>
              </div>
              <div className={cx("card-info")}>
                <div className={cx("info")}>
                  <h4> Dna </h4>
                  <p> {knight.dna}</p>
                </div>
                <div className={cx("info")}>
                  <h4> Level </h4>
                  <p> {knight.level}</p>
                </div>
                <div className={cx("info")}>
                  <h4>Attack Time</h4>
                  <CountDownTime time={knight.attackTime}></CountDownTime>
                </div>
                <div className={cx("info")}>
                  <h4>Sex Time</h4>
                  <CountDownTime time={knight.sexTime}></CountDownTime>
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
