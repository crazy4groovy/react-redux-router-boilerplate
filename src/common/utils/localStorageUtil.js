/* global localStorage */
const tokenLocalStorageId = 'tractrMerchantWebJWT'

const items = {}
let ls
try {
  ls = localStorage
} catch (serverDetected) {
  ls = {
    setItem: (key, val) => (items[key] = val) && true,
    removeItem: key => delete items[key],
    getItem: key => items[key]
  }
}

const saveToLocalStore = token =>
  ls.setItem(tokenLocalStorageId, token)

const clearLocalStore = () =>
  ls.removeItem(tokenLocalStorageId)

export const storeToken = (token) => {
  if (token) {
    saveToLocalStore(token)
  } else {
    clearLocalStore()
  }
}

export const retrieveToken = () => ls.getItem(tokenLocalStorageId)
