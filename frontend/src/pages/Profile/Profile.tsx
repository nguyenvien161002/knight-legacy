
import classNames from 'classnames/bind';
import style from './Profile.module.scss';

const cx = classNames.bind(style);
function Profile() {
    return <div className={cx('Profile')}>Profile</div>;
}

export default Profile;