import path from 'path-browserify'
import i18n from '@/i18n/index'
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let res = []
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
