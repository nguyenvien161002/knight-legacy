
import style from './Marriage.module.scss';
import ahir from '../../assets/images/ahir-png.png';
import {Button} from 'react-bootstrap';
import { useWeb3 } from '../../provider';
import { useAppSelector } from "../../redux/hook";
import classNames from 'classnames/bind';
import ListKnight from '../../components/reuse/ListKnight/ListKnight';
import knightApi from "../../api/KnightApi";
import { useEffect, useState } from 'react';
import { Notify, Loading } from 'notiflix';

const cx = classNames.bind(style);
  
function Marriage() {
    const { knightsOwner, wallet} = useAppSelector( state => state);
    const { contract, web3}  = useWeb3();
    const [requestMarry, setRequestMarry] = useState<any>()
    useEffect(() => {
        knightApi.getRequestMarry({owner: wallet.value.toLowerCase()})
        .then((data: any) => {
            console.log(data);
            setRequestMarry(data.listRequest)
        })
        .catch((erorr: any) => console.log(erorr))
    }, [wallet.value])
    const handleApproveMarry = (from: string, to : string, result: boolean) => {
        Loading.arrows("Handle send answer...")
        contract.methods.approveMarry(from, to , result).send({
            from: wallet.value
        })
        .then((data: any) => {
            console.log(data);
            if(data.events.ApprovalMarry.returnValues) {
                const params = {
                    idKnightRequest: data.events.ApprovalMarry.returnValues._knightFatherID,
                    idKnightResponse: data.events.ApprovalMarry.returnValues._knightMotherID,
                }
                knightApi.updateRequestMarry(params)
                Notify.success("Send data success");
            } else {
               Notify.failure("Can't send data");
            }
            Loading.remove();
        })
        .catch((error: any) => {
            console.log(error);
            Loading.remove();
        })
    }
    const handleDestroyMarry = (from: string, to: string ) => {
        Loading.arrows("Handle destroy marry...")
        contract.methods.destroyMarry(from, to).send({
            from: wallet.value
        })
        .then((data: any) => {
            console.log(data);
            Loading.remove();
        })
        .catch((error: any) => {
            console.log(error);
            Loading.remove();
        })
    }
    return <div className={cx('profile')}>
        <div className={cx('container')}>
                <div className={cx('content')}>
                {requestMarry == undefined ? " " :  requestMarry.map((request: any) => {
                    return (
                                <div key={request.id} className={cx('content__profile')}>
                                    <ListKnight data={request.request}></ListKnight>
                                    <div className={cx('info-request')}>
                                        <h4>Propose</h4>
                                        <p> Amount Gift: { web3.utils.fromWei(request.amountGift, "ether")} ETH </p>
                                        {request.status != "Married" ? 
                                        <> 
                                        <Button className={cx('btn-accept')} onClick={() => handleApproveMarry(request.idKnightRequest, request.idKnightResponse, true)}> Accept marriage </Button>
                                        <Button className={cx('btn-reject')} onClick={() => handleApproveMarry(request.idKnightRequest, request.idKnightResponse, false)}> Reject marriage </Button>
                                        </> : <Button className={cx('btn-destroy')} onClick={() => handleDestroyMarry(request.idKnightRequest, request.idKnightResponse)}> Destroy marriage </Button>}
                                    </div>
                                    <ListKnight data={request.response}></ListKnight>
                                </div>
                           )
                })}
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

export default Marriage;