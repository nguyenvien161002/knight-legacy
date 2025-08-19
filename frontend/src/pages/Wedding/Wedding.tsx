import { useState, useEffect, ReactNode } from "react"
import { Modal, Button, InputGroup, Form } from "react-bootstrap"
import ThemeProvider from "react-bootstrap/ThemeProvider"
import classNames from "classnames/bind"
import style from "./Wedding.module.scss"
import CountDownTime from "../../components/reuse/CountDownTime/CountDownTime"
import knightApi from "../../api/KnightApi"
import { useAppSelector } from "../../redux/hook"
import { useMetamark, useWeb3 } from "../../provider"
import { Loading } from "notiflix/build/notiflix-loading-aio"
import { Notify } from "notiflix"
import { DataKnight } from "../../type"
import Web3 from "web3"
const cx = classNames.bind(style)

function Wedding() {
  const [KnightsNotOwner, setKnightNotOwner] = useState<DataKnight[]>([])
  const [selectedKnight, setSelectedKnight] = useState<DataKnight>()
  const [myKnight, setMyKnight] = useState<DataKnight>()
  const [modalShow, setModalShow] = useState(false)
  const [modalWedding, setModalWedding] = useState(false)
  const [amountGift, setAmountGift] = useState("")
  const { wallet, knightsOwner } = useAppSelector((state) => state)
  const { ellipsisAddress } = useMetamark()
  const { contract } = useWeb3()
  useEffect(() => {
    knightApi
      .getKnightNotOwwner({ owner: wallet.value })
      .then((res: any) => {
        setKnightNotOwner(res.knightsNotOwner)
      })
      .catch((error) => console.log(error))
  }, [wallet.value])
  useEffect(() => {
    const modalWeddingDom = document.getElementsByClassName("modal-content") as HTMLCollectionOf<HTMLElement>
    if (modalWeddingDom.length > 0) {
      modalWeddingDom[0].classList.add("bg-transparent")
    }
  }, [modalWedding])

  const handleShowModal = (isShow: boolean, selectedKnight: DataKnight) => {
    setModalShow(isShow)
    setSelectedKnight(selectedKnight)
  }
  const handleHiddenModal = () => {
    setModalShow(!modalShow)
    setMyKnight(undefined)
    setSelectedKnight(undefined)
  }
  const handleWedding = () => {
    setModalShow(false)
    if (myKnight == undefined) {
      Notify.warning("Chose your Knight")
    } else if (parseFloat(amountGift) <= 0.006) {
      console.log(parseFloat(amountGift))
      handleHiddenModal()
      Notify.warning("Please, enter amount gift more than 0.006 ether")
    } else {
      Loading.arrows("Handle send request marry...")
      contract.methods
        .requestMarry(myKnight?.knightID, selectedKnight?.knightID)
        .send({
          from: wallet.value,
          value: Web3.utils.toWei(amountGift, "ether"),
        })
        .then((data: any) => {
          console.log(data)
          setModalWedding(!modalWedding)
          if (data.events.RequestMarry.returnValues) {
            const params = {
              idKnightRequest: data.events.RequestMarry.returnValues._knightFatherID,
              idKnightResponse: data.events.RequestMarry.returnValues._knightMotherID,
              ownerResponse: data.events.RequestMarry.returnValues._to,
              ownerRequest: data.events.RequestMarry.returnValues._from,
              amountGift: data.events.RequestMarry.returnValues.amountGift,
            }
            knightApi.storeRequestMarry(params)
            Notify.success("Send data success")
            setAmountGift("")
          } else {
            Notify.failure("Can't send data")
          }
          Loading.remove()
        })
        .catch((error: any) => {
          console.log(error)
          Notify.warning(error.message)
          Loading.remove()
        })
    }
  }

  return (
    <ThemeProvider breakpoints={["xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
      <div className={cx("container")}>
        {KnightsNotOwner.filter((knight) => {
          if (knight.maritalStatus === false) {
            return true
          }
          return false
        }).map((knight) => (
          <div className={cx("card")} key={knight.knightID}>
            <a href={knight.permaLink} target="_blank">
              <img src={knight.image} alt="" className={cx("card-img")} />
              <div className={cx("card-id")}> ID: {knight.knightID}</div>

              <div className={cx("card-data")}>
                <div className={cx("card-title")}>{knight.name}</div>
                <span className={cx("card-level")}>Level {knight.level}</span>
                <div className={cx("card-description")}>
                  <div>Dna: {knight.dna}</div>
                  <div>Win count: {knight.winCount}</div>
                  <div>Lost count: {knight.lostCount}</div>
                  <div>Onwer: {ellipsisAddress(knight.owner)}</div>
                </div>
              </div>
            </a>
            <button className={cx("card-button")} onClick={() => handleShowModal(true, knight)}>
              Request Marry
            </button>
          </div>
        ))}
      </div>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleHiddenModal}
      >
        <div className={cx("modal-container", "show")}>
          <div className={cx("modal-wrapper")}>
            <div className={cx("list-competior")}>
              <div className={cx("card")}>
                <h3 className={cx("title")}>{selectedKnight?.name}</h3>
                <h3 className={cx("level")}>Level: {selectedKnight?.level} </h3>
                <div className={cx("info")}>
                  <div className={cx("win-count")}> Win: {selectedKnight?.winCount}</div>
                  <div className={cx("lost-count")}> Lost: {selectedKnight?.lostCount}</div>
                </div>
                <div className={cx("bar")}>
                  <div className={cx("emptybar")}></div>
                  <div className={cx("filledbar")}></div>
                </div>
                <div className={cx("circle")}>
                  <img src={selectedKnight?.image} alt="" className={cx("card-img")} />
                </div>
              </div>
            </div>
            <h1>VS</h1>
            <div className={cx("list-owner")}>
              {knightsOwner.value
                .filter((knight) => {
                  if (knight.maritalStatus == false) {
                    return true
                  }
                  return false
                })
                .map((knight) => (
                  <div
                    className={cx("card", knight.knightID === myKnight?.knightID ? "active" : "")}
                    onClick={() => setMyKnight(knight)}
                    key={knight._id}
                  >
                    <h3 className={cx("title")}>{knight.name}</h3>
                    <div className={cx("Wedding-time")}>
                      <CountDownTime time={knight.sexTime}></CountDownTime>
                    </div>
                    <div className={cx("info")}>
                      <div className={cx("level")}> Level: {knight?.level}</div>
                      <div className={cx("win-count")}> Win: {knight?.winCount}</div>
                      <div className={cx("lost-count")}> Lost: {knight?.lostCount}</div>
                    </div>
                    <div className={cx("bar")}>
                      <div className={cx("emptybar")}></div>
                      <div className={cx("filledbar")}></div>
                    </div>
                    <div className={cx("circle")}>
                      <img src={knight.image} alt="" className={cx("card-img")} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={cx("input-gift")}>
            <Form.Label htmlFor="inputPassword5" className={cx("input-label")}>
              Gift amount for request marry
            </Form.Label>
            <Form.Control
              type="text"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              className={cx("input-text")}
              onChange={(e) => setAmountGift(e.target.value)}
              placeholder="Enter your amount gift (> 0.006 ether)"
            />
            {/* <Form.Text id="passwordHelpBlock" muted>
                                Your password must be 8-20 characters long, contain letters and numbers,
                                and must not contain spaces, special characters, or emoji.
                            </Form.Text> */}
          </div>
          <div className={cx("btn-container")}>
            <div className={cx("btn")} onClick={handleWedding}>
              <div className={cx("inner")}></div>
              <button>Wedding</button>
            </div>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  )
}
export default Wedding
