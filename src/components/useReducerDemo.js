import { useReducer } from "react";
const reducer=(state,action)=>{
    switch(action.type){
        case 'increment':
            return {count:state.count+1};
        case 'decrement':
            return {count:state.count - 1};
        default:
            return state;
    }
}
function Counter(){
    const initialState={count:0}
    const [state,action]=useReducer(reducer,initialState)   
    return(<>
    <pre>
     <b>Count:{state.count}</b><br></br>
     <button onClick={()=>{action({type:'increment'})}}>Increment</button><br/>
     <button onClick={()=>action({type:'decrement'})}>Decrement</button>    
     </pre>
    </>);
}
export default Counter; 