import { types } from '../actions'

const initialState = [{
    text: 100000 / 2,
    completed: false
}]

export default (state = initialState, action) => {
    switch (action.type) {
        case types.addTodoSuccess:
            return ([
                ...state, {
                    text: action.data.text,
                    completed: action.data.completed
                }
            ]).sort((a, b) => a.text < b.text ? -1 : b.text < a.text ? 1 : 0)

        default:
            return state
    }
}

export const transducers = ({ about }) => ({
    getAt: i => {
        if (i > -1) return about[i]
        return about[about.length + i]
    }
})