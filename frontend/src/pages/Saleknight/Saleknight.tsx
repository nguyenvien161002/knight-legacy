import { useState, useEffect } from "react"
import { Button, Modal } from "react-bootstrap"
import ThemeProvider from "react-bootstrap/ThemeProvider"
import classNames from "classnames/bind"
import { useWeb3 } from "../../provider"
import { useAppSelector } from "../../redux/hook"
import style from "./SaleKnight.module.scss"
import CountDownTime from "../../components/reuse/CountDownTime/CountDownTime"
const cx = classNames.bind(style)

function SaleKnight() {
  const [modalShow, setModalShow] = useState(false)
  interface Knight {
    price: String
    time: string
  }
  const [inputKnight, setInputKnight] = useState<Knight>({
    price: "",
    time: "3600",
  })
  const { knightsOwner, wallet } = useAppSelector((state) => state)
  const [knightID, setKnightID] = useState(0)
  const { contract, web3 } = useWeb3()
  const handleInput = (e: any) => {
    setInputKnight({
      ...inputKnight,
      [e.target.name]: e.target.value,
    })
  }
  const saleKnight = (e: any) => {
    e.preventDefault()
    contract?.methods
      .saleKnight(knightID.toString(), web3.utils.toWei(inputKnight.price.toString(), "ether"), inputKnight.time)
      .send({ from: wallet.value })
      .then((data: any) => console.log(data))
      .catch((err: any) => console.log(err))
  }
  const handleShowModal = (id: number) => {
    setModalShow(true)
    setKnightID(id)
  }
  return (
    <ThemeProvider breakpoints={["xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
      <div className={cx("container")}>
        {knightsOwner.value
          ? knightsOwner.value.map((knight) => {
              return (
                <div className={cx("card")} key={knight.dna}>
                  <a href={knight.permaLink} target="_blank">
                    <img src={knight.image} alt="" className={cx("card-img")} />
                    <div className={cx("card-id")}> ID: {knight.knightID}</div>

                    <div className={cx("card-data")}>
                      <div className={cx("card-title")}>{knight.name}</div>
                      <span className={cx("card-level")}>Level {knight.level}</span>
                      <div className={cx("card-description")}>
                        <div>Dna: {knight.dna}</div>
                        <span>
                          Attack Time: <CountDownTime time={knight.attackTime}> </CountDownTime>
                        </span>
                        <span>
                          Sex Time: <CountDownTime time={knight.sexTime}> </CountDownTime>
                        </span>
                      </div>
                    </div>
                  </a>
                  {knight.isSalling ? (
                    <Button className={cx("card-button")}> Knight is Salling </Button>
                  ) : (
                    <button className={cx("card-button")} onClick={() => handleShowModal(knight.knightID)}>
                      Sale
                    </button>
                  )}
                </div>
              )
            })
          : ""}
        <Modal show={modalShow} onHide={() => setModalShow(false)} className={cx("content-modal")}>
          <Modal.Body className={cx("modal-body")}>
            <div className={cx("main")}>
              <form action="" method="POST" className={cx("form")}>
                <h3 className={cx("heading")}>Sale Knight</h3>
                <div className={cx("spacer")}></div>

                <div className={cx("form-group")}>
                  <label htmlFor="price" className={cx("form-label")}>
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    onChange={handleInput}
                    placeholder="Enter price...(ether)"
                    className={cx("form-control")}
                  />
                </div>
                <div className={cx("form-group")}>
                  <label htmlFor="time" className={cx("form-label")}>
                    Time end
                  </label>
                  <select id="time" name="time" onChange={handleInput} className={cx("form-control")}>
                    <option value="3600">1 hours</option>
                    <option value="43200"> 12 hours</option>
                    <option value="86400"> 1 days</option>
                  </select>
                </div>

                <button className={cx("form-submit")} onClick={saleKnight}>
                  Sale
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </ThemeProvider>
  )
}
export default SaleKnight
