import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import classnames from 'classnames/bind'

import style from './Wedding.module.scss'
import ahir from '../../assets/images/ahir-png.png';
const cx = classnames.bind(style);

let rawDataNftsCompetior = [
    {
        id: '0',
        name: 'Knight 1',
        gender: 1,
        level: 20,
        point: 230,
        image: ahir
    },
    {
        id: '1',
        name: 'Knight 2',
        gender: 0,
        level: 20,
        point: 230,
        image: ahir
    },
    {
        id: '2',
        name: 'Knight 3',
        gender: 1,
        level: 20,
        point: 230,
        image: ahir
    },
    {
        id: '3',
        name: 'Knight 4',
        gender: 1,
        level: 20,
        point: 230,
        image: ahir
    },
    {
        id: '4',
        name: 'Knight 5',
        gender: 1,
        level: 20,
        point: 230,
        image: ahir
    }
]
let rawDataNftsOwner = [
    {
        id: '5',
        name: 'Knight 5',
        gender: 1,
        level: 20,
        point: 230,
        image: ahir
    },
    {
        id: '6',
        name: 'Knight 6',
        gender: 0,
        level: 20,
        point: 230,
        image: ahir
    }
]
function FireWork(props: any) {
    return (
        <div className={cx("fireword-container", props.show ? 'show' : 'hide')}>
            <div className={cx("firework")}></div>
            <div className={cx("firework")}></div>
            <div className={cx("firework")}></div>
            <div className={cx("firework")}></div>
            <div className={cx("firework")}></div>
        </div>
    )
}

function ShowCardWedding(props:any) {
    return (
        <div className={cx("maincontainer", props.show ? 'show' : 'hide')}>        
                <div className={cx("thecard")}>
                    <div className={cx("thefront")}></div> 
                    <div className={cx("theback")}></div>
                </div>
        </div>
    )
}

function ShowNftOwner(props:any) {
        const [toastMessage, setToastMessage] = useState(false);
        const [showListNftOwner, setShowListNftOwner] = useState(true);
        const [listNftOwner, setListNftOwner] = useState( () => rawDataNftsOwner);
        const [selectNftOwner, setSelectNftOwner] = useState();
        const [showCardWedding, setshowCardWedding] = useState(false);
        const attackHandler = () => {
            if(selectNftOwner) {
                setToastMessage(false);
                setShowListNftOwner(false);
                setshowCardWedding(true);
                setTimeout( () => {
                    setshowCardWedding(false);
                }, 4000);
            } else {
                setToastMessage(true);
            }
        }
        const selectNftOwnerHandler = (item:any) => {
            setSelectNftOwner(item.id);
            setToastMessage(false);
            console.log(item);
        };
        return (
            <>
            <div className={cx('modal-container', showListNftOwner ? 'show' : 'hide')}>
            <div className={cx('modal-wrapper')}>
                <div className={cx('list-competior')}>
                    <div className={cx("card")}>
                        <h3 className={cx("title")}>{props.nftcompetitor.name}</h3>
                        <h3 className={cx("level")}>Level: {props.nftcompetitor.level}</h3>
                        <div className={cx("bar")}>
                        <div className={cx("emptybar")}></div>
                        <div className={cx("filledbar")}></div>
                        </div>
                        <div className={cx("circle")}>
                        <img src={props.nftcompetitor.image} alt="" className={cx('card-img')}/>
                        </div>
                    </div>
                </div>
                <h1>VS</h1>
                <div className={cx('list-owner')}>
                        {listNftOwner.map( item => (
                            <div className={cx("card", item.id === selectNftOwner ? 'active' : '')}
                                onClick={() => selectNftOwnerHandler(item)}
                                key={item.id}
                            >
                                <h3 className={cx("title")}>{item.name}</h3>
                                <h3 className={cx("level")}>Level: {item.level}</h3>
                                <div className={cx("bar")}>
                                <div className={cx("emptybar")}></div>
                                <div className={cx("filledbar")}></div>
                                </div>
                                <div className={cx("circle")}>
                                <img src={item.image} alt="" className={cx('card-img')}/>
                                </div>
                            </div>
                        ))}   
                </div>
            </div>   
            <div className={cx("btn-container")}>
                {toastMessage &&
                    <h1 data-text="PLEASE CHOOSE YOUR NFT..." className={cx('toast-message')}>
                        PLEASE CHOOSE YOUR NFT          
                    </h1>
                }
                <div className={cx("btn")} onClick={attackHandler}>
                    <div className={cx("inner")}></div>
                    <button>Marry</button>
                </div>
            </div>
        </div>
        {showCardWedding && <>
            <ShowCardWedding show={showCardWedding} nftCompetitor={props.nftcompetitor}/>
            <ShowCardWedding show={showCardWedding} nftOwner={selectNftOwner}/>
            <FireWork show={showCardWedding} />
        </>}
        </>
    )
}
function MyVerticallyCenteredModal(props:any) {

            return ( <Modal
            {...props}
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <ShowNftOwner nftcompetitor={props.nftcompetitor}/>
          </Modal>
            )
        
     
    
  }

  
function Wedding() {
    
    const [modalShow, setModalShow] = useState(false);

    const [nftCompetitor, setNftCompetitor] = useState({});

    const [listNft, setListNft] = useState( () => rawDataNftsCompetior);

    
    const handleShowModal = (isShow: any, itemCompetior: any) => {
        setModalShow(isShow);
        setNftCompetitor(itemCompetior);
        console.log(itemCompetior);
    }

    return (
        <ThemeProvider
                breakpoints={['xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                minBreakpoint="xxs"
                >
                    
                 <div className={cx('container')}>
                    {listNft.map( item => (
                        <div className={cx('card')} key={item.id}>
                            <img src={item.image} alt="" className={cx('card-img')}/>   
                            <div className={cx('card-data')}>
                                <div className={cx('card-title')}>{item.name}</div>
                                <span className={cx('card-level')}>Level {item.level}</span>
                                <p className={cx('card-description')}>
                                    <span>Gender: {item.gender === 0 ? 'Male' : 'Female'}</span>
                                    <span>Point: {item.point}</span>
                                </p>  
                                <p
                                  className={cx('card-button')}
                                  onClick={() => handleShowModal(true, item)}
                                >
                                    Marry
                                </p>                          
                            </div>     
                        </div>
                    ))}
                </div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    nftcompetitor={nftCompetitor}
                />
        </ThemeProvider>
      
    )
}
export default Wedding