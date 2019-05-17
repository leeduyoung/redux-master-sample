import { select, change_mode, create, remove } from "../actions";

export interface IBoardContent {
    id: number;
    title: string;
    desc: string;
}

export interface IBoardInitialState {
    mode: string;
    selected_id: number;
    contents: IBoardContent[];
}

const initialState: IBoardInitialState = {
    mode: 'read',
    selected_id: 1,
    contents: [
        {id: 1, title: 'HTML', desc: 'HTML is ...'},
        {id: 2, title: 'CSS', desc: 'CSS is ...'}
    ]
};

const boardReducer = function board(state = initialState, action: any) 
{
    console.log(state, action);

    let newContents = [];

    switch (action.type) 
    {
        case select:
            return {
                ...state,
                selected_id: action.id
            }
        case change_mode:
            let _mode = (state.mode === 'read')
                ? 'create' : 'read';

            return {
                ...state,
                mode: _mode
            }
        case create:
            newContents = state.contents.concat();
            newContents.push({
                id: newContents.length + 1,
                title: action.title,
                desc: action.desc
            });

            return {
                ...state,
                mode: 'read',
                contents: newContents,
                selected_id: newContents.length                
            }
        case remove:
            newContents = state.contents.concat();
            newContents.splice(state.selected_id - 1, 1);

            return {
                ...state,
                contents: newContents,
                selected_id: 1
            }
        default:
            return state;
    }
}

export default boardReducer;