
import classNames from 'classnames/bind';
import style from './User.module.scss';

const cx = classNames.bind(style);
function User() {
    return <div className={cx('Profile')}>User</div>;
}

export default User;