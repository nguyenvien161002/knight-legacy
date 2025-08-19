import axiosClient from "./ClientAxios"

const authorizationApi = {
  getAll: (params: any) => {
    const url = `v1/api/knight/get-all`
    return axiosClient.get(url, { params })
  },
  getSaleKnight: (params: any) => {
    const url = `v1/api/knight/sale-knight`
    return axiosClient.get(url, { params })
  },
  getKnightById: (params: any) => {
    const url = `v1/api/knight/get-knight-id`
    return axiosClient.get(url, { params })
  },
  getKnightNotOwwner: (params: any) => {
    const url = `v1/api/knight/knight-not-owner`
    return axiosClient.get(url, { params })
  },
  getRequestMarry: (params: any) => {
    const url = `v1/api/knight/request-marri`
    return axiosClient.get(url, { params })
  },
  storeRequestMarry: (params: any) => {
    const url = `v1/api/knight/request-marri`
    return axiosClient.post(url, params)
  },
  updateRequestMarry: (params: any) => {
    const url = `v1/api/knight/request-marri`
    return axiosClient.put(url, params)
  },
  destroyMarry: (params: any) => {
    const url = `v1/api/knight/request-marri`
    return axiosClient.delete(url, { params })
  },
  storeKnight: (params: any) => {
    const url = `v1/api/knight/store`
    return axiosClient.post(url, params)
  },
}

export default authorizationApi
