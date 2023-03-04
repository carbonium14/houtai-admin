import { getItem, setItem } from './storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
export function getTimeStmap() {
  return getItem(TIME_STAMP)
}
export function setTimeStamp() {
  return setItem(TIME_STAMP, Date.now())
}
export function isCheckTimeout() {
  const currentTime = Date.now()
  const timeStamp = getItem(TIME_STAMP)
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
