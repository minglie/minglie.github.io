const { useState, useEffect, useReducer } = React;

const initialState = { count: 0 };

function mingCountReducer(state, action) {
  console.log(state)
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}





function MingCounter() {
  const [state, dispatch] = useReducer(mingCountReducer, initialState);

  return (
    <div>

      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}