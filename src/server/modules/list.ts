import request from "../index"

export const getList = (page: pageType) => {
  return request({
    url: "/data/list",
    method: "get",
    params: page
  })
}
