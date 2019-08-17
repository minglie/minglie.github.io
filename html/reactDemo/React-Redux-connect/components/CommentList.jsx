const Redux={
    currentReducer:{},
    currentState:{},
    currentListeners:{},
    createStore: function (reducer) {
        Redux.currentState=reducer(undefined,{type:0});
        Redux.currentReducer = reducer;
        Redux.currentListeners = [];
        function dispatch(action) {
            Redux.currentState = Redux.currentReducer(Redux.currentState, action);
            var listeners = Redux.currentListeners;
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                listener();
            }
            return action;
        }
        function subscribe(listener) {
            Redux.currentListeners.push(listener);
        }
        function getState() {
            return Redux.currentState;
        }
        return{
            dispatch, subscribe, getState
        }
    }
};


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
const increment = ()=> {
    return {
        type: 'INCREMENT_COUNTER',
    }
};
const decrement = ()=> {
    return {type: 'DECREMENT_COUNTER'}
};

const actions={
    increment,
    decrement
};


const counterReduce= (defaultState={count: 10}, action)=> {
    console.log(defaultState,"OOOOOOOOOOOOO");
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return {
                count: defaultState.count+1
            };
        case 'DECREMENT_COUNTER':
            return {
                count: defaultState.count-1
            };
        default:
            return defaultState;
    }
};
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

let store =  Redux.createStore(counterReduce);

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    return {
        counter: state.count
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increment: (...args) => dispatch(actions.increment(...args)),
        decrement: (...args) => dispatch(actions.decrement(...args))
    }
};



const connect =(mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends React.Component {
        constructor () {
            super();
            this.state = {
                allProps: {}
            }
        }
        componentWillMount () {
            this._updateProps();
            store.subscribe(() => this._updateProps())
        }
        _updateProps () {
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props):{}; // 防止 mapStateToProps 没有传入
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props):{}; // 防止 mapDispatchToProps 没有传入
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }
        render () {
            return <WrappedComponent {...this.state.allProps} />
        }
    }
    return Connect
};




class Counter extends React.Component {
    render() {
        //从组件的props属性中导入四个方法和一个变量
        const {increment, decrement, counter} = this.props;
        //渲染组件，包括一个数字，四个按钮
        console.log(this.props,"AAAAAAAAA");
        return(
        <div>
            Clicked: {counter} times
            <button onClick={increment}>+</button>
            {' '}
            <button onClick={decrement}>-</button>
            {' '}
        </div>
        )
    }
}




const App=connect(mapStateToProps, mapDispatchToProps)(Counter);



