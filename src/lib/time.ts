import dayjs from 'dayjs'

import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ko')
dayjs.extend(relativeTime)

export const getRelativeTime = (date: string | number | Date): string =>
  dayjs(new Date(date)).fromNow()

export const getYYYYMMDD = (date: string | number | Date): string =>
  dayjs(new Date(date)).format('YYYY-MM-DD')
export const getKoreanYYYYMMDD = (date: string | number | Date): string => {
  const formattedDate = dayjs(date).format('YYYY년 MM월 DD일')
  return formattedDate
}
