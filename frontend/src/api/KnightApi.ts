import axiosClient from "./ClientAxios"

const authorizationApi = {
  getAll: (params: any) => {
    const url = `v1/api/knight/get-all`
    return axiosClient.get(url, { params })
  },
  getSaleKnight: (params: any) => {
    const url = `v1/api/knight/get-sale-knight`
    return axiosClient.get(url, { params })
  },
  getKnightByName: (params: any) => {
    const url = `v1/api/knight/get-knight-name`
    return axiosClient.get(url, { params })
  },
}

export default authorizationApi
