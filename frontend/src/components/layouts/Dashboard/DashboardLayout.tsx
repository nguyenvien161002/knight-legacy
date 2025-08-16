import { Outlet } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./DashboardLayout.module.scss";
const cx = classNames.bind(style);
function DefaultLayout() {
  return (
    <section className={cx(["wrapper"], "container")}>
      <div className="row">
        <div className="col-3 col-lg-3">
          <div className={cx("sidebar")}>
              Sidebar
          </div>
        </div>
        <div className="col-9 col-lg-9">
          <div className={cx("content")}>
              Content
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </section>
  );
}

export default DefaultLayout;
