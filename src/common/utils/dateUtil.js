/*
  Simple format eg. 2018-09-24
 */

export const addDays = (date, days = 0) => {
  date.setDate(date.getDate() + days)
  return date
}

const padding = '00'
export const padStr = str => (padding.substring(0, padding.length - str.length) + str)

export const simpleDateToISO = (strDate, t) => {
  const tFinal = t || (new Date()).toJSON().split('T')[1]
  const [, year, month, day] = strDate.match(/(\d+)-(\d+)-(\d+)/).map(padStr)
  return `${year}-${month}-${day}T${tFinal}`
}

export const isoDateToSimple = (strDate) => {
  const dateStr = strDate || new Date().toJSON()
  const [, year, month, day] = dateStr.match(/(\d+)-(\d+)-(\d+)/).map(padStr)
  return `${year}-${month}-${day}`
}

export const displayWithLocalTime = (date) => {
  const dateLocale = date.toLocaleString('en-US')
  const [, month, day, year, timePart] = dateLocale.match(/(\d+)\/(\d+)\/(\d+)(.*)/).map(padStr)
  return `${year}-${month}-${day}${timePart}`
}

export const getTomorrowAsSimple = () => isoDateToSimple(addDays(new Date(), 1).toJSON())
