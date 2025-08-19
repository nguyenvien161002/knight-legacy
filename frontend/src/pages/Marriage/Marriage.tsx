import style from "./Marriage.module.scss"
import ahir from "../../assets/images/ahir-png.png"
import { Button } from "react-bootstrap"
import { useWeb3 } from "../../provider"
import { useAppSelector } from "../../redux/hook"
import classNames from "classnames/bind"
import ListKnight from "../../components/reuse/ListKnight/ListKnight"
import knightApi from "../../api/KnightApi"
import { useEffect, useState } from "react"
import { Notify, Loading } from "notiflix"
import { DataRequestMarry } from "../../type"
import CountDownTime from "../../components/reuse/CountDownTime/CountDownTime"

const cx = classNames.bind(style)

function Marriage() {
  const { wallet } = useAppSelector((state) => state)
  const { contract, web3 } = useWeb3()
  const [requestMarry, setRequestMarry] = useState<any>()
  const [render, setRender] = useState(false)
  useEffect(() => {
    knightApi
      .getRequestMarry({ owner: wallet.value.toLowerCase() })
      .then((res: any) => {
        setRequestMarry(res.data)
      })
      .catch((erorr: any) => console.log(erorr))
  }, [wallet.value, render])
  const handleApproveMarry = (idKnightRequest: number, idKnightResponse: number, result: boolean) => {
    Loading.arrows("Handle send answer...")
    contract.methods
      .approveMarry(idKnightRequest.toString(), idKnightResponse.toString(), result)
      .send({
        from: wallet.value,
      })
      .then((data: any) => {
        if (data.events.ApprovalMarry.returnValues) {
          const params = {
            idKnightRequest: data.events.ApprovalMarry.returnValues._knightFatherID,
            idKnightResponse: data.events.ApprovalMarry.returnValues._knightMotherID,
          }
          knightApi.updateRequestMarry(params).then((data: any) => setRender(!render))
          Notify.success("Send data success")
        } else {
          Notify.failure("Can't send data")
        }
        Loading.remove()
      })
      .catch((error: any) => {
        console.log(error)
        Loading.remove()
      })
  }
  const handleDestroyMarry = (idKnightRequest: number, idKnightResponse: number) => {
    Loading.arrows("Handle destroy marry...")
    contract.methods
      .destroyMarry(idKnightRequest.toString(), idKnightResponse.toString())
      .send({
        from: wallet.value,
      })
      .then((data: any) => {
        const params = {
          idKnightRequest,
          idKnightResponse,
        }
        knightApi
          .destroyMarry(params)
          .then((data: any) => {
            Notify.success("Send data success")
            setRender(!render)
          })
          .catch((error: any) => console.log(error))
        Loading.remove()
      })
      .catch((error: any) => {
        console.log(error)
        Loading.remove()
      })
  }

  const handleInterCourse = (idKnightRequest: number, idKnightResponse: number) => {
    Loading.arrows("Handle InterCourse...")
    contract.methods
      .interCourseKnight(idKnightRequest.toString(), idKnightResponse.toString())
      .send({
        from: wallet.value,
      })
      .then((data: any) => {
        console.log(data)
        const params = {
          name: data.events.NewKnight.returnValues.name,
          dna: data.events.NewKnight.returnValues.dna,
          knightID: data.events.NewKnight.returnValues.knightID,
          level: data.events.NewKnight.returnValues.level,
          attackTime: data.events.NewKnight.returnValues.readyTime,
          sexTime: data.events.NewKnight.returnValues.sexTime,
          owner: data.events.NewKnight.returnValues.owner.toLowerCase(),
          tokenURI: data.events.NewKnight.returnValues.tokenURI,
        }
        knightApi
          .storeKnight(params)
          .then((data: any) => {
            Notify.success("Send data success")
            setRender(!render)
          })
          .catch((error: any) => console.log(error))
        data.events.TriggerTired.forEach((element: any) => {
          knightApi.triggerTired({ knightID: element.returnValues._knightID, timeOut: element.returnValues._timeOut })
        })
        Loading.remove()
      })
      .catch((error: any) => {
        console.log(error)
        Loading.remove()
      })
  }

  const isReadySex = (timeOne: number, timeTwo: number): boolean => {
    const now = Math.floor(new Date().getTime() / 1000)

    return timeOne <= now && timeTwo <= now
  }

  return (
    <div className={cx("profile")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          {requestMarry == undefined
            ? " "
            : requestMarry.map((request: DataRequestMarry) => {
                return (
                  <div key={request.id} className={cx("content__profile")}>
                    <ListKnight data={[request.knightRequest]}></ListKnight>
                    <div className={cx("info-request")}>
                      <h4>{request.status == "Married" ? "Two knights are married" : "Two unmarried knights"}</h4>
                      <p> Amount Gift: {web3.utils.fromWei(request.amountGift, "ether")} ETH </p>
                      {request.status == "Pending" && request.ownerResponse == wallet.value.toLowerCase() ? (
                        <>
                          <Button
                            className={cx("btn-accept")}
                            onClick={() => handleApproveMarry(request.idKnightRequest, request.idKnightResponse, true)}
                          >
                            {" "}
                            Accept marriage{" "}
                          </Button>
                          <Button
                            className={cx("btn-reject")}
                            onClick={() => handleApproveMarry(request.idKnightRequest, request.idKnightResponse, false)}
                          >
                            {" "}
                            Reject marriage{" "}
                          </Button>
                        </>
                      ) : (
                        ""
                      )}
                      {(request.ownerRequest == wallet.value.toLowerCase() && request.status == "Pending") ||
                      request.status == "Married" ? (
                        <Button
                          className={cx("btn-destroy")}
                          onClick={() => handleDestroyMarry(request.idKnightRequest, request.idKnightResponse)}
                        >
                          {" "}
                          Destroy marriage
                        </Button>
                      ) : (
                        ""
                      )}
                      {request.status == "Married" &&
                      isReadySex(request.knightRequest.sexTime, request.knightResponse.sexTime) ? (
                        <Button
                          className={cx("btn-accept")}
                          onClick={() => handleInterCourse(request.idKnightRequest, request.idKnightResponse)}
                        >
                          {" "}
                          Intercourse Knight{" "}
                        </Button>
                      ) : (
                        <CountDownTime time={request.knightRequest.sexTime}></CountDownTime>
                      )}
                    </div>
                    <ListKnight data={[request.knightResponse]}></ListKnight>
                  </div>
                )
              })}
        </div>
        <div className={cx("aside-left")}>
          <div className={cx("statistics")}>
            <div className={cx("statistics__heading", "flex-div")}>
              <h1>Statistics</h1>
              <a href="#" className={cx("color-global")}>
                View more
              </a>
            </div>
            <div className={cx("statistics__item", "flex-div")}>
              <p>Artwork Sold</p>
              <p>187</p>
            </div>
            <div className={cx("statistics__item", "flex-div")}>
              <p>Artwork Cancel</p>
              <p>5</p>
            </div>
            <div className={cx("statistics__item", "flex-div")}>
              <p>Total Earning</p>
              <p>262 ETH</p>
            </div>
          </div>
          <div className={cx("list-seller")}>
            <div className={cx("list-seller__heading")}>
              <h1>Top Seller</h1>
              <a href="#" className={cx("color-global")}>
                View more
              </a>
            </div>
            {/* Seller item 1 */}
            <div className={cx("flex-div", "list-seller__item")}>
              <div>
                <img src={ahir} height="100%" alt="" />
                <div>
                  <h2>Jane Cooper</h2>
                  <h3>@Jane18</h3>
                </div>
              </div>
              <a href="#">Follow</a>
            </div>
            {/* Seller item 2 */}
            <div className={cx("flex-div", "list-seller__item")}>
              <div>
                <img src={ahir} height="100%" alt="" />
                <div>
                  <h2>Jane Cooper</h2>
                  <h3>@Jane18</h3>
                </div>
              </div>
              <a href="#">Follow</a>
            </div>
            {/* Seller item 3 */}
            <div className={cx("flex-div", "list-seller__item")}>
              <div>
                <img src={ahir} height="100%" alt="" />
                <div>
                  <h2>Jane Cooper</h2>
                  <h3>@Jane18</h3>
                </div>
              </div>
              <a href="#">Follow</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marriage
