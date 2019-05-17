import React from 'react';
import { connect } from 'react-redux';
import { onSelect, onCreate, onChangeMode, onDelete} from '../actions';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            desc: ''
        };
    }

    render() {
        return (
            <div className="board-component">
                {this.subject()}
                {this.toc()}
                {this.control()}
                {this.content()}
            </div>
        );
    }

    // RENDER VIEW'S
    subject() {
        return (
            <div>
                <h1>WEB</h1>
                Hello, WEB!
            </div>
        )
    }

    toc() {
        let contents = this.props.contents;
        let liTags = [];
        for (let i = 0; i < contents.length; i++) {
            liTags.push(
                <li key={i}>
                    <a href={contents[i].id}
                        onClick={this.contentClickHandler.bind(this, contents[i].id)}>
                        {contents[i].title}
                    </a>
                </li>
            )
        }

        return (
            <nav>
                <ol>
                    {liTags}
                </ol>
            </nav>
        )
    }

    control() {
        return (
            <ul>
                <li>
                    <input type="button"
                        onClick={this.createClickHandler.bind(this)}
                        value="create"></input>
                </li>
                <li>
                    <input type="button"
                        onClick={this.deleteClickHandler.bind(this)}
                        value="delete"></input>
                </li>
            </ul>
        )
    }

    content() {
        let props = this.props;
        let ret;

        if (props.mode === 'read') {
            ret = (
                <article>
                    <h2>{props.contents[props.selected_id - 1].title}</h2>
                    {props.contents[props.selected_id - 1].desc}
                </article>                
            )
        }
        else if (props.mode === 'create') {
            ret = (
                <article>
                    <form onSubmit={this.submitClickHandler.bind(this)}>
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

    // EVENT HANDLER'S
    contentClickHandler(id, event) {
        event.preventDefault();
        this.props.onSelect(id);
    }

    createClickHandler() {
        this.props.onChangeMode();
    }

    deleteClickHandler() {
        this.props.onDelete();
    }

    submitClickHandler(event) {
        event.preventDefault();
        this.props.onCreate(this.state.title, this.state.desc);

        // INIT DATA
        this.setState({
            title: '',
            desc: ''
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
}

 /**
  * mapStateToProps
  * : store의 state를 컴포넌트의 props에 매핑한다.
  * @param {*} state 
  */
 let mapStateToProps = (state) => {
    return state.boardReducer;
};

/**
 * mapDispatchToProps
 * : 컴포넌트의 함수명 props를 실행했을때, 개발자가 지정한 action을 dispatch하도록 실행
 * @param {*} dispatch 
 */
let mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (id) => dispatch(onSelect(id)),
        onCreate: (title, desc) => dispatch(onCreate(title, desc)),
        onDelete: () => dispatch(onDelete()),
        onChangeMode: () => dispatch(onChangeMode())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
