import React from 'react';
import { connect } from 'react-redux';
import { select, remove, create, change_mode } from '../actions';

class Board extends React.Component {

    render() {
        // console.log('this.props: ', this.props);

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
                            <input type="text" name="title" placeholder="title"></input>
                        </p>

                        <p>
                            <textarea name="desc" placeholder="description"></textarea>
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
        console.log("deleteClickHandler");
    }

    submitClickHandler(event) {
        event.preventDefault();
        this.props.onCreate();
    }
}

/**
 * mapStateToProps
 * : store의 state를 컴포넌트의 props에 매핑한다.
 * 
 * mapDispatchToProps
 * : 컴포넌트의 함수명 props를 실행했을때, 개발자가 지정한 action을 dispatch하도록 실행
 */
let mapStateToProps = (state) => {
    return state.boardReducer;
};

let mapDispatchToProps = (dispatch) => {
    return {
        onSelect(id) {dispatch({type: select, id: id})},
        onCreate() {dispatch({type: create})},
        onDelete() {dispatch({type: remove})},
        onChangeMode() {dispatch({type: change_mode})}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
