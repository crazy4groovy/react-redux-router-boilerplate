export const arrayToIndexedObject = (arr, key = 'id') => {
  if (!Array.isArray(arr)) return {}

  return arr.reduce((accum, obj) =>
      (obj[key] ? Object.assign(accum, { [obj[key]]: obj }) : accum)
    , {})
}
