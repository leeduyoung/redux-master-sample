// ACTION TYPE'S
export const select = 'SELECT';
export const create = 'CREATE';
export const remove = 'REMOVE';
export const change_mode = 'CHANGE_MODE';

// ACTION CREATOR'S
export function onSelect(id: number)
{
    return {
        type: select,
        id: id
    }
}

export function onCreate(title: string, desc: string)
{
    return {
        type: create,
        title: title,
        desc: desc
    }
}

export function onDelete()
{
    return {
        type: remove
    }
}

export function onChangeMode()
{
    return {
        type: change_mode
    }
}