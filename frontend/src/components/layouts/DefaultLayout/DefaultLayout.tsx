
import { Outlet } from 'react-router-dom'
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';
const cx = classNames.bind(style);
function DefaultLayout() {
  return (

      <section className={cx('wrapper')}>
        <div className={cx("color")}></div>
        <div className={cx("color")}></div>
        <div className={cx("color")}></div>
        <Outlet></Outlet>
      </section>

  )
}

export default DefaultLayout