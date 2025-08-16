import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import ahir from '../../assets/images/ahir-png.png';

const cx = classNames.bind(style);
function ShowFormKnight() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div className={cx('modal-container')}>
        <Button className={cx('active', 'shadow')} onClick={handleShow}>
          Create Knight
        </Button>
  
        <Modal show={show} onHide={handleClose} className={cx('content-modal')}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
        <div className={cx('main')}>
            <form action="" method="POST" className={cx('form')} >
                <h3 className={cx('heading')}>Create Knight</h3>
                <div className={cx('spacer')}></div>

                <div className={cx('form-group')}>
                    <label htmlFor="fullname" className={cx('form-label')}>Name</label>
                    <input id="fullname" name="fullname" type="text" placeholder="Knight Gnar" className={cx('form-control')} />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="image" className={cx('form-label')}>Image</label>
                    <input id="image" name="image" type="file" className={cx('form-control')} />
                </div>
                <div className={cx('form-group')}>
                <label htmlFor="gender" className={cx('form-label')}>Gender</label>
                <select id="gender" name="gender" className={cx('form-control')}>
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                </select>
                </div>
                <button className={cx('form-submit')}>Create</button>
            </form>
        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
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
                            <a href="#" className={cx('card-button', 'active', 'shadow')}>Bid Now</a>
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
                                    <option className={cx('option-feed')} value="">Popular</option>
                                    <option className={cx('option-feed')} value="">Popular</option>
                                    <option className={cx('option-feed')} value="">Popular</option>
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
                        <ShowFormKnight />
                        <div className={cx('card-container', 'hidden')}>
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