import request from '@/utils/request'
export const getArticleList = (data) => {
  return request({
    url: '/article/list',
    params: data
  })
}
export const articleSort = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}
export const deleteArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`
  })
}
export const articleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`
  })
}
export const createArticle = (data) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}
export const editorArticle = (data) => {
  return request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
