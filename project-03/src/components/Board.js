import React from 'react';
import { connect } from 'react-redux';

class Board extends React.Component {

    render() {
        console.log('this.props: ', this.props);
        console.log('this.state: ', this.state);

        return (
            <div className="board-component">
                <div>
                    <h1>WEB</h1>
                    Hello, WEB!
                </div>

                {/* <li>
                    <a href={state.contents}></a>
                </li> */}
            </div>
        );
    }
}

/**
 * mapStateToProps
 * : store의 state를 컴포넌트의 props에 매핑한다.
 * 
 * mapDispatchToProps
 * : 컴포넌트의 함수명 props를 실행했을때, 개발자가 지정한 action을 dispatch하도록 실행
 */

// let mapStateToProps = (state) => {
//     return {
        
//     }
// }

export default connect()(Board);
