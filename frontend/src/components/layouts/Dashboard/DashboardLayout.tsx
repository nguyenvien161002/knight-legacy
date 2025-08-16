import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faStore, faCreditCard, faChartLine, faHistory, faHomeLg, faCog, faSignOut, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faBell } from "@fortawesome/free-regular-svg-icons";
import yi from '../../../assets/images/yi.png';
import logo from '../../../assets/images/logo-dashboard.png';
import classNames from "classnames/bind";
import style from "./DashboardLayout.module.scss";
const cx = classNames.bind(style);
const faBellIC = faBell as IconDefinition;
const faAnngleIC = faAngleDown as IconDefinition;
const faHomeLgIC = faHomeLg as IconDefinition;
const faStoreIC = faStore as IconDefinition;
const faCreditCardIC = faCreditCard as IconDefinition;
const faChartLineIC = faChartLine as IconDefinition;
const faHistoryIC = faHistory as IconDefinition;
const faCogIC = faCog as IconDefinition;
const faSignOutIC = faSignOut as IconDefinition;
const faSearchIC = faSearch as IconDefinition;
function DefaultLayout() {
  return (
    <section className={cx(["wrapper"])}>
       <div className={cx("sidebar")}>
          <div className={cx("logo")}>
            <img src={logo} alt="" width={120} />
          </div>
          <div className={cx("list__menu")}>
            <ul >
              <li className={cx(["list__item", "active"])}> <Link to={"/profile"}> <FontAwesomeIcon className={cx('list')}   icon={faHomeLgIC} /> </Link> </li>
              <li className={cx(["list__item"])}> <Link to={"/"}> <FontAwesomeIcon className={cx('store')}   icon={faStoreIC} /> </Link> </li>
              <li className={cx(["list__item"])}> <Link to={"/store"}> <FontAwesomeIcon className={cx('store')}   icon={faCreditCardIC} /> </Link> </li>
              <li className={cx(["list__item"])}> <Link to={"/store"}> <FontAwesomeIcon className={cx('store')}   icon={faChartLineIC} /> </Link> </li>
              <li className={cx(["list__item"])}> <Link to={"/store"}> <FontAwesomeIcon className={cx('store')}   icon={faHistoryIC} /> </Link> </li>
            </ul>
          </div>
          <div className={cx("action")}>
              <Link to={"/setting"}> <FontAwesomeIcon className={cx('store')}   icon={faCogIC} /></Link>
              <Link to={"/logout"}> <FontAwesomeIcon className={cx('store')}   icon={faSignOutIC} /></Link>
          </div>
       </div>
       <div className={cx("content")}>
          <header className={cx("header")}>
              <div className={cx("group_input")}>
                 <div className={cx("input_search")}>
                  <input type="text" placeholder="Search item,Collection..." />
                  <button> <FontAwesomeIcon className={cx('search_ic')}   icon={faSearchIC} /></button>
                 </div>
              </div>
              <div className={cx("header_menu")}>
                <div className={cx("notification")}>
                    <span></span>
                    <FontAwesomeIcon className={cx('bell')}   icon={faBellIC} />
                </div>
                <div  className={cx("info")}>
                    <img src={yi} alt="" width="50" />
                    <h4> Ethereum Blockchian</h4>
                    <FontAwesomeIcon className={cx('angle__down')}   icon={faAnngleIC} />
                    <span></span>
                </div>
              </div>
          </header>
          <Outlet></Outlet>
       </div>
    
    </section>
  );
}

export default DefaultLayout;
