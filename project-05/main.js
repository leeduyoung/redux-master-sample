var store;

window.onload = function()
{
    this.console.log('window onload');

    // INITIALISE REDUX
    store = Redux.createStore(reducer);

    // SUBSCRIBE
    this.store.subscribe(content);
    this.store.subscribe(TOC);

    this.subject();
    this.TOC();
    this.control();
    this.content();
}

function reducer(state, action)
{
    console.log('state: ', state, 'action: ', action);

    let newState = {};

    if (state === undefined)
    {
        return {
            mode: "read",
            selected_id: 1,
            contents: [
                {id: 1, title: 'HTML', description: 'HTML is ...'},
                {id: 2, title: 'CSS', description: 'CSS is ...'}
            ]
        };
    }
    else if (action.type === "SELECT")
    {
        Object.assign(newState, state, {selected_id: action.selected_id});
    }
    else if (action.type === "CREATE")
    {
        let newContents = state.contents.concat();
        newContents.push({
            id: newContents[newContents.length - 1].id + 1,
            title: action.title,
            description: action.description
        });

        Object.assign(newState, state, {mode: "read", selected_id: newContents[newContents.length - 1].id, contents: newContents});
    }
    else if (action.type === "DELETE")
    {
        let newContents = state.contents.concat();
        for (let i = 0; i < newContents.length; i++)
        {
            if (state.selected_id === newContents[i].id)
            {
                newContents.splice(i, 1);
                break;
            }
        }

        Object.assign(newState, state, {selected_id: state.contents[0].id, contents: newContents});
    }
    else if (action.type === "CHANGE_MODE")
    {
        Object.assign(newState, state, {mode: "create"});
    }

    console.log('newState: ', newState);
    return newState;
}

function subject()
{
    document.querySelector('#subject').innerHTML = `
        <header>
            <h1>WEB</h1>
            Hello, WEB!
        </header>
    `;
}

function TOC()
{
    let state = store.getState();
    let liTags = "";

    for (let i = 0; i < state.contents.length; i++)
    {
        liTags += `
            <li>
                <a href="${state.contents[i].id}.html" 
                    onclick="event.preventDefault();
                    store.dispatch({type: 'SELECT', selected_id: ${state.contents[i].id}});">
                    ${state.contents[i].title}
                </a>
            </li>`;
    }

    document.querySelector('#toc').innerHTML = `
        <nav>
            <ol>
                ${liTags}
            </ol>
        </nav>
    `;
}

function control()
{
    document.querySelector('#control').innerHTML = `
        <div>
            <button onclick="store.dispatch({type: 'CHANGE_MODE'})">create</button>
            <button onclick="store.dispatch({type: 'DELETE'})">
                delete
            </button>
        </div>    
    `;
}

function content()
{
    let state = store.getState();
    let title = "";
    let description = "";

    if (state.mode === "read")
    {
        for (let i = 0; i < state.contents.length; i++)
        {
            if (state.selected_id === state.contents[i].id)
            {
                title = state.contents[i].title;
                description = state.contents[i].description;
                break;
            }
        }
    
        document.querySelector('#contents').innerHTML = `
            <article>
                <h2>${title}</h2>
                ${description}
            </article>    
        `;
    }
    else if (state.mode === "create")
    {
        document.querySelector('#contents').innerHTML = `
            <article>
                <form onsubmit="
                    event.preventDefault();
                    let title = this.title.value;
                    let description = this.desc.value;
                    store.dispatch({type: 'CREATE', title: title, description: description});
                    ">
                    <p>
                        <input type="text" name="title" placeholder="title" />
                    </p>
                    <p>
                        <textarea name="desc" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit" />
                    </p>
                </form>
            </article>    
        `;        
    }
}