import React, { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { upload } from "../../redux/walletReducer";
import { useAppDispatch } from "../../redux/hook";
interface AuthContext {
    connectWallet: () => Promise<void>,
    refreshState: () => void, 
    disconnect: ()=> Promise<void>,
    ellipsisAddress: (address: string) => string | null
}
type Props = {
  children: React.ReactNode;
};
const MetamarkContext = createContext<AuthContext>(
  {} as AuthContext
);
const MetamarkProvider = ({ children }: Props) => {
    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {},
    });
    
    const dispatch = useAppDispatch();
    const [provider, setProvider] = useState<any>();
    const [library, setLibrary] = useState<any>();
    const ellipsisAddress =  (address: string) => {
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
            dispatch(upload(accounts[0]));
            localStorage.setItem("wallet", accounts[0]);
        }
        } catch (error) {
        console.error(error);
        }
    };
    const refreshState = () => {
        dispatch(upload(""));
        localStorage.removeItem("wallet");
    };
    const disconnect = async () => {
        await web3Modal.clearCachedProvider();
        refreshState();
    };
    useEffect(() => {
        if (provider?.on) {
        const handleAccountsChanged = (accounts: any) => {
            dispatch(upload(accounts[0]));
            localStorage.setItem("wallet", accounts[0]);
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
    const [Metamark, setMetamark] = useState<AuthContext>({
        connectWallet,
        refreshState,
        disconnect,
        ellipsisAddress
    })
    return (
        <MetamarkContext.Provider value={Metamark}> {children} </MetamarkContext.Provider>
    );
};

const useMetamark = () => {
  return useContext(MetamarkContext);
};
export default MetamarkProvider;
export { useMetamark };
