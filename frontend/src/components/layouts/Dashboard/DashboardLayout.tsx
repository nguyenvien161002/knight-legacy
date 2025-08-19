import { Outlet, Link } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faExchangeAlt,
  faPaw,
  faHeart,
  faStore,
  faCreditCard,
  faHistory,
  faHomeLg,
  faCog,
  faSignOut,
  faSearch,
  faHammer,
  faChildren,
} from "@fortawesome/free-solid-svg-icons"
import { faBell } from "@fortawesome/free-regular-svg-icons"

import logo from "../../../assets/images/logo-dashboard.png"
import classNames from "classnames/bind"
import style from "./DashboardLayout.module.scss"
import ButtonConnect from "../../reuse/ButtonConnect/ButtonConnect"
const cx = classNames.bind(style)
const faBellIC = faBell as IconDefinition
const faHomeLgIC = faHomeLg as IconDefinition
const faStoreIC = faStore as IconDefinition
const faCreditCardIC = faCreditCard as IconDefinition
const faPawIC = faPaw as IconDefinition
const faCogIC = faCog as IconDefinition
const faSignOutIC = faSignOut as IconDefinition
const faSearchIC = faSearch as IconDefinition
const faHammerIC = faHammer as IconDefinition
const faChildrenIC = faChildren as IconDefinition
const faExchangeAltIC = faExchangeAlt as IconDefinition
const faHeartIC = faHeart as IconDefinition

function DefaultLayout() {
  return (
    <section className={cx(["wrapper"])}>
      <div className={cx("sidebar")}>
        <div className={cx("logo")}>
          <img src={logo} alt="" width={120} />
        </div>
        <div className={cx("list__menu")}>
          <ul>
            <li className={cx(["list__item", "active"])}>
              {" "}
              <Link to={"/profile"}>
                {" "}
                <FontAwesomeIcon className={cx("list")} icon={faHomeLgIC} />{" "}
              </Link>{" "}
            </li>
            <li className={cx(["list__item"])}>
              {" "}
              <Link to={"/"}>
                {" "}
                <FontAwesomeIcon className={cx("store")} icon={faStoreIC} />{" "}
              </Link>{" "}
            </li>
            <li className={cx(["list__item"])}>
              {" "}
              <Link to={"/sale"}>
                {" "}
                <FontAwesomeIcon className={cx("sale")} icon={faCreditCardIC} />{" "}
              </Link>{" "}
            </li>
            <li className={cx(["list__item"])}>
              {" "}
              <Link to={"/store"}>
                {" "}
                <FontAwesomeIcon className={cx("store")} icon={faExchangeAltIC} />{" "}
              </Link>{" "}
            </li>
            {/* <li className={cx(["list__item"])}> <Link to={"/store"}> <FontAwesomeIcon className={cx('store')}   icon={faHistoryIC} /> </Link> </li> */}
            <li className={cx(["list__item"])}>
              {" "}
              <Link to={"/attack"}>
                {" "}
                <FontAwesomeIcon className={cx("store")} icon={faPawIC} />{" "}
              </Link>{" "}
            </li>
            <li className={cx(["list__item"])}>
              {" "}
              <Link to={"/wedding"}>
                {" "}
                <FontAwesomeIcon className={cx("store")} icon={faChildrenIC} />{" "}
              </Link>{" "}
            </li>
            <li className={cx(["list__item"])}>
              {" "}
              <Link to={"/request-marriage"}>
                {" "}
                <FontAwesomeIcon className={cx("marriage")} icon={faHeartIC} />{" "}
              </Link>{" "}
            </li>
          </ul>
        </div>
        <div className={cx("action")}>
          <Link to={"/setting"}>
            {" "}
            <FontAwesomeIcon className={cx("store")} icon={faCogIC} />
          </Link>
          <Link to={"/logout"}>
            {" "}
            <FontAwesomeIcon className={cx("store")} icon={faSignOutIC} />
          </Link>
        </div>
      </div>
      <div className={cx("content")}>
        <header className={cx("header")}>
          <div className={cx("group_input")}>
            <div className={cx("input_search")}>
              <input type="text" placeholder="Search item,Collection..." />
              <button>
                {" "}
                <FontAwesomeIcon className={cx("search_ic")} icon={faSearchIC} />
              </button>
            </div>
          </div>
          <div className={cx("header_menu")}>
            <div className={cx("notification")}>
              <span></span>
              <FontAwesomeIcon className={cx("bell")} icon={faBellIC} />
            </div>
            <div className={cx("info")}>
              <ButtonConnect></ButtonConnect>
            </div>
          </div>
        </header>
        <Outlet></Outlet>
      </div>
    </section>
  )
}

export default DefaultLayout
