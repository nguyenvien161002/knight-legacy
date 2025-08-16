import React from "react"
import { useMetamark } from "../../../provider"
import { useAppSelector } from "../../../redux/hook"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames/bind"
import style from "./ButtonConnect.module.scss"
const faAnngleIC = faAngleDown as IconDefinition
const cx = classNames.bind(style)
function ButtonConnect() {
  const { connectWallet, disconnect, ellipsisAddress } = useMetamark()
  const wallet = useAppSelector((state) => state.wallet.value)
  return (
    <div className={cx("menu__button")} id="btn_connect-wallte">
      <div>
        {wallet ? (
          <button onClick={connectWallet} className={cx("connect__btn")}>
            {ellipsisAddress(wallet)} <FontAwesomeIcon className={cx("down-icon")} icon={faAnngleIC} />{" "}
          </button>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
        {wallet ? (
          <button onClick={disconnect} className={cx("disconnect__btn")}>
            {"Disconnect"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default ButtonConnect
