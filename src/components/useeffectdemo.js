import { useEffect, useState } from "react";
function UseEffectDemo(){
  const [color,setColor]=useState('black')
   const handleChange=(e)=>{
       console.log(e.target.value)
       setColor(e.target.value)
   }
   useEffect(()=>{
     document.getElementById('content').innerHTML=
     `<span style="color:${color}">
      This text will be displayed in ${color} </span>`
   },[color]);
    return(<>
    {color}
      <select name="color" onChange={handleChange}>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="violet">violet</option>
        <option value="blue">Blue</option>
      </select>
     <h1 id="content"></h1>
    </>);
}
export default UseEffectDemo;