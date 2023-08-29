import { useReducer, useState } from "react";

const reducer=(state,action)=>{
    switch(action.type){
        case 'deposit':
            return {balance:state.balance +  action.amount}
        case 'withdraw':
            return {balance:state.balance - action.amount}
        default:
            return state;
    }
}
function BankAccount(){
    const initialState={balance:1000}
    const [state,dispatch]=useReducer(reducer,initialState)
    const [amountInput,setAmountInput]=useState('')
    const deposit=()=>{
     const amount=parseFloat(amountInput)
      dispatch({type:'deposit',amount:amount})
    }
    const withdraw=()=>{
        const amount=parseFloat(amountInput)
        dispatch({type:'withdraw',amount:amount})
    }
    const handleChange=(e)=>{
        setAmountInput(e.target.value)
    }
    return(<>
    <input type="text" placeholder="Enter the amount"
     value={amountInput} onChange={handleChange}></input>
    <b>Balance:{state.balance}</b>
    <button onClick={()=>{deposit()}}>Deposit</button>
    <button onClick={()=>{withdraw()}}>WithDraw</button>
    </>)
}
export default BankAccount;