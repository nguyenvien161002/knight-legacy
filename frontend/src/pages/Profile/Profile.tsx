import Carousel from "react-bootstrap/Carousel"
import { useEffect, useState } from "react"
import style from "./Profile.module.scss"
import ahir from "../../assets/images/ahir-png.png"
import FormCreateKnight from "../../components/reuse/FormCreateKnight/FromCreateKnight"
import { useWeb3 } from "../../provider"
import { useAppSelector, useAppDispatch } from "../../redux/hook"
import { Form, Button } from "react-bootstrap"
import classNames from "classnames/bind"
import ListKnight from "../../components/reuse/ListKnight/ListKnight"
import ButtonConnect from "../../components/reuse/ButtonConnect/ButtonConnect"
import { InforTranferKnight } from "../../type"
import { Loading, Notify } from "notiflix"
import knightApi from "../../api/KnightApi"
import { getKnightsOfOwner } from "../../redux/KnightsOwnerReducer"
const cx = classNames.bind(style)
function IndividualIntervalsExample() {
  return (
    <div className={cx("banner")}>
      <Carousel>
        <Carousel.Item interval={4000}>
          <div className={cx("banner-content")}>
            <div className={cx("content")}>
              <h1>Round Hall</h1>
              <h2>1.5 ETH</h2>
              <h3>Uploaded by Alexander Vernof</h3>
              <div className={cx("banner-time")}>
                <a href="" style={{ "--clr": "#dc21a2" } as React.CSSProperties}>
                  <span>Bid now</span>
                  <i></i>
                </a>
                <div className={cx("time-paragraph")}>
                  <p>Ending In</p>
                  <p>2d:15h:20m</p>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <div className={cx("banner-content")}>
            <div className={cx("content")}>
              <h1>Round Hall</h1>
              <h2>1.5 ETH</h2>
              <h3>Uploaded by Alexander Vernof</h3>
              <div className={cx("banner-time")}>
                <a href="" style={{ "--clr": "#dc21a2" } as React.CSSProperties}>
                  <span>Bid now</span>
                  <i></i>
                </a>
                <div className={cx("time-paragraph")}>
                  <p>Ending In</p>
                  <p>2d:15h:20m</p>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <div className={cx("banner-content")}>
            <div className={cx("content")}>
              <h1>Round Hall</h1>
              <h2>1.5 ETH</h2>
              <h3>Uploaded by Alexander Vernof</h3>
              <div className={cx("banner-time")}>
                <a href="" style={{ "--clr": "#dc21a2" } as React.CSSProperties}>
                  <span>Bid now</span>
                  <i></i>
                </a>
                <div className={cx("time-paragraph")}>
                  <p>Ending In</p>
                  <p>2d:15h:20m</p>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
function Profile() {
  const { knightsOwner, wallet } = useAppSelector((state) => state)
  const { contract } = useWeb3()
  const [inforTranfer, setInforTranfer] = useState<InforTranferKnight>({
    sender: wallet.value,
    receiver: "",
    knightID: 0,
  })

  const dispatch = useAppDispatch()

  const handelInput = (e: any) => {
    setInforTranfer({
      ...inforTranfer,
      [e.target.name]: e.target.value,
    })
  }

  const handleTranfer = (e: any) => {
    e.preventDefault()
    Loading.arrows("Handle tranfer knight...")
    contract.methods
      .transferFrom(inforTranfer.sender.trim(), inforTranfer.receiver.trim(), inforTranfer.knightID.toString())
      .send({ from: wallet.value })
      .then((data: any) => {
        Loading.remove()
        Notify.success(`Transfer knight ${inforTranfer.knightID} successfully`)
        dispatch(getKnightsOfOwner(wallet.value))
      })
      .catch((error: any) => {
        Loading.remove()
        Notify.success(`Transfer knight ${inforTranfer.knightID} failure`)
        Notify.warning(`Error:  ${error.message} `)
      })
  }
  const handleApprove = (e: any) => {
    e.preventDefault()
    Loading.arrows("Handle tranfer knight...")
    contract.methods
      .approve(inforTranfer.receiver.trim(), inforTranfer.knightID.toString())
      .send({ from: wallet.value })
      .then((data: any) => {
        Loading.remove()
        Notify.success(`Approved knight ${inforTranfer.knightID} successfully`)
      })
      .catch((error: any) => {
        Loading.remove()
        Notify.success(`Approved knight ${inforTranfer.knightID} failure`)
        Notify.warning(`Error:  ${error.message} `)
      })
  }

  return (
    <div className={cx("profile")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("carousel-container")}>
            <IndividualIntervalsExample />
          </div>
          <div className={cx("content__profile")}>
            <div className={cx("feed")}>
              <div className={cx("feed__option")}>
                <span>Feed</span>
                <select>
                  <option className={cx("option-feed")} value="">
                    Popular
                  </option>
                  <option className={cx("option-feed")} value="">
                    Popular
                  </option>
                  <option className={cx("option-feed")} value="">
                    Popular
                  </option>
                </select>
              </div>
              <div className={cx("feed__choice")}>
                <ul className={cx("feed__choice-list")}>
                  <li className={cx("feed__choice-list-item", "active")}>All</li>
                  <li className={cx("feed__choice-list-item")}>Illustration</li>
                  <li className={cx("feed__choice-list-item")}>Art</li>
                  <li className={cx("feed__choice-list-item")}>Game</li>
                </ul>
              </div>
            </div>
            {knightsOwner?.value?.length == 0 && wallet.value != "" ? <FormCreateKnight></FormCreateKnight> : " "}
            {knightsOwner?.value?.length != 0 ? <ListKnight data={knightsOwner.value}></ListKnight> : ""}
            {wallet.value == "" ? <ButtonConnect></ButtonConnect> : ""}
          </div>
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
          {wallet.value ? (
            <div className={cx("tranfer")}>
              <div className={cx("list-seller__heading")}>
                <h1>Transfer Knight</h1>
              </div>
              {/* Seller item 1 */}
              <div className={cx("")}>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>From:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handelInput}
                      name="sender"
                      defaultValue={wallet.value}
                      className={cx("input-address")}
                      placeholder="Enter addreass sender knight..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>To:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handelInput}
                      name="receiver"
                      className={cx("input-address")}
                      placeholder="Enter addreass receiver knight..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>knight ID:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handelInput}
                      name="knightID"
                      className={cx("input-address")}
                      placeholder="Enter knight id..."
                    />
                  </Form.Group>
                  <Button className={cx("btn-tranfer", "tranfer-from")} onClick={handleTranfer}>
                    {" "}
                    Transfer{" "}
                  </Button>
                  <Button className={cx("btn-tranfer", "tranfer-approve")} onClick={handleApprove}>
                    {" "}
                    Approve{" "}
                  </Button>
                </Form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
