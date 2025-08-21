import { useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import style from "./ListKnight.module.scss"
import classNames from "classnames/bind"
import CountDownTime from "../CountDownTime/CountDownTime"
import { DataKnight } from "../../../type"
import { useMetamark, useWeb3 } from "../../../provider"
import { useAppSelector, useAppDispatch } from "../../../redux/hook"
import { getKnightsOfOwner } from "../../../redux/KnightsOwnerReducer"
import { Loading } from "notiflix"
import knightApi from "../../../api/KnightApi"
const cx = classNames.bind(style)

type Props = {
  data: DataKnight[] | undefined
}

const ListKnight = ({ data }: Props) => {
  const { ellipsisAddress } = useMetamark()
  const wallet = useAppSelector((state) => state.wallet.value)
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const [oldName, setOldName] = useState("")
  const [newName, setNewName] = useState("")
  const [knightID, setKnightID] = useState(0)
  const { contract } = useWeb3()
  const handleClose = () => setShow(false)
  const handleShow = (nameKnight: any, knightID: number) => {
    setShow(true)
    setOldName(nameKnight)
    setKnightID(knightID)
  }
  const handleChangeName = () => {
    setShow(!show)
    Loading.arrows("Handle change name...")
    contract.methods
      .changeName(knightID.toString(), newName)
      .send({ from: wallet })
      .then((data: any) => {
        Loading.remove()
        return knightApi.changeName({ knightID, newName })
      })
      .then((dataSave: any) => {
        console.log(dataSave)
        dispatch(getKnightsOfOwner(wallet))
      })
      .catch((error: any) => {
        console.log(error)
        Loading.remove()
      })
  }
  const handleLevelUp = (knightID: number) => {
    Loading.arrows("Handle level up knight...")
    contract.methods
      .levelUp(knightID.toString())
      .send({ from: wallet, value: "1000000000000000" })
      .then((data: any) => {
        Loading.remove()
        return knightApi.levelUp({ knightID })
      })
      .then((dataSave: any) => {
        console.log(dataSave)
        dispatch(getKnightsOfOwner(wallet))
      })
      .catch((error: any) => {
        console.log(error)
        Loading.remove()
      })
  }

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
                  <div className={knight.isSalling ? cx("info", "sale", "cant") : cx("info", "sale", "can")}>
                    <h4> {knight.isSalling ? "Is Salling" : "Can Transfer"} </h4>
                  </div>
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
              {wallet.toLowerCase() == knight.owner ? (
                <div className={cx("card-submit", "flex-card")}>
                  <button
                    className={cx("card-button", "active", "change-name")}
                    onClick={() => handleShow(knight.name, knight.knightID)}
                  >
                    Change name
                  </button>
                  <button className={cx("card-button", "level-up")} onClick={() => handleLevelUp(knight.knightID)}>
                    Level up
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )
      })}
      <>
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body>
            <div className={cx("modal-container")}>
              <div className={cx("inputBox")}>
                <input required={true} value={oldName} readOnly />
                <span>Old Name</span>
              </div>
              <div className={cx("inputBox")}>
                <input required={true} onChange={(e) => setNewName(e.target.value)} />
                <span>New Name</span>
              </div>
              <div className={cx("inputBox")}>
                <button className={cx("form-submit")} onClick={handleChangeName}>
                  Change name
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  )
}

export default ListKnight
