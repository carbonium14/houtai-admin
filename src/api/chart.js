import request from '@/utils/request'
export const getChartTrend = () => {
  return request({
    url: '/chart/trend'
  })
}
export const getChartCalendar = () => {
  return request({
    url: '/chart/calendar'
  })
}
export const getChartTimeAmount = (date) => {
  return request({
    url: '/chart/time/amount',
    params: {
      date
    }
  })
}
export const getChartPie = () => {
  return request({
    url: '/chart/pie'
  })
}
export const getChartWordCloud = () => {
  return request({
    url: '/chart/wordcloud'
  })
}
export const getChartMap = () => {
  return request({
    url: '/chart/bmap'
  })
}
export const getChartRegions = () => {
  return request({
    url: '/chart/regions'
  })
}
export const getChartSheet = (regionId) => {
  return request({
    url: '/chart/sheets',
    params: {
      regionId
    }
  })
}
