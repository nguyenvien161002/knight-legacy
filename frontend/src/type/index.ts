export interface DataKnight {
  _id: string
  name: string
  owner: string
  knightID: number
  tokenURI: string
  dna: string
  image: string
  createdAt: string
  updatedAt: string
  attackTime: number
  level: number
  lostCount: number
  sexTime: number
  winCount: number
  isSalling: boolean
  permaLink: string
  saleKnight: DataSaleKnight
  maritalStatus: boolean
}

export interface DataSaleKnight {
  knightID: string
  price: string
  bidID: string
  timeEnd: number
  knight: DataKnight
}

export interface DataRequestMarry {
  amountGift: string
  id: string
  idKnightRequest: number
  idKnightResponse: number
  ownerRequest: string
  ownerResponse: string
  knightRequest: DataKnight
  knightResponse: DataKnight
  status: string
}

export interface InforTranferKnight {
  knightID: number
  sender: string
  receiver: string
}
