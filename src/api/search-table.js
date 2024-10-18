import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/searchTable/getList',
    method: 'get',
    params
  })
}
