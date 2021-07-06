// 导入 请求实例
import { request } from '@/utils/request'

// 登录接口
export const login = (data) => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: '/mp/v1_0/user/profile'
  })
}
