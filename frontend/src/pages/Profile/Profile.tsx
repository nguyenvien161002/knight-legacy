
import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import ahir from '../../assets/images/ahir-png.png';

const cx = classNames.bind(style);
function Profile() {
    return <div className={cx('profile')}>
        <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('banner')}>
                        <h1 className={cx('banner__heading', 'banner__item')}>
                            Round Hall
                        </h1>
                        <h1 className={cx('banner__price', 'banner__item', 'color-global')}>
                            1.5 ETH
                        </h1>
                        <p className={cx('banner__info', 'banner__item')}>
                            Upload By Alenxander Vernof
                        </p>
                        <div className={cx('banner__submit', 'banner__item')}>
                            <a href="#" className={cx('card-button', 'active')}>Bid Now</a>
                            <div className={cx('banner__expr')}>
                                <p>Ending In <p className={cx('color-global')}>2d:15h:20m</p></p>
                            </div>                   
                        </div>
                    </div>
                    <div className={cx('content__profile')}>
                        <div className={cx('feed')}>
                            <div className={cx('feed__option')}>
                                <span>Feed</span>
                                <select>
                                    <option value="">Popular</option>
                                    <option value="">Popular</option>
                                    <option value="">Popular</option>
                                </select>
                            </div>
                            <div className={cx('feed__choice')}>
                                <ul className={cx('feed__choice-list')}>
                                    <li className={cx('feed__choice-list-item', 'active')}>All</li>
                                    <li className={cx('feed__choice-list-item')}>Illustration</li>
                                    <li className={cx('feed__choice-list-item')}>Art</li>
                                    <li className={cx('feed__choice-list-item')}>Game</li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('card-container')}>
                            <div className={cx('card-item')}>
                                <div className={cx('card-image')}>
                                    <img src={ahir} height="100%"  alt="" />
                                </div>
                                <div className={cx('card-content')}>
                                    <div className={cx('card-title', 'flex-card')}>
                                        <h1>Pyramid God</h1>
                                        <h3>65</h3>
                                    </div>
                                    <div className={cx('card-info', 'flex-card')}>
                                        <p>Current Bid <p className={cx('color-global')}>1.2ETH</p>
                                        </p>
                                        <p>Ending in <p className={cx('color-global')}>1d:12h:10m</p>
                                        </p>
                                    </div>
                                    <div className={cx('card-submit', 'flex-card')}>
                                      <a href="#" className={cx('card-button', 'active')}>Place A Bid</a>
                                      <a href="#" className={cx('card-button')}>History</a>
                                    </div>
                                </div>
                            </div>
                            {/* Item 2 */}
                            <div className={cx('card-item')}>
                                <div className={cx('card-image')}>
                                    <img src={ahir} height="100%"  alt="" />
                                </div>
                                <div className={cx('card-content')}>
                                    <div className={cx('card-title', 'flex-card')}>
                                        <h1>Pyramid God</h1>
                                        <h3>65</h3>
                                    </div>
                                    <div className={cx('card-info', 'flex-card')}>
                                        <p>Current Bid <p className={cx('color-global')}>1.2ETH</p>
                                        </p>
                                        <p>Ending in <p className={cx('color-global')}>1d:12h:10m</p>
                                        </p>
                                    </div>
                                    <div className={cx('card-submit', 'flex-card')}>
                                      <a href="#" className={cx('card-button', 'active')}>Place A Bid</a>
                                      <a href="#" className={cx('card-button')}>History</a>
                                    </div>
                                </div>
                            </div>
                            {/* Item 3 */}
                            <div className={cx('card-item')}>
                                <div className={cx('card-image')}>
                                    <img src={ahir} height="100%"  alt="" />
                                </div>
                                <div className={cx('card-content')}>
                                    <div className={cx('card-title', 'flex-card')}>
                                        <h1>Pyramid God</h1>
                                        <h3>65</h3>
                                    </div>
                                    <div className={cx('card-info', 'flex-card')}>
                                        <p>Current Bid <p className={cx('color-global')}>1.2ETH</p>
                                        </p>
                                        <p>Ending in <p className={cx('color-global')}>1d:12h:10m</p>
                                        </p>
                                    </div>
                                    <div className={cx('card-submit', 'flex-card')}>
                                      <a href="#" className={cx('card-button', 'active')}>Place A Bid</a>
                                      <a href="#" className={cx('card-button')}>History</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('aside-left')}>
                    <div className={cx('statistics')}>
                        <div className={cx('statistics__heading', 'flex-div')}>
                            <h1>Statistics</h1>
                            <a href="#" className={cx('color-global')}>View more</a>
                        </div>
                        <div className={cx('statistics__item', 'flex-div')}>
                            <p>Artwork Sold</p>
                            <p>187</p>
                        </div>
                        <div className={cx('statistics__item', 'flex-div')}>
                            <p>Artwork Cancel</p>
                            <p>5</p>
                        </div>
                        <div className={cx('statistics__item', 'flex-div')}>
                            <p>Total Earning</p>
                            <p>262 ETH</p>
                        </div>
                    </div>
                    <div className={cx('list-seller')}>
                        <div className={cx('list-seller__heading')}>
                            <h1>Top Seller</h1>
                            <a href="#" className={cx('color-global')}>View more</a>
                        </div>
                        {/* Seller item 1 */}
                        <div className={cx('flex-div', 'list-seller__item')}>
                            <div>
                                <img src={ahir} height="100%"  alt="" />
                                <div>
                                    <h2>Jane Cooper</h2>
                                    <h3>@Jane18</h3>
                                </div>
                            </div>
                            <a href="#">Follow</a>
                        </div>
                        {/* Seller item 2 */}
                        <div className={cx('flex-div', 'list-seller__item')}>
                            <div>
                                <img src={ahir} height="100%"  alt="" />
                                <div>
                                    <h2>Jane Cooper</h2>
                                    <h3>@Jane18</h3>
                                </div>
                            </div>
                            <a href="#">Follow</a>
                        </div>
                        {/* Seller item 3 */}
                        <div className={cx('flex-div', 'list-seller__item')}>
                            <div>
                                <img src={ahir} height="100%"  alt="" />
                                <div>
                                    <h2>Jane Cooper</h2>
                                    <h3>@Jane18</h3>
                                </div>
                            </div>
                            <a href="#">Follow</a>
                        </div>
                    </div>
                </div>
        </div>
    </div>;
}

export default Profile;