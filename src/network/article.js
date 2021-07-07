import { request } from '@/utils/request'

// 获取文章列表（适用内容管理、评论管理、图文数据）
export const getArticleList = params => {
  return request({
    url: '/mp/v1_0/articles',
    params
  })
}
