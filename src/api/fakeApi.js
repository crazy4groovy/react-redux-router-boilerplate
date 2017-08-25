const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const delayByMs = 200

const clone = obj => JSON.parse(JSON.stringify(obj))
const randomDaysInMs = (days = 7) => Math.round(Math.random() * days * 24 * 60 * 60 * 1000)

export const fetchAccounts = () =>
  delay(delayByMs).then(() => ({
    accounts: []
  }))
