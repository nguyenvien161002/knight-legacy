import { useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import ThemeProvider from "react-bootstrap/ThemeProvider"
import classNames from "classnames/bind"
import style from "./Attack.module.scss"
import CountDownTime from "../../components/reuse/CountDownTime/CountDownTime"
import knightApi from "../../api/KnightApi"
import lose from "../../assets/images/lose.png"
import victory from "../../assets/images/victory.png"
import { useAppSelector } from "../../redux/hook"
import { useMetamark, useWeb3 } from "../../provider"
import { Loading } from "notiflix/build/notiflix-loading-aio"
import { Notify } from "notiflix"
import { DataKnight } from "../../type"
const cx = classNames.bind(style)

function Attack() {
  const [KnightsNotOwner, setKnightNotOwner] = useState<DataKnight[]>([])
  const [selectedKnight, setSelectedKnight] = useState<DataKnight>()
  const [myKnight, setMyKnight] = useState<DataKnight>()
  const [modalShow, setModalShow] = useState(false)
  const [modalAttack, setModalAttack] = useState(false)
  const [resoultAttack, setResoultAttack] = useState(false)
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
  }, [wallet])

  useEffect(() => {
    const modalAttackDom = document.getElementsByClassName("modal-content") as HTMLCollectionOf<HTMLElement>
    if (modalAttackDom.length > 0) {
      modalAttackDom[0].classList.add("bg-transparent")
    }
    console.log(modalAttackDom)
  }, [modalAttack])

  const handleShowModal = (isShow: boolean, selectedKnight: DataKnight) => {
    setModalShow(isShow)
    setSelectedKnight(selectedKnight)
  }
  const handleHiddenModal = () => {
    setModalShow(!modalShow)
    setMyKnight(undefined)
    setSelectedKnight(undefined)
  }
  const handleAttack = () => {
    setModalShow(false)
    if (myKnight == undefined) {
      Notify.warning("Chose your Knight")
    } else {
      Loading.arrows("Attack...")
      contract.methods
        .attack(myKnight?.knightID, selectedKnight?.knightID)
        .send({ from: wallet.value })
        .then((data: any) => {
          console.log(data)
          setModalAttack(!modalAttack)
          if (data.events.battleResults.returnValues[0] == true) {
            console.log("attack win")
            setResoultAttack(true)
          } else {
            console.log("attack lose")
            setResoultAttack(false)
          }
          Loading.remove()
        })
        .catch((error: any) => {
          console.log(error)
          Loading.remove()
        })
    }
  }

  return (
    <ThemeProvider breakpoints={["xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
      <div className={cx("container")}>
        {KnightsNotOwner.map((knight) => (
          <div className={cx("card")} key={knight.dna}>
            <img src={knight.image} alt="" className={cx("card-img")} />
            <div className={cx("card-id")}> ID: {knight.knightID}</div>
            <button className={cx("card-button")} onClick={() => handleShowModal(true, knight)}>
              Attack
            </button>
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
              {knightsOwner.value.map((knight) => (
                <div
                  className={cx("card", knight.knightID === myKnight?.knightID ? "active" : "")}
                  onClick={() => setMyKnight(knight)}
                  key={knight._id}
                >
                  <h3 className={cx("title")}>{knight.name}</h3>
                  <div className={cx("attack-time")}>
                    <CountDownTime time={knight.attackTime}></CountDownTime>
                  </div>
                  <div className={cx("info")}>
                    <div className={cx("level")}> Level: {selectedKnight?.level}</div>
                    <div className={cx("win-count")}> Win: {selectedKnight?.winCount}</div>
                    <div className={cx("lost-count")}> Lost: {selectedKnight?.lostCount}</div>
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
          <div className={cx("btn-container")}>
            <div className={cx("btn")} onClick={handleAttack}>
              <div className={cx("inner")}></div>
              <button>Attack</button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={modalAttack} onHide={() => setModalAttack(!modalAttack)}>
        <Modal.Body className={cx("modal-attack")}>
          <img src={resoultAttack ? victory : lose} alt="" />
          <h3 className={cx("notifi")}>
            {" "}
            Congratulations to your knight on victory <br /> visit profile to get new knight{" "}
          </h3>
          <Button className={cx("btn-accept")} onClick={() => setModalAttack(!modalAttack)}>
            {" "}
            Accept{" "}
          </Button>
        </Modal.Body>
      </Modal>
    </ThemeProvider>
  )
}
export default Attack
