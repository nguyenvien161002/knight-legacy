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
  getKnightById: (params: any) => {
    const url = `v1/api/knight/get-knight-id`
    return axiosClient.get(url, { params })
  },
}

export default authorizationApi
