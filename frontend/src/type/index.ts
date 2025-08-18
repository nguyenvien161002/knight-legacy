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
}

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
