import axiosClient from "./ClientAxios"

const authorizationApi = {
  getAll: (params: any) => {
    const url = `v1/api/knight/all`
    return axiosClient.get(url, { params })
  },
  getAllKnightByOwner: (params: any) => {
    const url = `v1/api/knight/get-all`
    return axiosClient.get(url, { params })
  },
  getSaleKnight: (params: any) => {
    const url = `v1/api/knight/sale-knight`
    return axiosClient.get(url, { params })
  },
  storeSaleKnight: (params: any) => {
    const url = `v1/api/knight/sale-knight`
    return axiosClient.post(url, params)
  },
  destroySaleKnight: (params: any) => {
    const url = `v1/api/knight/sale-knight`
    return axiosClient.delete(url, { params })
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
    const url = `v1/api/knight/request-marry`
    return axiosClient.get(url, { params })
  },
  storeRequestMarry: (params: any) => {
    const url = `v1/api/knight/request-marry`
    return axiosClient.post(url, params)
  },
  updateRequestMarry: (params: any) => {
    const url = `v1/api/knight/request-marry`
    return axiosClient.put(url, params)
  },
  destroyMarry: (params: any) => {
    const url = `v1/api/knight/request-marry`
    return axiosClient.delete(url, { params })
  },
  storeKnight: (params: any) => {
    const url = `v1/api/knight/store`
    return axiosClient.post(url, params)
  },
  levelUp: (params: any) => {
    const url = `v1/api/knight/level-up`
    return axiosClient.post(url, params)
  },
  changeName: (params: any) => {
    const url = `v1/api/knight/change-name`
    return axiosClient.post(url, params)
  },
  battleResults: (params: any) => {
    const url = `v1/api/knight/battle-result`
    return axiosClient.post(url, params)
  },
  triggerCoolDown: (params: any) => {
    const url = `v1/api/knight/trigger-cooldown`
    return axiosClient.post(url, params)
  },
  triggerTired: (params: any) => {
    const url = `v1/api/knight/trigger-tired`
    return axiosClient.post(url, params)
  },
  tranfer: (params: any) => {
    const url = `v1/api/knight/tranfer`
    return axiosClient.post(url, params)
  },
}

export default authorizationApi
