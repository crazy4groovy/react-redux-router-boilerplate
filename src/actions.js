/* @flow */

// This is a map of <actionType: actionProperties>
const typesPropsMap/* : ActionsType */ = Object.freeze({
  // API interaction
  accountsFetchRequest: null,
  accountsFetchSuccess: 'value',

  // TODO
  addTodoRequest: 'userId',
  addTodoSuccess: 'data'
})

const creatorFactory/* : function */ = (actionType, actionProps) =>
  (...callerArgs) => {
    const action = { type: actionType }

    // this adds the action's properties, before returning it
    callerArgs.forEach((arg, idx) => {
      const prop = actionProps[idx]

      if (prop === 'type') console.error('WARNING: CANNOT SET/OVERRIDE TYPE OF AN ACTION') // eslint-disable-line no-console
      else if (prop !== undefined) action[prop] = arg
      else console.error('WARNING: Unknown/Ignored Action Property', actionProps, idx, prop, arg) // eslint-disable-line no-console
    })

    return action
  }

export const creators/* : ActionsType */ = Object.freeze(
  Object.keys(typesPropsMap)
    .reduce(
      (creatorsCollector, actionType) => {
        let actionProps = typesPropsMap[actionType]

        if (typeof actionProps === 'string') {
          actionProps = [actionProps]
        } else if (actionProps === null) {
          actionProps = []
        }

        creatorsCollector[actionType] = creatorFactory(actionType, actionProps)

        return creatorsCollector
      }, {})
)

export const types/* : ActionsType */ = Object.freeze(
  Object.keys(typesPropsMap)
    .reduce((map, key) => (map[key] = key) && map
      , {})
)
