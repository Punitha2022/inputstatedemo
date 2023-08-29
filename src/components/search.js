import { useState } from "react";
function Search({onSearch}){
    
    return(
    <div>
    <label htmlFor="search">Search</label>
    <input type="text" id="search" 
    onChange={onSearch}></input>
    </div>);
}
export default Search;