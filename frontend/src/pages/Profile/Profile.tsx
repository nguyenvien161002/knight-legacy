import { useState, useEffect} from 'react';
import style from './Profile.module.scss';
import ahir from '../../assets/images/ahir-png.png';
import FormCreateKnight from '../../components/reuse/FormCreateKnight/FromCreateKnight';
import { useWeb3 } from '../../provider';
import {useAppSelector } from "../../redux/hook";
import classNames from 'classnames/bind';
import ListKnight from '../../components/reuse/ListKnight/ListKnight';
import ButtonConnect from '../../components/reuse/ButtonConnect/ButtonConnect';

const cx = classNames.bind(style);
  
function Profile() {
    interface DataKnight {
        dna: string,
        excitementPoint: string,
        gender: string,
        level: string,
        lostCount: string,
        name:string,
        readyTime: string,
        sexTime: string,
        winCount: string,
      }
    const [KnightsOfOwner, setKnightOwner] = useState<DataKnight[]>([]);
    const wallet = useAppSelector(state => state.wallet.value);
    const { contract }  =  useWeb3();
    useEffect(() => {
        if(wallet) {
            contract?.methods.getAllKnightsByOwner(wallet).call()
            .then((result : any) => {
                setKnightOwner(result);
            }).catch((err: any) => {
                console.log(err);
            });
        } else {
            setKnightOwner([]);
        }
    }, [wallet]);
    console.log(" Number knight: ",KnightsOfOwner?.length);
    console.log(wallet);
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
                        { KnightsOfOwner?.length == 0 && wallet ?  <FormCreateKnight></FormCreateKnight> : " "}
                        { KnightsOfOwner?.length != 0 ? <ListKnight data={KnightsOfOwner}></ListKnight> : ""}
                        { wallet == "" ?  <ButtonConnect></ButtonConnect> : "" }
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