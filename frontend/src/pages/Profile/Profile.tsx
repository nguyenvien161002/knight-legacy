import { useState } from 'react';
import {Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import ahir from '../../assets/images/ahir-png.png';
const cx = classNames.bind(style);
function ShowFormKnight() {
    const [show, setShow] = useState(false);
    const [showToast, setShowA] = useState(false);
    type DataToast = {
        lable: String,
        mesage: string,
        time: string
    }
    const [dataToast, setDataToast] = useState({} as DataToast);
    interface Knight  {
        name: String,
        image: string,
        gender: string
    }
    const [inputKnight, setInputKnight] = useState<Knight>({} as Knight);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggleShowTost = () => setShowA(!showToast);
    const handleInput = (e:any) => {
        setInputKnight({
            ...inputKnight,
            [e.target.name]: e.target.value,
        })
    }
    const handleInputFile = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputKnight({
            ...inputKnight,
            [e.target.name]: e.target.files,
        })
    }

    const createKnight = (e : any) => {
        e.preventDefault();
        // contract.methods.createKnight(inputKnight.name).send({
        //     from: localStorage.getItem('wallet')
        // })
        // .then((data: any) => {
        //     setDataToast({
        //         lable: " Create knight ",
        //         mesage: " Create knight successfully ",
        //         time: " just now"
        //     })
        //     toggleShowTost();
        // })
        // .catch((err: any) => {
        //     setDataToast({
        //         lable: " Create knight ",
        //         mesage: " Create knight false! </br> " +  err.message,
        //         time: " just now"
        //     })
        //     toggleShowTost();
        // });
    }
    return (
      <div className={cx('modal-container')}>
        <p>Chào mừng bạn đến với Knight NFT, Hãy tạo Knight đầu tiền của bạn và tham gia cuộc chiến cùng chúng tôi nhé. </p>
        <p>Nhấp vào nút <b>"Create knight"</b> để tiếp tục!</p>

        <Button className={cx('active', 'shadow')} onClick={handleShow}>
          Create Knight
        </Button>
        <ToastContainer position="top-end" className="p-3">
            <Toast show={showToast} onClose={toggleShowTost} delay={5000} autohide animation bg="primary">
                <Toast.Header>
                    <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                    />
                    <strong className="me-auto">{dataToast.lable}</strong>
                    <small className="text-muted">{dataToast.time}</small>
                </Toast.Header>
                <Toast.Body>{dataToast.mesage}</Toast.Body>
            </Toast>   
        </ToastContainer>
        <Modal show={show} onHide={handleClose} className={cx('content-modal')}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
        <div className={cx('main')}>
            <form action="" method="POST" className={cx('form')} >
                <h3 className={cx('heading')}>Create Knight</h3>
                <div className={cx('spacer')}></div>

                <div className={cx('form-group')}>
                    <label htmlFor="name" className={cx('form-label')}>Name</label>
                    <input id="name" name="name" type="text" onChange={handleInput} placeholder="Knight Gnar" className={cx('form-control')} />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="image" className={cx('form-label')}>Image</label>
                    <input id="image" name="image" type="file"  onChange={handleInputFile} className={cx('form-control')} />
                </div>
                <div className={cx('form-group')}>
                <label htmlFor="gender" className={cx('form-label')}>Gender</label>
                <select id="gender" name="gender"  onChange={handleInput} className={cx('form-control')}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>
                <button className={cx('form-submit')} onClick={createKnight}>Create</button>
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
                                <p>Ending In <span className={cx('color-global')}>2d:15h:20m</span></p>
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
                                        <p>Current Bid 
                                            <span className={cx('color-global')}>1.2ETH</span>
                                        </p>
                                        <p>Ending in 
                                            <span className={cx('color-global')}>1d:12h:10m</span>
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
                                        <p>Current Bid 
                                            <span className={cx('color-global')}>1.2ETH</span>
                                        </p>
                                        <p>Ending in 
                                            <span className={cx('color-global')}>1d:12h:10m</span>
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
                                        <p>Current Bid 
                                            <span className={cx('color-global')}>1.2ETH</span>
                                        </p>
                                        <p>Ending in 
                                            <span className={cx('color-global')}>1d:12h:10m</span>
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