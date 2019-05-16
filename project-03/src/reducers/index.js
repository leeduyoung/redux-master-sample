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

    return state;
}

const comReducer = combineReducers({
    boardReducer
});

export default comReducer;