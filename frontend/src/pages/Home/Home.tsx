import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp, IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faHeart, faArrowRight, faUserCircle, faCloudUpload, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames/bind"
import style from "./Home.module.scss"
import banner__right from "../../assets/images/meocho.png"
import banner__left from "../../assets/images/team-meo.png"
import kata from "../../assets/images/kata.png"
import yi from "../../assets/images/yi.png"
import talon from "../../assets/images/talon.png"
import yone from "../../assets/images/yone-1.png"
import nha from "../../assets/images/nha.png"
import medusa from "../../assets/images/medusa.png"
import q from "../../assets/images/sett-q.jpg"
import w from "../../assets/images/sett-w.jpg"
import p from "../../assets/images/sett-p.jpg"
import e from "../../assets/images/sett-e.jpg"
import gwen from "../../assets/images/gwen.png"
import liang from "../../assets/images/liang.png"
import liang1 from "../../assets/images/liang-3.png"
import liang2 from "../../assets/images/liang-2.png"
import Header from "../Header/Header"
import { useWeb3, useMetamark } from "../../provider"
import KnightApi from "../../api/KnightApi"
import CountDownTime from "../../components/reuse/CountDownTime/CountDownTime"
import { useAppSelector } from "../../redux/hook"
import { DataSaleKnight } from "../../type"
const cx = classNames.bind(style)
const faHeartIC = faHeart as IconDefinition
const faArrowRightIC = faArrowRight as IconDefinition
const faUserCircleIC = faUserCircle as IconDefinition
const faCloudUploadIC = faCloudUpload as IconDefinition
const faShoppingCartIC = faShoppingCart as IconDefinition

function Home() {
  const { contract, web3 } = useWeb3()
  const { ellipsisAddress } = useMetamark()
  const wallet = useAppSelector((state) => state.wallet.value)
  const [saleKnights, setSaleKnights] = useState<DataSaleKnight[]>({} as DataSaleKnight[])
  const [render, setRender] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      const banner__right = document.getElementById("banner__right_img")
      if (banner__right) banner__right.style.right = "0"
      const banner__center = document.getElementById("banner__center")
      if (banner__center) banner__center.style.transform = "scale(1)"
      const banner__left = document.getElementById("banner__left")
      const banner__bottom_right = document.getElementById("banner__bottom-right")
      if (banner__left) {
        banner__left.style.transform = "scale(1)"
        banner__left.style.bottom = "-45px"
      }
      if (banner__bottom_right) {
        banner__bottom_right.style.transform = "scale(1)"
      }
    }, 500)
  }, [])
  useEffect(() => {
    KnightApi.getSaleKnight({})
      .then((data: any) => {
        console.log(data)
        setSaleKnights(data.listSaleKnight)
      })
      .catch((error) => {
        setSaleKnights([])
        console.log(error)
      })
  }, [render])

  const handleBuyKnight = (bidId: string, value: string) => {
    contract?.methods
      .buyKnight(bidId)
      .send({ from: wallet, value })
      .then((data: any) => setRender(!render))
      .catch((err: any) => setRender(!render))
  }

  return (
    <div className={cx("home")}>
      <Header />
      <div className={cx("banner")}>
        <div className={cx("banner__right")}>
          <img src={banner__right} alt="" id="banner__right_img" />
        </div>
        <div className={cx("banner__center")} id="banner__center">
          <h1>
            {" "}
            GET BEST GAMING
            <br /> CHARACTER AND <br />
            COLLECT NFT
          </h1>
          <button> Explore </button>
          <a href="#"> Create Account</a>
        </div>
        <div className={cx("banner__left")}>
          <img src={banner__left} alt="" id="banner__left" />
        </div>
        <div className={cx("banner__bottom-right")} id="banner__bottom-right">
          <div className={cx("banner__bottom-item")} style={{ "--t": 1 } as React.CSSProperties}>
            400K <br /> Author
          </div>
          <div className={cx("banner__bottom-item")} style={{ "--t": 2 } as React.CSSProperties}>
            50k <br /> Auction{" "}
          </div>
          <div className={cx("banner__bottom-item")} style={{ "--t": 3 } as React.CSSProperties}>
            100K <br /> Member
          </div>
          <div className={cx("banner__bottom-item")} style={{ "--t": 4 } as React.CSSProperties}>
            10+ <br /> Token
          </div>
        </div>
      </div>
      <section className={cx("bg__content-top")}>
        <div className={cx("bg__content-shadow")}></div>
        <div className={cx("bg__content-bookmark")}></div>
      </section>
      <section className={cx("bg__content-center")}>
        <div className={cx("bg__gradient-content")}>
          {saleKnights.length > 0
            ? saleKnights.map((knight) => {
                return (
                  <div key={knight.bidID} className={cx("bg__gradient-item")}>
                    <a href={knight.permaLink} target="_bank">
                      <div>
                        <img src={knight.image} width="300" alt="" className={cx("product__image")} />
                      </div>
                      <div className={cx("product__time")}>
                        <CountDownTime time={knight.timeEnd}></CountDownTime>
                      </div>
                      <div className={cx("product__name")}>{knight.name}</div>
                      <div className={cx("product__info")}>
                        <h3 className={cx("product__price")}>
                          {web3.utils.fromWei(knight.price.toString(), "ether")} ETH <span>1/20</span>
                        </h3>
                        <h3>
                          Bid ID <span>{knight.bidID}</span>
                        </h3>
                      </div>
                      <div className={cx("product__owner")}>
                        <img src={yone} alt="" />
                        <span>{ellipsisAddress(knight.owner)}</span>
                      </div>
                    </a>
                    <div className={cx("product__btn-buy")}>
                      <button onClick={() => handleBuyKnight(knight.bidID, knight.price)}>
                        Place a Bid <FontAwesomeIcon icon={faArrowRightIC} />{" "}
                      </button>
                    </div>
                  </div>
                )
              })
            : " "}
        </div>
        <div className={cx("intro__team-dev")}>
          <h2>HOW WE WORK</h2>
          <div className={cx("intro__content")}>
            <div className={cx("intro__content-left")}>
              <div className={cx("intro__content-item")}>
                <h3> Set up your account</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio consectetur vel cumque aperiam, maxime
                  culpa repudiandae, consequuntur distinctio nisi?
                </p>
                <div className={cx("intro__icon")}>
                  <div className={cx("intro__icon-bg")}>
                    <FontAwesomeIcon className={cx("intro__icon-item")} icon={faUserCircleIC} />
                  </div>
                </div>
              </div>
              <div className={cx("intro__content-item")}>
                <h3> Add NFT's</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio consectetur vel cumque aperiam, maxime
                  culpa repudiandae, consequuntur distinctio nisi?
                </p>
                <div className={cx("intro__icon")}>
                  <div className={cx("intro__icon-bg")}>
                    <FontAwesomeIcon className={cx("intro__icon-item")} icon={faCloudUploadIC} />
                  </div>
                </div>
              </div>
              <div className={cx("intro__content-item")}>
                <h3> Sell NFT's</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio consectetur vel cumque aperiam, maxime
                  culpa repudiandae, consequuntur distinctio nisi?
                </p>
                <div className={cx("intro__icon")}>
                  <div className={cx("intro__icon-bg")}>
                    <FontAwesomeIcon className={cx("intro__icon-item")} icon={faShoppingCartIC} />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("intro__content-right")}>
              <img src={nha} width="300" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className={cx("intro__character-nft")}>
        <div className={cx("bg__content-shadow")}></div>
        <div className={cx("intro__character-content")}>
          <h3>RECENT CHARACTER</h3>
          <div className={cx("intro__character-box")}>
            <div className={cx("intro__character-outstanding")}>
              <div className={cx("intro__character-item")}>
                <div className={cx("intro__character-img")}>
                  <img src={medusa} width="300" alt="" className={cx("product__image")} />
                  <ul className={cx("product__skill")}>
                    <li className="intro__character-skill">
                      <img src={q} width="20" alt="" />
                    </li>
                    <li className="intro__character-skill">
                      <img src={w} width="20" alt="" />
                    </li>
                    <li className="intro__character-skill">
                      <img src={p} width="20" alt="" />
                    </li>
                    <li className="intro__character-skill">
                      <img src={e} width="20" alt="" />
                    </li>
                  </ul>
                </div>
                <div className={cx("product__time")}>6d 15h 34m 30s</div>
                <div className={cx("product__info")}>
                  <h3 className={cx("product__price")}>
                    0.08ETH <span>1/20</span>
                  </h3>
                  <h3>
                    {" "}
                    <FontAwesomeIcon className={cx("icon")} icon={faHeartIC} /> <span>56</span>
                  </h3>
                </div>
                <div className={cx("product__owner")}>
                  <img src={yone} alt="" width="50" />
                  <span>@Knight_nft.pro</span>
                </div>
                <div className={cx("product__btn-buy")}>
                  <button>
                    Place a Bid <FontAwesomeIcon icon={faArrowRightIC} />{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("intro__character-narmal")}>
              <ul className={cx("intro__character-list")}>
                <li className={cx("intro__character-item")}>
                  <div className={cx("intro__character-img")}>
                    <img src={gwen} alt="" width={40} />
                  </div>
                  <div className={cx("intro__character-user")}>
                    <div className={cx("intro__character-info")}>
                      <img src={yone} alt="" width={40} />
                      <p> @Knight.nft.pro</p>
                    </div>
                    <div className={cx("intro__character-price")}>
                      0.08 ETH <span> 1/20</span>
                    </div>
                    <div className={cx("intro__character-like")}>
                      <FontAwesomeIcon className={cx("icon")} icon={faHeartIC} /> 100
                    </div>
                  </div>
                  <div className={cx("intro__character-btn")}>
                    <div>
                      <button>
                        {" "}
                        Bib <FontAwesomeIcon icon={faArrowRightIC} />{" "}
                      </button>
                    </div>
                  </div>
                </li>
                <li className={cx("intro__character-item")}>
                  <div className={cx("intro__character-img")}>
                    <img src={liang} alt="" width={40} />
                  </div>
                  <div className={cx("intro__character-user")}>
                    <div className={cx("intro__character-info")}>
                      <img src={talon} alt="" width={40} />
                      <p> @Knight.nft.pro</p>
                    </div>
                    <div className={cx("intro__character-price")}>
                      0.08 ETH <span> 1/20</span>
                    </div>
                    <div className={cx("intro__character-like")}>
                      <FontAwesomeIcon className={cx("icon")} icon={faHeartIC} /> 100
                    </div>
                  </div>
                  <div className={cx("intro__character-btn")}>
                    <div>
                      <button>
                        {" "}
                        Bib <FontAwesomeIcon icon={faArrowRightIC} />{" "}
                      </button>
                    </div>
                  </div>
                </li>
                <li className={cx("intro__character-item")}>
                  <div className={cx("intro__character-img")}>
                    <img src={liang1} alt="" width={40} />
                  </div>
                  <div className={cx("intro__character-user")}>
                    <div className={cx("intro__character-info")}>
                      <img src={kata} alt="" width={40} />
                      <p> @Knight.nft.pro</p>
                    </div>
                    <div className={cx("intro__character-price")}>
                      0.08 ETH <span> 1/20</span>
                    </div>
                    <div className={cx("intro__character-like")}>
                      <FontAwesomeIcon className={cx("icon")} icon={faHeartIC} /> 100
                    </div>
                  </div>
                  <div className={cx("intro__character-btn")}>
                    <div>
                      <button>
                        {" "}
                        Bib <FontAwesomeIcon icon={faArrowRightIC} />{" "}
                      </button>
                    </div>
                  </div>
                </li>
                <li className={cx("intro__character-item")}>
                  <div className={cx("intro__character-img")}>
                    <img src={liang2} alt="" width={40} />
                  </div>
                  <div className={cx("intro__character-user")}>
                    <div className={cx("intro__character-info")}>
                      <img src={yi} alt="" width={40} />
                      <p> @Knight.nft.pro</p>
                    </div>
                    <div className={cx("intro__character-price")}>
                      0.08 ETH <span> 1/20</span>
                    </div>
                    <div className={cx("intro__character-like")}>
                      <FontAwesomeIcon className={cx("icon")} icon={faHeartIC} /> 100
                    </div>
                  </div>
                  <div className={cx("intro__character-btn")}>
                    <div>
                      <button>
                        {" "}
                        Bib <FontAwesomeIcon icon={faArrowRightIC} />{" "}
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer className={cx("footer")}>
        <div className={cx("footer__bg-shadown")}></div>
        <div className={cx("footer__content")}>
          <div className={cx("footer__content-intro")}>
            <h3> Knight NFT's</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias eius officiis eligendi maiores dolorum
              voluptatem repellat facere?
            </p>
          </div>
          <div className={cx("footer__content-resource")}>
            <h3> Resources </h3>
            <ul className={cx("footer__content-list")}>
              <li className={cx("footer__resource-item")}> Help Center</li>
              <li className={cx("footer__resource-item")}> Partners</li>
              <li className={cx("footer__resource-item")}> Suggestions</li>
              <li className={cx("footer__resource-item")}> Discord</li>
            </ul>
          </div>
          <div className={cx("footer__content-community")}>
            <h3> Resources </h3>
            <ul className={cx("footer__content-list")}>
              <li className={cx("footer__resource-item")}> Community</li>
              <li className={cx("footer__resource-item")}> Brand Assets</li>
              <li className={cx("footer__resource-item")}> Blog</li>
              <li className={cx("footer__resource-item")}> Forum</li>
            </ul>
          </div>
          <div className={cx("footer__content-news")}>
            <h3> Resources </h3>
            <p>Your email is safe with us.We don't spam.</p>
            <div className={cx("footer__content-form")}>
              <form action="">
                <div className={cx("group-input")}>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" />
                </div>
                <div className={cx("group-input")}>
                  <label htmlFor="email">Email address</label>
                  <input type="email" name="email" id="email" />
                </div>
                <button>
                  {" "}
                  <FontAwesomeIcon icon={faArrowRightIC} />{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className={cx("footer__bottom")}>
          <div className={cx("footer__copyright")}>
            <div className={cx("footer__copyright-item")}>
              <ul>
                <li>@KnightNFT</li>
                <li>All rights reserved</li>
                <li> AttractiveUI</li>
              </ul>
            </div>
            <div className={cx("footer__link")}>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
