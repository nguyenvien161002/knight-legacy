import { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
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

  const [show, setShow] = useState(false)
  const [oldName, setOldName] = useState("")
  const [newName, setNewName] = useState("")
  const handleClose = () => setShow(false)
  const handleShow = (nameKnight: any) => {
    setShow(true)
    setOldName(nameKnight)
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
                <button className={cx("card-button", "active")} onClick={() => handleShow(knight.name)}>
                  Change name
                </button>
                <button className={cx("card-button")}>Level up</button>
              </div>
            </div>
          </div>
        )
      })}
      <>
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body>
            <div className={cx("modal-container")}>
              <div className={cx("inputBox")}>
                <input required={true} value={oldName} />
                <span>Old Name</span>
              </div>
              <div className={cx("inputBox")}>
                <input required={true} onChange={(e) => setNewName(e.target.value)} />
                <span>New Name</span>
              </div>
              <div className={cx("inputBox")}>
                <button className={cx("form-submit")}>Change name</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  )
}

export default ListKnight
