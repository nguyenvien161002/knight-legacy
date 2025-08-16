
import { useEffect,useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp ,IconDefinition} from '@fortawesome/fontawesome-svg-core';
import { faAngleDown} from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import ButtonConnect from '../../components/reuse/ButtonConnect/ButtonConnect';
const cx = classNames.bind(style);
const faAnngleIC = faAngleDown as IconDefinition;

function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('header__item-left')}>
                <h2>Knight</h2>
                <h3>NFTs</h3>
            </div>
            <div className={cx('header__item-center')}>
                <div className={cx("group__input")}>
                    <input type="text" placeholder='Search item here...' />
                </div>
            </div>
            <div className={cx('header__item-right')}>
                <ul>
                    <li className={cx('menu__item')}>
                      <Link to={'/'}> Home</Link>
                    </li>
                    <li className={cx('menu__item')}>
                      <Link to={'/explore'}> Explore <FontAwesomeIcon className={cx('menu__item-ic')}   icon={faAnngleIC} /></Link>
                    </li>
                    <li className={cx('menu__item')}>
                      <Link to={'/profile'}> Profile <FontAwesomeIcon className={cx('menu__item-ic')} icon={faAnngleIC} /></Link>
                    </li>
                    <li className={cx('menu__item')}>
                      <Link to={'/stats'}> Stats <FontAwesomeIcon className={cx('menu__item-ic')} icon={faAnngleIC} /></Link>
                    </li>
                </ul>
                <div className={cx('header__button-connect')}>
                  <ButtonConnect></ButtonConnect>
                </div>
            </div>
        </header>
    )
}

export default Header