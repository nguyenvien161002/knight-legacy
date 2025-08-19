export interface DataKnight {
  _id: string // k cần nè
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
  saleInfo: DataSaleKnight[]
}
// table Knight

export interface DataSaleKnight {
  knightID: string
  owner: string
  price: string
  bidID: string
  createdAt: string
  image: string
  name: string
  timeEnd: number
  permaLink: string
}

export interface DataRequestMarry {
  amountGift: string
  id: string
  idKnightRequest: number
  idKnightResponse: number
  ownerRequest: string
  ownerResponse: string
  request: DataKnight[]
  response: DataKnight[]
  status: string
}
// table sale kinght
