import axiosClient from "./ClientAxios";

const authorizationApi = {

  getAll: (params: any) => {
    const url = `v1/api/knight/get-all`;
    return axiosClient.get(url,{ params });
  },

}

export default authorizationApi;