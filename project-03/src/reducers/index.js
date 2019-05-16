import { combineReducers } from "redux";

const boardReducer = function board(state, action) {
    console.log(state, action);

    if (state === undefined) {
        return {
            mode: 'read',
            selected_id: 1,
            contents: [
                {id: 1, title: 'HTML', desc: 'HTML is ...'},
                {id: 2, title: 'CSS', desc: 'CSS is ...'}
            ]
        }
    }

    if (action.type === 'SELECT') {
        return {
            ...state,
            selected_id: action.id
        }
    }

    if (action.type === 'DELETE') {

    }

    if (action.type === 'CREATE') {

    }

    if (action.type === 'CHANGE_MODE') {
        let _mode = (state.mode === 'read')
            ? 'create' : 'read';

        return {
            ...state,
            mode: _mode
        }
    }

    return state;
}

const comReducer = combineReducers({
    boardReducer
});

export default comReducer;