import { useState, useEffect } from "react"
import style from "./ListKnight.module.scss"
import classNames from "classnames/bind"
import CountDownTime from "../CountDownTime/CountDownTime"
import { DataKnight } from "../../../type"
import { useMetamark } from "../../../provider"
const cx = classNames.bind(style)

type Props = {
  data: DataKnight[] | undefined
}

const ListKnight = ({ data }: Props) => {
  const { ellipsisAddress } = useMetamark()
  return (
    <div className={cx("card-container")}>
      {data?.map((knight) => {
        return (
          <div key={knight._id} className={cx("card-item")}>
            <div className={cx("card-image")}>
              <img src={knight.image} height="100%" alt="" />
            </div>
            <div className={cx("card-content")}>
              <a href={knight.permaLink} target="_blank">
                <div className={cx("card-title", "flex-card")}>
                  <h1>{knight.name}</h1>
                  <h3>{knight.knightID}</h3>
                </div>
                <div className={cx("card-info")}>
                  <div className={cx("info")}>
                    <h4> Owner: </h4>
                    <p> {ellipsisAddress(knight.owner)}</p>
                  </div>
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
              </a>
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
