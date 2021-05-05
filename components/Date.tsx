import { parseISO, format } from 'date-fns'

export default function Date(dateString) {
  const date = parseISO(dateString)
  return format(date, 'yyyy年MM月dd日')
}