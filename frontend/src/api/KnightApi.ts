import axiosClient from "./ClientAxios"

const authorizationApi = {
  getAll: (params: any) => {
    const url = `api/v1/knight/get-all`
    return axiosClient.get(url, { params })
  },
  getSaleKnight: (params: any) => {
    const url = `api/v1/knights/sale`
    return axiosClient.get(url, { params })
  },
  getKnightById: (params: any) => {
    const url = `api/v1/knight/get-knight-id`
    return axiosClient.get(url, { params })
  },
}

export default authorizationApi
