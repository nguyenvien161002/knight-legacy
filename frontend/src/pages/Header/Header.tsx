
import Web3Modal from 'web3modal';
import { useEffect,useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp ,IconDefinition} from '@fortawesome/fontawesome-svg-core';
import { faAngleDown} from '@fortawesome/free-solid-svg-icons'; 
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
const cx = classNames.bind(style);
const faAnngleIC = faAngleDown as IconDefinition;
function Header() {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // reload still connect
      providerOptions:{}
    });
    
    const [provider, setProvider] = useState<any>()
    const [library, setLibrary] = useState<any>();
    const [account, setAccount] = useState<string>(() => {
      const wallet = localStorage.getItem('wallet') ?? "";
      return wallet;
    })
    function ellipsisAddress(address: string) {
        if(address){
        const addressToArray = address.split('');
        const firstAddress = addressToArray.splice(0,5).join('');
        const endAddress = addressToArray.splice((addressToArray.length - 4)).join('');
        return firstAddress + '...' + endAddress 
        } else {
          return null 
        }
    }   

    const connectWallet = async () => {
      try {
        const provider = await web3Modal.connect();
        const library = new Web3(provider);
        const accounts = await library.eth.getAccounts();
        setProvider(provider);
        setLibrary(library);
        if (accounts) {
          setAccount(accounts[0]);
          localStorage.setItem('wallet', accounts[0]);
        };
      } catch (error) {
        console.error(error);
      }
    };
    const refreshState = () => {
      setAccount("");
      localStorage.removeItem('wallet');
    };
    const disconnect = async () => {
      await web3Modal.clearCachedProvider();
      refreshState();
    };
    useEffect(() => {
      if (provider?.on) {
        const handleAccountsChanged = (accounts:any) => {
          setAccount(accounts[0]);
          localStorage.setItem('wallet', accounts[0]);
        };
    
        const handleDisconnect = () => {
          disconnect();
        };
    
        provider.on("accountsChanged", handleAccountsChanged);
        provider.on("disconnect", handleDisconnect);
    
        return () => {
          if (provider.removeListener) {
            provider.removeListener("accountsChanged", handleAccountsChanged);
            provider.removeListener("disconnect", handleDisconnect);
          }
        };
      }
    }, [provider]);
    //hook to automatically connect to the cached provider
    useEffect(() => {
      if (web3Modal.cachedProvider) {
        connectWallet();
      }
    }, []);
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
                <div className={cx('menu__button')} id="btn_connect-wallte">
                   <div>
                    {account ?<button  onClick={connectWallet}>{ellipsisAddress(account)} <FontAwesomeIcon className={cx('down-icon')} icon={faAnngleIC} /> </button>  : <button  onClick={connectWallet}>Connect Wallet</button>  }
                    { account ? <button  onClick={disconnect} className={cx('disconnect__btn')} >{"Disconnect"}</button> : ''}
                   </div>
                </div>
            </div>
        </header>
    )
}

export default Header