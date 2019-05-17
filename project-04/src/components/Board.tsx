import * as React from 'react';
import { connect } from 'react-redux';
import { onSelect, onCreate, onDelete, onChangeMode } from '../actions';
import { IBoardContent, IBoardInitialState } from '../reducers/board';

interface IProps {
    mode: string;
    selected_id: number;
    contents: IBoardContent[];
    onSelect: (id: number) => void;
    onCreate: (title: string, desc: string) => void;
    onDelete: () => void;
    onChangeMode: () => void;
}

interface IState {
    title: string;
    desc: string;
}

class Board extends React.Component<IProps, IState>
{
    public constructor(props: IProps) {
        super(props);

        this.state = {
            title: '',
            desc: ''
        };
    }

    public componentDidMount()
    {
        console.log('this.props: ', this.props);
    }

    public render(): JSX.Element 
    {
        return (
            <div className="board-component">
                {this.subject()}
                {this.toc()}
                {this.control()}
                {this.content()}
            </div>
        )
    }

    private subject(): JSX.Element
    {
        return (
            <div>
                <h1>WEB</h1>
                Hello, WEB!
            </div>
        )
    }
    
    private toc(): JSX.Element
    {
        let contents = this.props.contents;
        let liTags: JSX.Element[] = [];
        
        for (let i = 0; i < contents.length; i++)
        {
            liTags.push(
                <li key={i}>
                    <a onClick={this.handleClick.bind(this, contents[i].id)} 
                        href="">{contents[i].title}</a>
                </li>
            );
        }

        return (
            <nav>
                <ol>
                    {liTags}
                </ol>
            </nav>
        )
    }

    private control(): JSX.Element
    {
        return (
            <ul>
                <li>
                    <input type="button" 
                        value="create"
                        onClick={this.handleChangeMode.bind(this)}/>
                </li>
                <li>
                    <input type="button" 
                        value="delete"
                        onClick={this.handleDelete.bind(this)}/>
                </li>
            </ul>
        )
    }

    private content(): JSX.Element
    {
        let props = this.props;
        let ret: JSX.Element;

        if (props.mode === 'read')
        {
            ret = (
                <article>
                    <h2>{props.contents[props.selected_id - 1].title}</h2>
                    {props.contents[props.selected_id - 1].desc}
                </article>                
            );
        }
        else if (props.mode === 'create')
        {
            ret = (
                <article>
                    <form onSubmit={this.handleCreate.bind(this)}>
                        <p>
                            <input type="text" 
                                name="title" 
                                placeholder="title"
                                value={this.state.title}
                                onChange={this.handleInputChange.bind(this)}></input>
                        </p>

                        <p>
                            <textarea name="desc" 
                                placeholder="description"
                                value={this.state.desc}
                                onChange={this.handleInputChange.bind(this)}></textarea>
                        </p>

                        <p>
                            <input type="submit"></input>
                        </p>
                    </form>                    
                </article>
            )
        }

        return ret;
    }

    // CLICK EVENT HANDLER
    private handleClick(id: number, event: React.MouseEvent<HTMLElement>): void
    {
        event.preventDefault();
        this.props.onSelect(id);
    }

    private handleChangeMode(): void
    {
        this.props.onChangeMode();
    }

    private handleDelete(): void
    {
        this.props.onDelete();
    }

    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        // if (event.target.name === 'title')
        // {
        //     this.state[event.target.name]
        //     this.setState({
        //         title: event.target.value,
        //     });
        // }
        // else if (event.target.name === 'desc')
        // {
        //     this.setState({
        //         desc: event.target.value
        //     });
        // }

        // JAVASCIRPT CODE
        this.setState({
            [event.target.name]: event.target.value
        } as any);
    }

    private handleCreate(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.props.onCreate(this.state.title, this.state.desc);

        // INIT DATA
        this.setState({
            title: '',
            desc: ''
        });
    }    
}

/**
 * TODO: 이부분 잘 모르겠음.
 * return type을 명시해주지 않으면 error.
 */
const mapStateToProps = (state: any): IBoardInitialState => {
    return state.boardReducer;
};

const mapDispatchTopProps = (dispatch: any) => {
    return {
        onSelect: (id: number) => dispatch(onSelect(id)),
        onCreate: (title: string, desc: string) => dispatch(onCreate(title, desc)),
        onDelete: () => dispatch(onDelete()),
        onChangeMode: () => dispatch(onChangeMode()),
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(Board);