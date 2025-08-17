import React, { createContext, useContext, useEffect, useState } from "react"
import Web3 from "web3"
import { AbiItem } from "web3-utils"
import detectEthereumProvider from "@metamask/detect-provider"
import ABI_KnightNFT from "../../utility/ABI_KnightNFT.json"
interface Web3Method {
  contract: any
  web3: any
}
type Props = {
  children: React.ReactNode
}
const Web3Context = createContext<Web3Method>({} as Web3Method)
const Web3Provider = ({ children }: Props) => {
  const initValueWeb3: Web3Method = {
    contract: null,
    web3: null,
  }
  const [web3Api, setWeb3Api] = useState(initValueWeb3)
  useEffect(() => {
    const loadProvider = async () => {
      const provider: any = await detectEthereumProvider()
      const web3 = new Web3(provider)
      if (provider) {
        setWeb3Api({
          contract: new web3.eth.Contract(ABI_KnightNFT as AbiItem[], "0x395c66aAe34511B0D15E979F64c19497981DB7ab"), // Rinkeby Testnet Network
          web3,
        })
      } else {
        console.error("please, Install Metamask")
      }
    }
    loadProvider()
  }, [])
  return <Web3Context.Provider value={web3Api}> {children} </Web3Context.Provider>
}

const useWeb3 = () => {
  return useContext(Web3Context)
}
export default Web3Provider
export { useWeb3 }
