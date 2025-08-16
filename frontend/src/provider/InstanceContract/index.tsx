import React, { createContext, useContext, useEffect, useState } from "react"
import Web3 from "web3"
import { AbiItem } from "web3-utils"
import detectEthereumProvider from "@metamask/detect-provider"
import ABI_KnightNFT from "../../utility/ABI_KnightNFT.json"
interface AppContextInterface {
  contract: any
}
type Props = {
  children: React.ReactNode
}
const Web3Context = createContext<AppContextInterface>({} as AppContextInterface)
const Web3Provider = ({ children }: Props) => {
  const initValueWeb3: AppContextInterface = {
    contract: null,
  }
  const [web3Api, setWeb3Api] = useState(initValueWeb3)
  useEffect(() => {
    const loadProvider = async () => {
      const provider: any = await detectEthereumProvider()
      const web3 = new Web3(provider)
      if (provider) {
        setWeb3Api({
          contract: new web3.eth.Contract(
            ABI_KnightNFT as unknown as AbiItem[],
            "0x9432E1a37E144EEc7ddFAb974807a1Ad5964AAcb",
          ), // Ropsten Network
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
